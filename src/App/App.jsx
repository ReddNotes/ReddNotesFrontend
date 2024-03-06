/* eslint-disable no-unused-vars */
// ? modules
import { useEffect, useState } from 'react';
import { Routes, Route } from 'react-router-dom';

// ? styles
import './App.css';

// ? pages
import Login from './../pages/Login/login.jsx';
import Register from './../pages/Register/register.jsx';

// ? utils
import { WEB_SOCKET_SETTING } from './../utils/constants.js';

function App() {
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
    isActive: false,
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

    // get all users
    socket.send(
      JSON.stringify({
        type: 'user',
        action: 'get',
        method: 'all',
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

  // connect to web-socket

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
              case 'by data':
                setCurrentUser({ ...currentUser, ...answer.data });
                setUsersDownloaded(true);
                setToken(answer.token);
                setTokenCheck(true);
                break;
              // token
              case 'by token':
                setCurrentUser({ ...currentUser, ...answer.data });
                setUsersDownloaded(true);
                setTokenCheck(true);
                break;

              default:
                break;
            }
            break;

          // register
          case 'signup':
            // todo
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
          case 'get':
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

          // create
          case 'create':
            // todo
            break;

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

  return (
    <>
      {socket ? (
        <Routes>
          <Route path='/' element={<div> todo make main components</div>} />
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
        </Routes>
      ) : (
        <p>todo preloader</p>
      )}
    </>
  );
}

export default App;
