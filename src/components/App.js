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
