// ! modules
import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react';

// ? styles
import s from './User.module.css'

// ? pages
import NotFound from './../../pages/NotFound/NotFound.jsx';

export default function User({
    children,
    openPopupPicture,
    isAuthorized,
    currentUser,
    handleChangeReaction,
    handleAddOrDeleteFavorites,
    notes,
    users
}) {
    function getAge(dateOfBirth) {
        const currentDate = new Date();
        let age = currentDate.getFullYear() - dateOfBirth.getFullYear();
        const isBirthdayPassed = (currentDate.getMonth() > dateOfBirth.getMonth()) ||
            (currentDate.getMonth() === dateOfBirth.getMonth() && currentDate.getDate() >= dateOfBirth.getDate());
        if (!isBirthdayPassed) age--
        return age
    }

    function openForm() {
        setEdit(!edit);
        setAvatarForm(avatar);
        setFirstNameForm(firstName);
        setLastNameForm(lastName);
        setBirthdayForm(fromIso8601(birthday));
        setDescriptionForm(description);
    }

    function sendForm(e) {
        e.preventDefault();
        // Todo api request

        // To remove later, this code change the user information without requesting to the backend
        setEdit(!edit);
        setAvatar(avatarForm);
        setFirstName(firstNameForm);
        setLastName(lastNameForm);
        setBirthday(toIso8601(birthdayForm));
        setDescription(descriptionForm);
    }

    function fromIso8601(Iso8601date) {
        const originalDate = new Date(Iso8601date);
        const year = originalDate.getFullYear();
        const month = ('0' + (originalDate.getMonth() + 1)).slice(-2); // Les mois sont 0-indexés
        const day = ('0' + originalDate.getDate()).slice(-2);
        return `${year}-${month}-${day}`;
    }

    function toIso8601(formatedDate) {
        const originalDate = new Date(formatedDate);
        const year = originalDate.getFullYear();
        const month = ('0' + (originalDate.getMonth() + 1)).slice(-2);
        const day = ('0' + originalDate.getDate()).slice(-2);
        return `${year}-${month}-${day}T00:00:00.000+00:00`;
    }
    
    const { userId } = useParams();
    const userPageInfo = currentUser._id === userId ? currentUser : users.find(element => element._id === userId);
    if (!userPageInfo && userId !== 'null') return (<NotFound />)

    const numberOfNotes = notes.reduce((acc, curr) => curr.owner === userPageInfo._id ? acc + 1 : acc, 0);

    const date = new Date(userPageInfo.creationDate);
    const options = { day: 'numeric', month: 'long', year: 'numeric' };
    const creationDate = date.toLocaleDateString('en-EN', options);

    const [avatar, setAvatar] = useState(userPageInfo.avatar);
    const [firstName, setFirstName] = useState(userPageInfo.firstName);
    const [lastName, setLastName] = useState(userPageInfo.lastName);
    const [birthday, setBirthday] = useState(userPageInfo.birthday);
    const [description, setDescription] = useState(userPageInfo.description);

    const [avatarForm, setAvatarForm] = useState(avatar);
    const [firstNameForm, setFirstNameForm] = useState(firstName);
    const [lastNameForm, setLastNameForm] = useState(lastName);
    const [birthdayForm, setBirthdayForm] = useState(fromIso8601(birthday));
    const [descriptionForm, setDescriptionForm] = useState(description);

    const [edit, setEdit] = useState(false);

    const [age, setAge] = useState(getAge(new Date(birthday)))
    
    useEffect(() => setAge(getAge(new Date(birthday))), [birthday])

    return (
        <>
            <section className={s.main}>
                {userId === 'null'
                    ? <div className={s.end}><p className='text text_color_second body'>Please log in to view your profile details<p /></p></div>
                    : <div className={s.content}>
                        <form onSubmit={sendForm} id="user-form" className={s.info}>
                            {
                                !edit &&
                                <div className={`${s.img_container} ${currentUser._id === userPageInfo._id && s.owner}`}>
                                    <img src={avatar} alt={`${userPageInfo.nickname} avatar`} />
                                </div>
                            }
                            <div className={s.text_container}>
                                <h1>{userPageInfo.nickname}</h1>
                                <div className={s.input}>
                                    {edit
                                        ? <>
                                            <div className={s.input_names}>
                                                <p className={s.input_title}>First Name</p>
                                                <input type='text' value={firstNameForm} onChange={(e) => setFirstNameForm(event.target.value)} />
                                            </div>
                                            <div className={s.input_names}>
                                                <p className={s.input_title}>Last Name</p>
                                                <input type='text' value={lastNameForm} onChange={(e) => setLastNameForm(event.target.value)} />
                                            </div>
                                        </>
                                        : <p className={s.text_container_info}>{firstName} {lastName}</p>
                                    }
                                </div>
                                <div className={s.input}>
                                    {edit
                                        ? <>
                                            <p className={s.input_title}>Birthday</p>
                                            <input type='date' value={birthdayForm} onChange={(e) => setBirthdayForm(event.target.value)} />
                                        </>
                                        : <p className={s.text_container_info}>{age} year{age > 1 ? 's' : ''} old</p>
                                    }
                                </div>
                                <div className={s.input}>
                                    {edit
                                        ? <>
                                            <p className={s.input_title}>Description</p>
                                            <input type='text' value={descriptionForm} onChange={(e) => setDescriptionForm(event.target.value)} />
                                        </>
                                        : <p className={s.description}>{description}</p>
                                    }
                                </div>
                                {
                                    edit &&
                                    <div className={s.input}><p className={s.input_title}>Avatar</p>
                                        <input type='text' value={avatarForm} onChange={(e) => setAvatarForm(event.target.value)} />
                                    </div>
                                }
                            </div>
                        </form>
                        {!edit &&
                            <div className={s.miscellaneous}>
                                <div className={s.miscellaneous_case}>
                                    {numberOfNotes === 0 ? <p>This user has no notes yet</p> : (<p>Owner of <b>{numberOfNotes}</b> note{numberOfNotes !== 1 ? 's' : ''}</p>)}
                                </div>
                                <div className={s.miscellaneous_case}>
                                    <p>ReddNotes user since <b>{creationDate}</b></p>
                                </div>
                            </div>
                        }
                        {
                            currentUser._id === userPageInfo._id && (
                                !edit
                                    ? <div className={`${s.edit_container} ${s.owner}`}>
                                        <button className={`${s.edit_button} button`} onClick={openForm}>
                                            Edit profile
                                        </button>
                                    </div>
                                    : <div className={`${s.edit_container_form} ${s.owner}`}>
                                        <button className={`${s.edit_button} button button_red`} onClick={() => setEdit(!edit)}>
                                            Discard
                                        </button>
                                        <button type="submit" form="user-form" className={`${s.edit_button} button button_green`}>
                                            Save
                                        </button>
                                    </div>
                            )
                        }
                    </div>}
            </section>
            {userId !== 'null' && children}
        </>
    )
}