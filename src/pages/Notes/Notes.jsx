// ? styles
import s from './Notes.module.css';

// ? components
import Note from '../../components/Note/Note';

export default function Notes({
  handleAddOrDeleteFavorites,
  handleChangeReaction,
  messageWhenNoNotes,
  handleDeleteNote,
  openPopupPicture,
  isAuthorized,
  messageInEnd,
  currentUser,
  notes,
  users,
}) {
  return (
    <section className={s.main}>
      {/* notes */}
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
              handleDeleteNote={handleDeleteNote}
              openPopupPicture={openPopupPicture}
              isAuthorized={isAuthorized}
              handleChangeReaction={handleChangeReaction}
              handleAddOrDeleteFavorites={handleAddOrDeleteFavorites}
              key={note._id}
              note={note}
              user={currentUser}
              users={users}
            />
          );
        })}

      {/* message */}
      <div className={s.end}>
        <p className='text text_color_second body'>
          {notes.length === 0 ? messageWhenNoNotes : messageInEnd}
        </p>
      </div>
    </section>
  );
}
