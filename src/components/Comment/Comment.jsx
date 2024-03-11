// ! modules
import { Link } from 'react-router-dom';
import { useState } from 'react';

// ? styles
import s from './Comment.module.css';

// ? assets
import reactionIcon from './../../assets/icon/fire_empty.svg';
import reactionFillIcon from './../../assets/icon/fire_full.svg';
import sendIcon from './../../assets/icon/send.svg';

export default function Comment({
    note,
    user,
    users
}) {
    function formatDate(dateString) {
        const date = new Date(dateString);
        const currentDate = new Date();
        const diff = Math.floor((currentDate - date) / 1000); // Différence en secondes arrondie

        const intervals = {
            year: 31536000,
            month: 2592000,
            week: 604800,
            day: 86400,
            hour: 3600,
            minute: 60,
            second: 1
        };

        for (let key in intervals) {
            const interval = Math.floor(diff / intervals[key]);
            if (interval >= 1) {
                return interval + ' ' + key + (interval === 1 ? '' : 's') + ' ago';
            }
        }
        return 'Just now';
    }

    const [newComment, setNewComment] = useState('')

    function handleNewComment(e) {
        if (e[e.length - 1] === '\n') {
            return sendNewComment();
        }
        setNewComment(e)
    }

    function sendNewComment() {
        // todo implement send msg
        // if (newComment !== '') console.log('send');
    }

    return (
        <section className={s.main}>
            {note.comments.length === 0
                ? <p className={`text text_color_second body ${s.no_comments}`}>There are no comments under this post for the moment</p>
                : note.comments.map((comment) => {
                    const userCommentOwner = users.find(u => u._id === comment.owner);
                    return (
                        <article key={comment._id} className={`${s.content} ${user._id === comment.owner ? `${s.owner}` : ''}`}>
                            <Link className={`${s.header} ${user._id === comment.owner ? `${s.owner}` : ''} link`}>
                                <div className={`${s.header_avatar} ${user._id === comment.owner ? `${s.owner}` : ''}`}>
                                    <img src={userCommentOwner.avatar} className={s.profile_image} alt={`${userCommentOwner.nickname} avatar`} />
                                </div>
                                <h1>{userCommentOwner.nickname}</h1>
                            </Link>
                            <div className={`${s.comment} ${user._id === comment.owner ? `${s.owner}` : ''}`}>
                                <p>{comment.value}</p>
                            </div>
                            <div className={`${s.footer} ${user._id === comment.owner ? `${s.owner}` : ''}`}>
                                <p>{formatDate(comment.creationDate)}</p>
                                <div className={s.reaction}>
                                    {/* Todo implement reaction handler */}
                                    <p className={s.reaction_number}>{comment.likes.length}</p>
                                    <button className='button'>
                                        <img src={true ? reactionIcon : reactionFillIcon} alt="Reaction icon" />
                                    </button>
                                </div>
                            </div>
                        </article>
                    )
                })
            }
            <div className={s.send_container}>
                <div className={s.img_send_container}>
                    <img src={user.avatar} className={s.profile_image} alt={`${user.avatar} avatar`} />
                </div>
                <textarea type="text" placeholder='Write a comment...' value={newComment} onChange={e => handleNewComment(e.target.value)} />
                {/* Todo implement comment handler */}
                <button className='button' onClick={sendNewComment}>
                    <img src={sendIcon} alt="Send logo" />
                </button>
            </div>
        </section>
    )
}