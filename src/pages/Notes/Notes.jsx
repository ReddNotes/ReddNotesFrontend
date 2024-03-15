// ! modules
import { useState } from 'react';

// ? styles
import s from './Notes.module.css';

// ? components
import Note from './../../components/Note/Note';
import PopupToDeleteNote from './../../components/PopupToDeleteNote/PopupToDeleteNote';

export default function Notes({
  handleAddOrDeleteFavorites,
  handleChangeReaction,
  handleCreateComment,
  handleDeleteComment,
  messageWhenNoNotes,
  handleDeleteNote,
  openPopupPicture,
  isAuthorized,
  messageInEnd,
  currentUser,
  notes,
  users,
}) {
  // ? useStates

  const [isPopupDeleteOpen, setPopupDeleteOpen] = useState(false);
  const [noteIdToDelete, setNoteIdToDelete] = useState('');

  // ? functions
  // open popup to delete note
  function handleClickDelete({ noteId }) {
    document.body.style.overflow = 'hidden'; // disabled scroll
    setPopupDeleteOpen(true);
    setNoteIdToDelete(noteId);
  }

  // close popup to delete note
  function handlerClosePopupToDeleteNote() {
    setPopupDeleteOpen(false);
    document.body.style.overflow = ''; // enabled scroll
  }

  return (
    <>
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
                handleDeleteNote={handleClickDelete}
                openPopupPicture={openPopupPicture}
                isAuthorized={isAuthorized}
                handleChangeReaction={handleChangeReaction}
                handleAddOrDeleteFavorites={handleAddOrDeleteFavorites}
                handleCreateComment={handleCreateComment}
                isButtonDeleteNoteActive={!isPopupDeleteOpen}
                handleDeleteComment={handleDeleteComment}
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

      <PopupToDeleteNote
        noteId={noteIdToDelete}
        isActive={isPopupDeleteOpen}
        handleDeleteNote={handleDeleteNote}
        handlerClose={handlerClosePopupToDeleteNote}
      />
    </>
  );
}
