/* eslint-disable no-unused-vars */
// ! modules
import { useEffect, useLayoutEffect, useState } from 'react';
import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';

// ? styles
import './App.css';

// ? components
import ListNotifications from '../components/ListNotifications/ListNotifications.jsx';
import MenuBar from './../components/MenuBar/MenuBar.jsx';
import PopupPicture from './../components/PopupPicture/PopupPicture.jsx';
import Preloader from '../components/Preloader/Preloader.jsx';
import ProtectedRoute from './../components/ProtectedRoute/ProtectedRoute.js';
import User from './../components/User/User.jsx';

// ? pages
import Login from './../pages/Login/login.jsx';
import MainContainer from './../pages/MainContainer/MainContainer.jsx';
import Notes from './../pages/Notes/Notes.jsx';
import NotFound from './../pages/NotFound/NotFound.jsx';
import Register from './../pages/Register/register.jsx';
import Settings from '../components/Settings/Settings.jsx';

// ? utils
import { WEB_SOCKET_SETTING } from './../utils/constants.js';
import AboutPage from '../pages/AboutPage/AboutPage.jsx';
import NewNote from '../components/NewNote/NewNote.jsx';

function App() {
  const navigate = useNavigate();

  let page = useLocation().pathname;
  if (page.startsWith('/user')) page = '/user';

  // ? useStates
  // do we check token in local storage
  const [isTokenCheck, setTokenCheck] = useState(false);
  // is Chats Downloaded
  const [isNotesDownloaded, setNotesDownloaded] = useState(false);
  // is Users Downloaded
  const [isUsersDataDownloaded, setUsersDownloaded] = useState(false);
  // token
  const [token, setToken] = useState(null);
  const _emptyUser = {
    _id: null, // string
    creationDate: null, // date
    notes: [], // array of id
    favorites: [], // array of id
    avatar: null, // string (url)
    nickname: null, // string
    firstName: null, // string
    lastName: null, // string
    birthday: null, // date
    description: null, // string
  };
  // all info about user
  const [currentUser, setCurrentUser] = useState(_emptyUser);
  // all notes
  const [allNotes, setAllNotes] = useState([]);
  // all users
  const [allUsers, setAllUsers] = useState([]);
  // all notifications
  const [allNotifications, setAllNotifications] = useState([]);
  // max id of notifications
  const [maxIdNotification, setMaxIdNotification] = useState(0);
  // socket
  const [socket, setSocket] = useState(null);
  // count all users
  const [countAllUsers, setCountAllUsers] = useState(null);
  // is count all users Downloaded
  const [isCountAllUsersDownloaded, setCountAllUsersDownloaded] =
    useState(false);
  // count all notes
  const [countAllNotes, setCountAllNotes] = useState(null);
  // is count all notes Downloaded
  const [isCountAllNotesDownloaded, setCountAllNotesDownloaded] =
    useState(false);
  // is popup picture open or not
  const [isPopupPictureOpen, setPopupPictureOpen] = useState(false);
  // info about current picture
  const [currentPicture, setCurrentPicture] = useState({
    src: 'https://images.unsplash.com/photo-1531804055935-76f44d7c3621?q=80&w=3088&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D',
    alt: null,
  });
  // darkMode
  const [isDarkModeEnabled, setDarkModeEnabled] = useState(false);
  // notification
  const [isNotificationEnabled, setNotificationEnabled] = useState(false);

  // errors
  const [errorsFromServer, setErrorsFromServer] = useState({
    login: '',
    register: '',
  });

  // ? useEffects

  // first connect to web socket
  useEffect(() => {
    const _socket = new WebSocket(WEB_SOCKET_SETTING.URL);
    setSocket(_socket);
  }, []);

  useEffect(() => {
    if (!socket || !token || isTokenCheck) return;

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

    if (!isCountAllUsersDownloaded) {
      // get count of all users
      socket.send(
        JSON.stringify({
          type: 'info',
          action: 'count all users',
        }),
      );
    }

    if (!isCountAllNotesDownloaded) {
      // get count of all notes
      socket.send(
        JSON.stringify({
          type: 'info',
          action: 'count all notes',
        }),
      );
    }

    if (!isUsersDataDownloaded) {
      // get all users
      socket.send(
        JSON.stringify({
          type: 'user',
          action: 'get',
          method: 'all',
        }),
      );
    }

    if (!isNotesDownloaded) {
      // get all notes
      socket.send(
        JSON.stringify({
          type: 'note',
          action: 'get',
          method: 'all',
        }),
      );
    }
  }, [socket, isTokenCheck]);

  useEffect(() => {
    if (!socket) return;

    // when open connection
    socket.addEventListener('open', (event) => {
      console.log('WebSocket connection opened');
      // console.log(event);

      // try to login by token
      const token = localStorage.getItem('token');

      if (!token || token === 'null') return setTokenCheck(true);

      setToken(token);
    });

    socket.addEventListener('message', handleWebSocketResponse);

    socket.addEventListener('error', (error) => {
      console.error('WebSocket error:', error);
    });

    socket.addEventListener('close', () => {
      console.log('WebSocket connection closed');
      socket.removeEventListener('message', handleWebSocketResponse);
      setSocket(null);

      const _socket = new WebSocket(WEB_SOCKET_SETTING.URL);
      setSocket(_socket);
    });

    return () => {
      socket.removeEventListener('message', handleWebSocketResponse);
      socket.removeEventListener('error', () => {});
      socket.removeEventListener('close', () => {});
    };
  }, [socket]);

  // check local storage
  useEffect(() => {
    let LSisDarkModeEnabled = '';
    let _isDarkModeEnabled = false;
    let LSisNotificationEnabled = '';
    let _isNotificationEnabled = true;

    if (!!token) {
      const LSuser = JSON.parse(localStorage.getItem(currentUser.nickname));
      _isDarkModeEnabled = LSuser.isDarkModeEnabled || false;
      _isNotificationEnabled = LSuser.isNotificationEnabled;
    } else {
      LSisDarkModeEnabled = localStorage.getItem('isDarkModeEnabled');
      _isDarkModeEnabled =
        LSisDarkModeEnabled === 'true'
          ? true
          : LSisDarkModeEnabled === 'false'
          ? false
          : false;

      LSisNotificationEnabled = localStorage.getItem('isNotificationEnabled');
      _isNotificationEnabled =
        LSisNotificationEnabled === 'true'
          ? true
          : LSisNotificationEnabled === 'false'
          ? false
          : true;
    }

    const _root = document.getElementById('root');
    const _html = document.querySelector('html');

    if (_isDarkModeEnabled) {
      _root.setAttribute('data-theme', 'dark');
      _html.setAttribute('data-theme', 'dark');
    } else {
      _root.setAttribute('data-theme', 'light');
      _html.setAttribute('data-theme', 'light');
    }
    localStorage.setItem('isDarkModeEnabled', _isDarkModeEnabled);
    localStorage.setItem('isNotificationEnabled', _isNotificationEnabled);
    setDarkModeEnabled(_isDarkModeEnabled);
    setNotificationEnabled(_isNotificationEnabled);
  }, [currentUser]);

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

                const _data = JSON.parse(
                  localStorage.getItem(answer.data.nickname),
                );

                const _dataToSave = { ..._data };

                _dataToSave.token = answer.token;
                _dataToSave.avatar = answer.data.avatar;

                localStorage.setItem(
                  answer.data.nickname,
                  JSON.stringify(_dataToSave),
                );

                createNotification({
                  title: 'Login',
                  text: `You successfully login as ${answer.data.nickname}`,
                  isError: false,
                });

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

            if (answer.token) {
              setToken(answer.token);
              setCurrentUser({ ...currentUser, ...answer.data });
              setToken(answer.token);

              localStorage.setItem('token', answer.token);

              const _data = JSON.parse(localStorage.get(answer.data.nickname));

              const _dataToSave = { ..._data };

              _dataToSave.token = answer.token;
              _dataToSave.avatar = answer.data.avatar;

              localStorage.setItem(
                answer.data.nickname,
                JSON.stringify(_dataToSave),
              );

              localStorage.setItem(answer.data.nickname, JSON.stringify(_data));

              setTokenCheck(true);

              socket.send(
                JSON.stringify({
                  type: 'note',
                  action: 'create',
                  data: {
                    title: 'I just signed up',
                    description:
                      'In this moment, in this second, I became part of the ReddNotes community',
                  },
                  token: answer.token,
                }),
              );

              createNotification({
                title: 'Register',
                text: `You successfully register an account as ${answer.data.nickname}`,
                isError: false,
              });
            } else {
              setAllUsers((pre) => {
                pre.push(answer.data);
                return pre;
              });

              createNotification({
                title: 'Register',
                text: `${answer.data.nickname} successfully register in ReddNotes`,
                isError: false,
              });
            }

            navigate('/');
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
            setCountAllUsersDownloaded(true);
            break;

          case 'count all notes':
            setCountAllNotes(answer.data);
            setCountAllNotesDownloaded(true);
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

          // update
          case 'update': {
            let nickname = '';
            let isOwner = false;
            setAllUsers((pre) =>
              pre.map((user) => {
                if (user._id === answer.data._id) {
                  nickname = answer.data.nickname;
                  if (currentUser._id === answer.data._id) {
                    setCurrentUser(answer.data);
                    isOwner = true;
                  }
                  return answer.data;
                } else {
                  return user;
                }
              }),
            );

            createNotification({
              title: 'Update profile info',
              text: `${
                isOwner ? 'You' : nickname ? nickname : 'Someone'
              } successfully update profile`,
              isError: false,
            });

            break;
          }

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
            let isOwner = false;
            let nickname = '';

            setToken((token) => {
              if (token) {
                setCurrentUser((pre) => {
                  if (answer.data.owner === pre._id) {
                    isOwner = true;
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
                      nickname = user.nickname;
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

            createNotification({
              title: 'A new note',
              text: `${
                isOwner ? 'You' : nickname ? nickname : 'Someone'
              } just create a new note`,
              isError: false,
            });

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
                      const _note = { ...note };
                      _note.likes = answer.data.likes;
                      return _note;
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

          // favorite
          case 'favorite': {
            // methods
            switch (answer.method) {
              // add and delete
              case 'add':
              case 'delete': {
                setCurrentUser({ ...currentUser, ...answer.data });
                setAllNotes((pre) => pre);
                setAllUsers((pre) => {
                  const updatedUsers = pre.map((user) => {
                    if (user._id === answer.data._id) {
                      return answer.data;
                    } else {
                      return user;
                    }
                  });
                  return updatedUsers;
                });

                break;
              }

              default:
                break;
            }
            break;
          }

          // delete
          case 'delete': {
            setAllNotes((pre) => {
              const updatedNotes = [];
              pre.map((note) => {
                if (note._id !== answer.data._id) updatedNotes.push(note);
              });
              return updatedNotes;
            });

            setCountAllNotes((pre) => pre - 1);

            break;
          }

          default:
            break;
        }
        break;

      // comment
      case 'comment':
        switch (answer.action) {
          // create
          case 'create': {
            setAllNotes((pre) => {
              const updatedNotes = pre.map((note) => {
                if (note._id === answer.data.noteId) {
                  const _note = { ...note };
                  _note.comments.push(answer.data);
                  return _note;
                } else {
                  return note;
                }
              });

              return updatedNotes;
            });
            break;
          }

          // delete
          case 'delete': {
            setAllNotes((pre) => {
              const updatedNotes = pre.map((note) => {
                if (note._id === answer.data.noteId) {
                  const _note = { ...note };
                  _note.comments = _note.comments.filter(
                    (c) => c._id !== answer.data._id,
                  );
                  return _note;
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
      }),
    );
  }

  // login to server by token
  function handleLoginByToken(token) {
    console.log('submit login');
    socket.send(
      JSON.stringify({
        type: 'auth',
        action: 'login',
        method: 'by token',
        token: token,
      }),
    );
    localStorage.setItem('token', token);
    setToken(token);
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
  // create a new one note
  function handleCreateNote(data) {
    if (token) {
      console.log('submit create note');
      socket.send(
        JSON.stringify({
          type: 'note',
          action: 'create',
          data: data,
          token: token,
        }),
      );
    } else {
      // todo show
      console.log('user is not authorized');
    }
  }

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

  // add/delete to/from favorites
  function handleAddOrDeleteFavorites(data, method) {
    if (token) {
      console.log('submit favorite');
      socket.send(
        JSON.stringify({
          type: 'note',
          action: 'favorite',
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

  // delete note
  function handleDeleteNote(data) {
    if (token) {
      console.log('submit delete note');
      socket.send(
        JSON.stringify({
          type: 'note',
          action: 'delete',
          data: data,
          token: token,
        }),
      );
    } else {
      // todo show
      console.log('user is not authorized');
    }
  }

  // * comment

  // create a comment
  function handleCreateComment(data) {
    if (token) {
      console.log('submit create comment');
      socket.send(
        JSON.stringify({
          type: 'comment',
          action: 'create',
          data: data,
          token: token,
        }),
      );
    } else {
      // todo show
      console.log('user is not authorized');
    }
  }

  // delete a comment
  function handleDeleteComment(data) {
    if (token) {
      console.log('submit delete comment');
      socket.send(
        JSON.stringify({
          type: 'comment',
          action: 'delete',
          data: data,
          token: token,
        }),
      );
    } else {
      // todo show
      console.log('user is not authorized');
    }
  }

  // * user

  // update info about user
  function handleUserUpdateSubmit(data) {
    if (token) {
      console.log('submit update user data');
      socket.send(
        JSON.stringify({
          type: 'user',
          action: 'update',
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
  function closePopupWithPicture() {
    document.body.style.overflow = ''; // enabled scroll
    setPopupPictureOpen(false);
  }

  // logout
  function handlerLogout() {
    localStorage.setItem('token', null);
    setCurrentUser(_emptyUser);
    setToken(null);
  }

  // create notification
  function createNotification(data) {
    setNotificationEnabled((preNotification) => {
      if (preNotification) {
        setMaxIdNotification((preId) => {
          setAllNotifications((pre) => [
            ...pre,
            {
              id: preId,
              title: data.title,
              text: data.text,
              isError: data.isError,
            },
          ]);

          return preId + 1;
        });
      }
      return preNotification;
    });
  }

  return (
    <>
      {isUsersDataDownloaded && isNotesDownloaded && socket ? (
        <>
          {isPopupPictureOpen && (
            <PopupPicture
              src={currentPicture.src}
              alt={currentPicture.alt}
              handlerClose={closePopupWithPicture}
            />
          )}

          {['/', '/user', '/favorite', '/settings'].includes(page) && (
            <MenuBar
              pathname={page}
              user={currentUser}
              isAuthorized={!!token}
              handlerLogout={handlerLogout}
            />
          )}

          <ListNotifications
            isAuthorized={!!token}
            notifications={allNotifications}
            setNotifications={setAllNotifications}
          />

          <Routes>
            <Route
              path='/'
              element={
                <MainContainer isAuthorized={!!token}>
                  {!!token && (
                    <NewNote
                      user={currentUser}
                      handleCreateNote={handleCreateNote}
                    />
                  )}
                  <Notes
                    notes={allNotes}
                    users={allUsers}
                    isAuthorized={!!token}
                    currentUser={currentUser}
                    handleDeleteNote={handleDeleteNote}
                    openPopupPicture={openPopupPicture}
                    handleCreateComment={handleCreateComment}
                    handleDeleteComment={handleDeleteComment}
                    handleChangeReaction={handleChangeReaction}
                    messageWhenNoNotes='No one post any note'
                    messageInEnd='You have seen all your notes'
                    handleAddOrDeleteFavorites={handleAddOrDeleteFavorites}
                  />
                </MainContainer>
              }
            />

            <Route
              path='/user/:userId'
              element={
                <MainContainer isAuthorized={!!token}>
                  <User
                    notes={allNotes}
                    users={allUsers}
                    isAuthorized={!!token}
                    currentUser={currentUser}
                    handleDeleteNote={handleDeleteNote}
                    openPopupPicture={openPopupPicture}
                    handleSubmit={handleUserUpdateSubmit}
                    handleCreateComment={handleCreateComment}
                    handleDeleteComment={handleDeleteComment}
                    handleChangeReaction={handleChangeReaction}
                    handleAddOrDeleteFavorites={handleAddOrDeleteFavorites}
                  />
                </MainContainer>
              }
            />

            <Route
              path='/favorite'
              element={
                <ProtectedRoute isActive={!!token} to='/'>
                  <MainContainer isAuthorized={!!token}>
                    <Notes
                      notes={allNotes.filter((note) =>
                        currentUser.favorites.includes(note._id),
                      )}
                      users={allUsers}
                      isAuthorized={!!token}
                      currentUser={currentUser}
                      handleDeleteNote={handleDeleteNote}
                      openPopupPicture={openPopupPicture}
                      handleCreateComment={handleCreateComment}
                      handleDeleteComment={handleDeleteComment}
                      handleChangeReaction={handleChangeReaction}
                      messageWhenNoNotes={
                        !token
                          ? 'To see favorites notes, before you have to login'
                          : 'You do not have any note yet'
                      }
                      messageInEnd='You have seen all your favorite notes'
                      handleAddOrDeleteFavorites={handleAddOrDeleteFavorites}
                    />
                  </MainContainer>
                </ProtectedRoute>
              }
            />

            <Route
              path='/settings'
              element={
                <MainContainer isAuthorized={!!token}>
                  <Settings
                    user={currentUser}
                    isAuthorized={!!token}
                    handleLogin={handleLoginByToken}
                    isDarkModeEnabled={isDarkModeEnabled}
                    setDarkModeEnabled={setDarkModeEnabled}
                    isNotificationEnabled={isNotificationEnabled}
                    setNotificationEnabled={setNotificationEnabled}
                  />
                </MainContainer>
              }
            />

            <Route
              path='/login'
              element={
                <ProtectedRoute isActive={!token}>
                  <Login
                    handleSubmit={handleLogin}
                    error={errorsFromServer.login}
                  />
                </ProtectedRoute>
              }
            />

            <Route
              path='/register'
              element={
                <ProtectedRoute isActive={!token}>
                  <Register
                    handleSubmit={handleRegister}
                    error={errorsFromServer.register}
                  />
                </ProtectedRoute>
              }
            />

            <Route path='/about' element={<AboutPage />} />

            <Route path='*' element={<NotFound />} />
          </Routes>
        </>
      ) : (
        <Preloader />
      )}
    </>
  );
}

export default App;
