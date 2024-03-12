// ? styles
import s from './NewNote.module.css';

// ? assets
import pictureIcon from './../../assets/icon/picture.svg';
import sendIcon from './../../assets/icon/send.svg';

// ! modules
import { NavLink } from 'react-router-dom';
import { useState } from 'react';

function handleForm(e) {
    e.preventDefault();
}

export default function NewNote({ user }) {
    const [title, setTitle] = useState('');
    const [value, setValue] = useState('');
    return (
        <section className={s.global}>
            <form onSubmit={(e) => handleForm(e)} className={s.main}>
                {/* header */}
                <header className={s.header}>
                    <div className={`${s.container} ${s.container_size_max}`}>
                        <NavLink
                            to={`/user/${user._id}`}
                            className={`link ${s.header_link} ${s.owner} `}
                        >
                            <img
                                className={s.avatar}
                                src={user.avatar}
                                alt={`Avatar of ${user.nickname}`}
                            />
                        </NavLink>
                        <input className={`text title-third ${s.title}`} value={title} onChange={(e) => setTitle(e.target.value)} placeholder='Title'/>
                    </div>
                </header>
                {/* text */}
                <div className={s.value}>
                    <textarea className={'text label-second'} value={value} onChange={(e) => setValue(e.target.value)} placeholder="Write your message here"/>
                </div>
                {/* footer */}
                <footer className={s.footer}>
                    <div className={s.container}>
                        <button className='button'>
                            <img
                                src={pictureIcon}
                                alt='Photo icon'
                            />
                        </button>
                    </div>
                    <div className={s.container}>
                        {/* send */}
                        <button
                            // disabled={!isAuthorized}
                            className='button'
                        onClick={handleForm}
                        >
                            <img
                                src={sendIcon}
                                alt='Send icon'
                            />
                        </button>
                    </div>
                </footer>
            </form>
        </section>
    )
}