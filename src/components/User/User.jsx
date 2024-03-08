// ! modules
import { useParams, useNavigate } from 'react-router-dom'
import { useEffect } from 'react';

// ? styles
import s from './User.module.css'

// ? pages
import NotFound from './../../pages/NotFound/NotFound.jsx';

export default function User({
    openPopupPicture,
    isAuthorized,
    currentUser,
    handleChangeReaction,
    handleAddOrDeleteFavorites,
    notes,
    users
}) {
    const { nicknameId } = useParams();
    const userPageInfo = currentUser._id === nicknameId ? currentUser : users.find(element => element.id === nicknameId);

    if (!userPageInfo) return (<NotFound />)

    // const userPageNotes = notes.filter(element => element.owner === userPageInfo._id);
    const userPageNotes = notes.filter(element => false);

    console.log(userPageNotes)

    

    return (
        <section className={s.main}>
            <div className={s.end}>
                <p className='text text_color_second body'>
                    {!isAuthorized
                        ? 'To see the user details and notes, you have to login'
                        : true
                            ? 'The user has not yet written any notes'
                            : 'You have seen all user notes'
                    }
                </p>
            </div>
        </section>
    )
}