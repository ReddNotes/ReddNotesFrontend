// ? styles
import s from './MainContainer.module.css';

// ? components
import Note from '../../components/Note/Note';

export default function MainContainer({ notes }) {
  return (
    <section className={s.main}>
      {notes
        .sort((a, b) => {
          const dateA = new Date(a.creationDate);
          const dateB = new Date(b.creationDate);

          return dateB - dateA;
        })
        .map((note) => {
          return <Note key={note._id} note={note} />;
        })}
    </section>
  );
}
