// ? styles
import s from './MainContainer.module.css';

// ? components
import MenuBar from './../../components/MenuBar/MenuBar';

export default function MainContainer({ children }) {
  return (
    <section className={s.main}>
      <MenuBar />

      {children}
    </section>
  );
}
