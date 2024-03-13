// ! modules
import { useParams } from 'react-router-dom';
import { useState, useEffect } from 'react';

// ? styles
import s from './User.module.css';

// ? pages
import NotFound from './../../pages/NotFound/NotFound.jsx';
import Notes from '../../pages/Notes/Notes.jsx';

// ? utils
import { generateErrorMessage } from '../../utils/utils.js';

export default function User({
  notes,
  users,
  currentUser,
  isAuthorized,
  handleSubmit,
  openPopupPicture,
  handleDeleteNote,
  handleCreateComment,
  handleDeleteComment,
  handleChangeReaction,
  handleAddOrDeleteFavorites,
}) {
  // ? params
  const { userId } = useParams();

  // ? constants
  const user = users.find((element) => element._id === userId);
  if (!user) return <NotFound />;

  const creationDate = new Date(user.creationDate).toLocaleDateString('en-EN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  const emptyValue = {
    'user-first-name': '',
    'user-last-name': '',
    'user-avatar': '',
    'user-birthday': '',
    'user-description': '',
  };

  // ? useState
  const [inputValue, setInputValue] = useState(emptyValue);
  const [errorValue, setErrorValue] = useState(emptyValue);
  const [isFormActive, setFormActive] = useState(false);
  const [isOwner, setOwner] = useState(currentUser._id === user._id);
  const [birthday, setBirthday] = useState(null);
  const [isEditingActive, setEditingActive] = useState(false);

  // ? useEffects

  // init value
  useEffect(() => {
    resetForm();
    setOwner(currentUser._id === user._id);
    setBirthday(user.birthday ? new Date(user.birthday) : null);
  }, [user, currentUser]);

  // ? functions

  function resetForm() {
    setInputValue({
      'user-first-name': user.firstName || '',
      'user-last-name': user.lastName || '',
      'user-avatar': user.avatar,
      'user-birthday': user.birthday || '',
      'user-description': user.description || '',
    });
    user.birthday && setBirthday(new Date(user.birthday));
  }

  function handleInput(e) {
    const { id, value, form } = e.target;

    setInputValue((prevState) => ({
      ...prevState,
      [id]: value,
    }));

    setErrorValue((prevState) => ({
      ...prevState,
      [id]: generateErrorMessage(e.target.validity),
    }));

    setFormActive(form.checkValidity());
  }

  function onSubmit(e) {
    e.preventDefault();
    handleSubmit({
      avatar: inputValue['user-avatar'],
      firstName: inputValue['user-first-name'],
      lastName: inputValue['user-last-name'],
      birthday: inputValue['user-birthday'],
      description: inputValue['user-description'],
    });
    setEditingActive(false);
    setFormActive(false);
  }

  function getAge(dateOfBirth) {
    const currentDate = new Date();
    let age = currentDate.getFullYear() - dateOfBirth.getFullYear();
    const isBirthdayPassed =
      currentDate.getMonth() > dateOfBirth.getMonth() ||
      (currentDate.getMonth() === dateOfBirth.getMonth() &&
        currentDate.getDate() >= dateOfBirth.getDate());
    if (!isBirthdayPassed) age--;
    return age;
  }

  function fromIso8601(Iso8601date) {
    const originalDate = new Date(Iso8601date);
    const year = originalDate.getFullYear();
    const month = ('0' + (originalDate.getMonth() + 1)).slice(-2); // Les mois sont 0-indexés
    const day = ('0' + originalDate.getDate()).slice(-2);
    return `${year}-${month}-${day}`;
  }

  function toIso8601(formattedDate) {
    const originalDate = new Date(formattedDate);
    const year = originalDate.getFullYear();
    const month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
    const day = ('0' + originalDate.getDate()).slice(-2);
    return `${year}-${month}-${day}T00:00:00.000+00:00`;
  }

  function enableEditMode() {
    setEditingActive(true);
  }

  function handleReset() {
    setEditingActive(false);
    resetForm();
  }

  function Buttons({ className }) {
    return (
      isOwner && (
        <div className={`${s.buttons} ${className}`}>
          {isEditingActive ? (
            <>
              <button
                onClick={handleReset}
                className={`button label-second ${s.button}`}
                type='reset'
              >
                Reset
              </button>
              <button
                onClick={onSubmit}
                className={`button label-second ${s.button}`}
                disabled={!isFormActive}
                type='submit'
              >
                Submit
              </button>
            </>
          ) : (
            <button
              onClick={enableEditMode}
              className={`text label-second button ${s.button}`}
              type='button'
            >
              Edit
            </button>
          )}
        </div>
      )
    );
  }

  return (
    <>
      <article className={s.main}>
        <div
          className={`${s.profile} ${isOwner && s.owner} ${
            isEditingActive && s.edit
          }`}
        >
          {/* top */}
          <header className={s.header}>
            <h1 className={`text title-third ${s.title}`}>{user.nickname}</h1>
          </header>

          {/* main */}
          <div className={s.container}>
            {/* form */}
            <form onSubmit={onSubmit} id='user-form' className={s.form}>
              {/* 1 row */}
              <div className={s.form__row}>
                {/* avatar + age */}
                <div>
                  {/* avatar */}
                  <button
                    type='button'
                    onClick={() => {
                      openPopupPicture({
                        src: inputValue['user-avatar'],
                        alt: `${user.nickname} avatar`,
                      });
                    }}
                    className={`button ${s.avatar}`}
                  >
                    <img
                      className={s.avatar__img}
                      src={inputValue['user-avatar']}
                      alt={`${user.nickname} avatar`}
                    />
                  </button>
                  {birthday && (
                    <p className={`text text_color_second subhead ${s.age}`}>
                      <span className='text_color_default'>
                        {getAge(birthday)}
                      </span>{' '}
                      year
                      {getAge(birthday) > 1 ? 's' : ''} old
                    </p>
                  )}
                </div>

                {/* fields */}
                <div className={s.fields}>
                  {/* first name */}
                  {(isEditingActive || inputValue['user-first-name']) && (
                    <div className={s.field}>
                      <div onDoubleClick={isOwner ? enableEditMode : undefined}>
                        <h2 className={'text text_color_second label-third'}>
                          First name
                        </h2>
                        <input
                          id={'user-first-name'}
                          value={inputValue['user-first-name']}
                          className={`${s.field__input} ${
                            errorValue['user-first-name'] &&
                            s.field__input_valid_invalid
                          }`}
                          readOnly={!isEditingActive}
                          type={'text'}
                          onChange={handleInput}
                        />
                      </div>

                      <p className={`text text_color_accent detail ${s.error}`}>
                        {errorValue['user-first-name']}
                      </p>
                    </div>
                  )}

                  {/* last name */}
                  {(isEditingActive || inputValue['user-last-name']) && (
                    <div className={s.field}>
                      <div onDoubleClick={isOwner ? enableEditMode : undefined}>
                        <h2 className={'text text_color_second label-third'}>
                          Last name
                        </h2>
                        <input
                          id={'user-last-name'}
                          value={inputValue['user-last-name']}
                          className={`${s.field__input} ${
                            errorValue['user-last-name'] &&
                            s.field__input_valid_invalid
                          }`}
                          readOnly={!isEditingActive}
                          type={'text'}
                          onChange={handleInput}
                        />
                      </div>

                      <p className={`text text_color_accent detail ${s.error}`}>
                        {errorValue['user-last-name']}
                      </p>
                    </div>
                  )}

                  {/* birthday */}
                  {(isEditingActive || inputValue['user-birthday']) && (
                    <div className={s.field}>
                      <div onDoubleClick={isOwner ? enableEditMode : undefined}>
                        <h2 className={'text text_color_second label-third'}>
                          Birthday
                        </h2>
                        <input
                          id={'user-birthday'}
                          value={fromIso8601(inputValue['user-birthday'])}
                          className={`text ${s.field__input} ${
                            errorValue['user-birthday'] &&
                            s.field__input_valid_invalid
                          }`}
                          readOnly={!isEditingActive}
                          type={'date'}
                          onChange={handleInput}
                        />
                        <p
                          className={`text text_color_accent detail ${s.error}`}
                        >
                          {errorValue['user-birthday']}
                        </p>
                      </div>
                    </div>
                  )}
                </div>

                {/* buttons */}
                <Buttons className={s.buttons_place_form} />
              </div>

              {/* 2 row */}
              <div className={s.form__row}>
                <div className={`${s.field} ${s.field_type_textarea}`}>
                  <h2 className={'text text_color_second label-third'}>
                    Description
                  </h2>
                  <textarea
                    id={'user-description'}
                    value={inputValue['user-description']}
                    className={`text ${s.field__input} ${
                      errorValue['user-description'] &&
                      s.field__input_valid_invalid
                    }`}
                    readOnly={!isEditingActive}
                    type={'text'}
                    onChange={handleInput}
                  />
                  <p className={`text text_color_accent detail ${s.error}`}>
                    {errorValue['user-description']}
                  </p>
                </div>
              </div>
            </form>
          </div>

          {/* bottom */}
          <footer className={s.footer}>
            <div className={s.infos}>
              {/* owner */}
              {user.isOwner && (
                <div className={`${s.info} ${s.info_border_accent}`}>
                  <p className='text text_color_accent label-third'>
                    This user is one of owners of ReddNotes
                  </p>
                </div>
              )}

              {/* number of notes */}
              <div className={s.info}>
                <p className='text text_color_second label-third'>
                  {user.notes.length === 0 ? (
                    'This user has no notes yet'
                  ) : (
                    <>
                      Owner of{' '}
                      <span className='text_color_default'>
                        {user.notes.length}{' '}
                        {user.notes.length !== 1 ? 'notes' : 'note'}
                      </span>
                    </>
                  )}
                </p>
              </div>

              {/* user redd notes since */}
              <div className={s.info}>
                <p className='text text_color_second label-third'>
                  ReddNotes user since{' '}
                  <span className='text_color_default'>{creationDate}</span>
                </p>
              </div>
            </div>

            {/* buttons */}
            <Buttons className={s.buttons_place_footer} />
          </footer>
        </div>

        <Notes
          users={users}
          isFavorite={false}
          currentUser={currentUser}
          isAuthorized={isAuthorized}
          handleDeleteNote={handleDeleteNote}
          openPopupPicture={openPopupPicture}
          handleCreateComment={handleCreateComment}
          handleDeleteComment={handleDeleteComment}
          handleChangeReaction={handleChangeReaction}
          messageInEnd='You have seen all your notes'
          messageWhenNoNotes='You do not have any note yet'
          notes={notes.filter((note) => note.owner === userId)}
          handleAddOrDeleteFavorites={handleAddOrDeleteFavorites}
        />
      </article>
    </>
  );
}
