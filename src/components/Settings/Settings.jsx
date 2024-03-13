// ! modules

// ? style
import s from './Settings.module.css';

export default function Settings({ darkMode, setDarkMode }) {
    return (
        <section className={s.global}>
            <dir className={s.main}>
                <h1>Settings</h1>
                <div className={s.entry}>
                    <p>Darkmode</p>
                    <div class="toggleWrapper">
                        <input type="checkbox" checked={darkMode} className={s.apple_switch} onChange={() => setDarkMode(!darkMode)} />
                    </div>
                </div>
            </dir>
        </section>
    )
}