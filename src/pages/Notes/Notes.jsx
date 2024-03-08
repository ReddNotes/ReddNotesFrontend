// ? styles
import s from './Notes.module.css';

// ? components
import Note from '../../components/Note/Note';

export default function Notes({
  isFavorite,
  openPopupPicture,
  isAuthorized,
  currentUser,
  handleChangeReaction,
  handleAddOrDeleteFavorites,
  notes,
  users,
}) {
  const _notes = isFavorite
    ? notes.filter((note) => currentUser.favorites.includes(note._id))
    : notes;

  return (
    <section className={s.main}>
      {_notes
        .sort((a, b) => {
          const dateA = new Date(a.creationDate);
          const dateB = new Date(b.creationDate);

          return dateB - dateA;
        })
        .map((note) => {
          for (let i = 0; i < users.length; i++) {
            const user = users[i];
            note.isReactionActive = false;
            note.isSavedFavorites = false;
            if (user._id === note.owner) {
              note.user = user;
            }
          }

          if (note.likes.includes(currentUser._id)) {
            note.isReactionActive = true;
          }
          if (isAuthorized && currentUser.favorites.includes(note._id)) {
            note.isSavedFavorites = true;
          }

          return (
            <Note
              openPopupPicture={openPopupPicture}
              isAuthorized={isAuthorized}
              handleChangeReaction={handleChangeReaction}
              handleAddOrDeleteFavorites={handleAddOrDeleteFavorites}
              key={note._id}
              note={note}
              user={currentUser}
            />
          );
        })}
      <div className={s.end}>
        <p className='text text_color_second body'>
          {!isAuthorized && isFavorite
            ? 'To see favorites notes, before you have to login'
            : _notes.length === 0
            ? 'You do not save any note to favorites'
            : `You have been see all ${isFavorite ? 'favorites' : ''} notes`}
        </p>
      </div>
    </section>
  );
}
