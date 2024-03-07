// ? styles
import s from './MainContainer.module.css';

export default function MainContainer({ children }) {
  return <section className={s.main}>{children}</section>;
}
