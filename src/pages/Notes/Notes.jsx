// ? styles
import s from './Notes.module.css';

// ? components
import Note from '../../components/Note/Note';

export default function Notes({ notes, users }) {
  return (
    <section className={s.main}>
      {notes
        .sort((a, b) => {
          const dateA = new Date(a.creationDate);
          const dateB = new Date(b.creationDate);

          return dateB - dateA;
        })
        .map((note) => {
          for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (user._id === note.owner) {
              note.user = user;
            }
          }

          return <Note key={note._id} note={note} />;
        })}
    </section>
  );
}
