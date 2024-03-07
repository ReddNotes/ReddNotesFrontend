// ! modules
import { NavLink } from 'react-router-dom'
import { useState } from 'react'

// ? styles
import s from './MenuBar.module.css'

// ? assets
import fireLogo from './../../assets/ReddNotes_logo_fire.svg'
import notesLogo from './../../assets/icon/notes.svg'
import userLogo from './../../assets/icon/user.svg'
import settingsLogo from './../../assets/icon/settings.svg'
import notesLogoRed from './../../assets/icon/notes_red.svg'
import userLogoRed from './../../assets/icon/user_red.svg'
import settingsLogoRed from './../../assets/icon/settings_red.svg'
import logoutLogo from './../../assets/icon/logout.svg'

export default function MenuBar() {
    const [onNotes, setOnNotes] = useState(true);
    const [onUser, setOnUser] = useState(false);
    const [onSettings, setOnSettings] = useState(false);

    const [notifOnNotes, setNotifOnNotes] = useState(true);
    const [notifOnUser, setNotifOnUser] = useState(false);
    const [notifOnSettings, setNotifOnSettings] = useState(false);

    return (
        <div className={s.main}>
            <div className={s.top_container}>
                <div className={s.top_container_top}>
                    <img src={fireLogo} alt="Redd Notes logo" />
                </div>
                <div className={s.top_container_bottom}>
                    <div className={s.top_container_link_container}>
                        <div className={s.left_border} id={onNotes ? s.current : ''}/>
                        <NavLink className={`${s.top_container_link} link`}>
                            <div id={notifOnNotes ? s.current : ''} />
                            <img src={onNotes ? notesLogoRed : notesLogo} alt="Notes Logo" />
                        </NavLink>
                    </div>
                    <div className={s.top_container_link_container}>
                        <div className={s.left_border} id={onUser ? s.current : ''}/>
                        <NavLink className={`${s.top_container_link} link`}>
                            <div id={notifOnUser ? s.current : ''} />
                            <img src={onUser ? userLogoRed : userLogo} alt="User Logo" />
                        </NavLink>
                    </div>
                    <div className={s.top_container_link_container}>
                        <div className={s.left_border} id={onSettings ? s.current : ''}/>
                        <NavLink className={`${s.top_container_link} link`}>
                            <div id={notifOnSettings ? s.current : ''} />
                            <img src={onSettings ? settingsLogoRed : settingsLogo} alt="Settings Logo" />
                        </NavLink>
                    </div>
                </div>
            </div>
            <div className={s.container_bottom}>
                <button className='button'>
                    <img src={logoutLogo} alt="Logout Logo" />
                </button>
            </div>
        </div>
    )
}