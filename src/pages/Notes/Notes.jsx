// ? styles
import s from './Notes.module.css';

// ? components
import Note from '../../components/Note/Note';

export default function Notes({
  isAuthorized,
  currentUser,
  handleChangeReaction,
  notes,
  users,
}) {
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
            note.isReactionActive = false;
            note.isSavedFavorites = false;
            if (user._id === note.owner) {
              note.user = user;
            }
          }

          if (note.likes.includes(currentUser._id)) {
            note.isReactionActive = true;
          }
          if (isAuthorized && currentUser.favorites.includes(note._id)) {
            note.isSavedFavorites = true;
          }

          return (
            <Note
              isAuthorized={isAuthorized}
              handleChangeReaction={handleChangeReaction}
              key={note._id}
              note={note}
            />
          );
        })}
    </section>
  );
}
