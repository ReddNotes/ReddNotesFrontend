// PopupToDeleteNote.jsx

// ? styles
import s from './PopupToDeleteNote.module.css';

// ? assets
import closeIcon from './../../assets/icon/close.svg';

export default function PopupToDeleteNote({
  noteId,
  isActive,
  handlerClose,
  handleDeleteNote,
}) {
  function onClick() {
    handleDeleteNote({ noteId: noteId });
    handlerClose();
  }

  return (
    <section className={`${s.main} ${isActive && s.main_status_open}`}>
      <article className={s.popup}>
        {/* top */}
        <header className={s.header}>
          <h4 className='text label-first'>Delete this note ?</h4>
          <button onClick={handlerClose} className={`button ${s.close}`}>
            <img
              className={s.close_icon}
              src={closeIcon}
              alt='sign to close popup'
            />
          </button>
        </header>

        {/* main */}
        <div>
          <p className='text text_color_second subhead'>
            Once deleted, you will not be able to restore this note
          </p>
        </div>

        <footer className={s.footer}>
          <button
            onClick={onClick}
            className={`button text label-second ${s.button}`}
          >
            Delete
          </button>
        </footer>
      </article>
    </section>
  );
}
