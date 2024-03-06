// styles
import s from './MainContainer.module.css';

export default function MainContainer({children}) {
    return (
        <div className={s.main}>
            {children}
        </div>
    )
}