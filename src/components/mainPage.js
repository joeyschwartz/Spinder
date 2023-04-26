import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Card from './card';

export default function MainPage(props) {
  //returns song recommendations onClick

  //this will be the array that we add the album artworks to after retreiving our tracks from recs
  // const images = ['https://picsum.photos/404/604'];

  //this will be populated by the post request

  const [userGenre, setGenre] = useState('');
  const [trackList, setTracklist] = useState([]);

  const inputRef = useRef(null); // create a ref for the input field

  function handleOnChange(e) {
    //change to onclick for input field
    const newGenre = inputRef.current.value; // get the value of the input field using the ref
    setGenre(newGenre);
    // console.log('genre', userGenre);
  }

  function getSongRecs() {
    console.log('did we make it here?');
    axios.defaults.withCredentials = true; // not what youre supposed to do
    //probably need to pass in headers
    const recs = axios
      .post('http://localhost:3000/getSongRecs', { genres: userGenre })
      .then((res) => {
        //trackDetails is an array of objects [{}, {}, {}]
        console.log(res.data.trackDetails);
        setTracklist(res.data.trackDetails);
        // console.log('state: ', trackList);
      });
  }

  console.log('state: ', trackList);

  return (
    //div for flex container
    <div id="main-page-container">
      {/* //input tag */}
      <div className="container1" id="searchbar">
        <input
          // value={userGenre}
          onChange={handleOnChange}
          ref={inputRef}
          placeholder="Enter Genre here"
        ></input>
        <button onClick={() => getSongRecs()} id="searchbutton">
          Search
        </button>
      </div>
      <Card trackList={trackList} />
      {/* //link button for playlist? */}
    </div>
  );
}
