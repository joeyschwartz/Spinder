import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import Card from './card';

export default function MainPage(props) {
  //returns song recommendations onClick

  //this will be the array that we add the album artworks to after retreiving our tracks from recs
  const images = ['https://picsum.photos/404/604'];

  //this will be populated by the post request
  const tracksList = [];

  const [userGenre, setGenre] = useState('');
  const [trackList, setTracklist] = useState([]);

  // const state = {
  //   [{artistName:
  //   trackID: //this will be used later in the form of an array of trackIDs to create the playlist on api request
  //   trackURI:
  //   albumArtwork:}
  //   ]
  // }

  const inputRef = useRef(null); // create a ref for the input field

  function handleOnChange(e) {
    //change to onclick for input field
    const newGenre = inputRef.current.value; // get the value of the input field using the ref
    setGenre(newGenre);
    console.log('genre', userGenre);

    // useEffect(() => {
    axios.defaults.withCredentials = true; // not what youre supposed to do
    //probably need to pass in headers
    const recs = axios
      .post('http://localhost:3000/getSongRecs', { genre: userGenre })
      .then((data) => console.log('Tracklist: ', data.data.tracks));
    // }, [genre]);
    //^^^ can add a conditional to check to see if submit has been entered or not before checking genre changes
  }

  return (
    //div for flex container
    <div id="main-page-container">
      {/* //input tag */}
      <div className="container1" id="searchbar">
        <input ref={inputRef} placeholder="Enter Genre here"></input>
        <button onClick={handleOnChange} id="searchbutton">
          Search
        </button>
      </div>
      <Card trackList={tracksList} images={images} />
      {/* //link button for playlist? */}
    </div>
  );
}
