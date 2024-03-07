/* eslint-disable no-unused-vars */
// ! modules
import { useEffect, useState } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';

// ? styles
import './App.css';

// ? components
import PopupPicture from './../components/PopupPicture/PopupPicture.jsx';

// ? pages
import Login from './../pages/Login/login.jsx';
import Notes from '../pages/Notes/Notes.jsx';
import NotFound from './../pages/NotFound/NotFound.jsx';
import Register from './../pages/Register/register.jsx';

// ? utils
import { WEB_SOCKET_SETTING } from './../utils/constants.js';

function App() {
  const navigate = useNavigate();

  // ? useStates
  // do we check token in local storage
  const [isTokenCheck, setTokenCheck] = useState(false);
  // is Chats Downloaded
  const [isNotesDownloaded, setNotesDownloaded] = useState(false);
  // is Users Downloaded
  const [isUsersDataDownloaded, setUsersDownloaded] = useState(false);
  // token
  const [token, setToken] = useState(null);
  // all info about user
  const [currentUser, setCurrentUser] = useState({
    _id: null, // number
    creationDate: null, // date
    notes: [],
    favorites: [],
    avatar: null, // url
    nickname: null,
    firstName: null,
    lastName: null,
    birthday: null, // date
    description: null,
  });
  // all chats
  const [allNotes, setAllNotes] = useState([]);
  // all users
  const [allUsers, setAllUsers] = useState([]);
  // socket
  const [socket, setSocket] = useState(null);
  // count all users
  const [countAllUsers, setCountAllUsers] = useState(null);
  // count all notes
  const [countAllNotes, setCountAllNotes] = useState(null);
  // is popup picture open or not
  const [isPopupPictureOpen, setPopupPictureOpen] = useState(false);
  // info about current picture
  const [currentPicture, setCurrentPicture] = useState({
    src: 'https://images.unsplash.com/photo-1531804055935-76f44d7c3621?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: null,
  });

  // errors
  const [errorsFromServer, setErrorsFromServer] = useState({
    login: '',
    register: '',
  });

  // ? useEffects

  useEffect(() => {
    const _socket = new WebSocket(WEB_SOCKET_SETTING.URL);
    setSocket(_socket);
  }, []);

  useEffect(() => {
    if (!token) return;

    socket.send(
      JSON.stringify({
        type: 'auth',
        action: 'login',
        method: 'by token',
        token: token,
      }),
    );
  }, [socket, token]);

  useEffect(() => {
    if (!socket || !isTokenCheck) return;

    // get all notes
    socket.send(
      JSON.stringify({
        type: 'note',
        action: 'get',
        method: 'all',
      }),
    );

    // get all users
    socket.send(
      JSON.stringify({
        type: 'user',
        action: 'get',
        method: 'all',
      }),
    );

    // get count of all users
    socket.send(
      JSON.stringify({
        type: 'info',
        action: 'count all users',
      }),
    );

    // get count of all notes
    socket.send(
      JSON.stringify({
        type: 'info',
        action: 'count all notes',
      }),
    );
  }, [socket, isTokenCheck]);

  useEffect(() => {
    if (!socket) return;

    // when open connection
    socket.addEventListener('open', (event) => {
      console.log('WebSocket connection opened');

      // try to login by token
      const token = localStorage.getItem('token');

      if (!token) return setTokenCheck(true);

      setToken(token);
    });

    socket.addEventListener('message', handleWebSocketResponse);

    socket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
    });

    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed');
      socket.removeEventListener('message', handleWebSocketResponse);
      setToken(null);
    });

    return () => {
      socket.removeEventListener('message', handleWebSocketResponse);
      socket.removeEventListener('error', () => {});
      socket.removeEventListener('close', () => {});
    };
  }, [socket]);

  // ? functions

  // * web-socket

  // handle Web-Socket for response from server
  function handleWebSocketResponse(event) {
    const answer = JSON.parse(event.data);
    console.log('Response from server:');
    console.log(answer);

    switch (answer.type) {
      case 'auth':
        switch (answer.action) {
          // login
          case 'login':
            // methods
            switch (answer.method) {
              // data
              case 'by data': {
                if (answer.errorMessage) {
                  return setErrorsFromServer((pre) => ({
                    ...pre,
                    login: answer.errorMessage,
                  }));
                }

                setCurrentUser({ ...currentUser, ...answer.data });
                setToken(answer.token);
                localStorage.setItem('token', answer.token);
                setTokenCheck(true);
                navigate('/');
                break;
              }
              // token
              case 'by token':
                setCurrentUser({ ...currentUser, ...answer.data });
                setTokenCheck(true);
                break;

              default:
                break;
            }
            break;

          // register
          case 'signup':
            if (answer.errorMessage) {
              return setErrorsFromServer((pre) => ({
                ...pre,
                register: answer.errorMessage,
              }));
            }
            setCurrentUser(answer.data);
            setToken(answer.token);
            localStorage.setItem('token', answer.token);
            navigate('/');
            setTokenCheck(true);
            break;

          default:
            break;
        }
        break;

      // info
      case 'info':
        switch (answer.action) {
          case 'count all users':
            setCountAllUsers(answer.data);
            break;

          case 'count all notes':
            setCountAllNotes(answer.data);
            break;

          default:
            break;
        }
        break;

      // user
      case 'user':
        switch (answer.action) {
          // get
          case 'get':
            // methods
            switch (answer.method) {
              // data
              case 'all':
                setAllUsers(answer.data);
                setUsersDownloaded(true);
                break;

              default:
                break;
            }
            break;

          default:
            break;
        }
        break;

      // note
      case 'note':
        switch (answer.action) {
          // get
          case 'get': {
            // methods
            switch (answer.method) {
              // data
              case 'all':
                setAllNotes(answer.data);
                setNotesDownloaded(true);
                break;

              default:
                break;
            }
            break;
          }

          // create
          case 'create': {
            setToken((token) => {
              if (token) {
                setCurrentUser((pre) => {
                  if (answer.data.owner === pre._id) {
                    return {
                      ...pre,
                      notes: [...pre.notes, answer.data._id],
                    };
                  } else {
                    return pre;
                  }
                });
                setAllUsers((pre) => {
                  const updatedUsers = pre.map((user) => {
                    if (user._id === answer.data.owner) {
                      return {
                        ...user,
                        notes: [...user.notes, answer.data._id],
                      };
                    } else {
                      return user;
                    }
                  });

                  return updatedUsers;
                });
              }

              return token;
            });

            setAllNotes((pre) => [...pre, answer.data]);
            setCountAllNotes((pre) => pre + 1);

            break;
          }

          // reaction
          case 'reaction': {
            // methods
            switch (answer.method) {
              // set
              case 'set':
              case 'delete': {
                setAllNotes((pre) => {
                  const updatedNotes = pre.map((note) => {
                    if (note._id === answer.data._id) {
                      return answer.data;
                    } else {
                      return note;
                    }
                  });
                  return updatedNotes;
                });

                break;
              }

              default:
                break;
            }
            break;
          }

          default:
            break;
        }
        break;

      // comment
      case 'comment':
        // todo
        break;

      default:
        break;
    }
  }

  // * auth

  // login to server
  function handleLogin(data) {
    console.log('submit login');
    socket.send(
      JSON.stringify({
        type: 'auth',
        action: 'login',
        method: 'by data',
        data: data,
        token: token,
      }),
    );
  }

  // register to server
  function handleRegister(data) {
    console.log('submit register');
    socket.send(
      JSON.stringify({
        type: 'auth',
        action: 'signup',
        method: '',
        data: data,
        token: token,
      }),
    );
  }

  // * note

  // set/delete reaction
  function handleChangeReaction(data, method) {
    if (token) {
      console.log('submit reaction');
      socket.send(
        JSON.stringify({
          type: 'note',
          action: 'reaction',
          method: method,
          data: data,
          token: token,
        }),
      );
    } else {
      // todo show
      console.log('user is not authorized');
    }
  }

  // * other

  // set info and open popup with picture
  function openPopupPicture(data) {
    document.body.style.overflow = 'hidden'; // disabled scroll
    setCurrentPicture(data);
    setPopupPictureOpen(true);
  }

  // close popup with picture
  function handlerClose() {
    document.body.style.overflow = ''; // enabled scroll
    setPopupPictureOpen(false);
  }

  return (
    <>
      {socket ? (
        <>
          {isPopupPictureOpen && (
            <PopupPicture
              src={currentPicture.src}
              alt={currentPicture.alt}
              handlerClose={handlerClose}
            />
          )}
          <Routes>
            <Route
              path='/'
              element={
                isUsersDataDownloaded && (
                  <Notes
                    openPopupPicture={openPopupPicture}
                    isAuthorized={!!token}
                    currentUser={currentUser}
                    handleChangeReaction={handleChangeReaction}
                    notes={allNotes}
                    users={allUsers}
                  />
                )
              }
            />

            <Route
              path='/login'
              element={
                <Login
                  handleSubmit={handleLogin}
                  error={errorsFromServer.login}
                />
              }
            />

            <Route
              path='/register'
              element={
                <Register
                  handleSubmit={handleRegister}
                  error={errorsFromServer.register}
                />
              }
            />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </>
      ) : (
        <p>todo preloader</p>
      )}
    </>
  );
}

export default App;
