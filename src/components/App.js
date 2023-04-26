import React, { useEffect, useState } from 'react';
import MainPage from './mainPage';
import Login from './login';
import axios from 'axios';
// import * as Spotify from './fetch';

function App() {
  // A state that represents if user is logged in
  const [loggedIn, setLoggedIn] = useState(false);
  // Function that changes login status
  const handleLoginClick = (e) => {
    e.preventDefault();
    setLoggedIn(!loggedIn);
  };
  // If user is logged in, return mainpage component
  if (loggedIn) {
    return <MainPage />;
  }
  return <Login handleLoginClick={handleLoginClick} />;
}

export default App;

// //returns song recommendations onClick
// useEffect(() => {
//   axios.defaults.withCredentials = true; // not what youre supposed to do
//   const recs = axios
//     .post('http://localhost:3000/getSongRecs', { genre: 'pop' })
//     .then((data) => console.log('Tracklist: ', data.data.tracks));
//   console.log('cookies', recs);
//   // const recs = Spotify.getUser().then((data) => {
//   //   console.log('getUser data: ', data);
//   // });
// }, []);
