import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Card from './card';

export default function MainPage(props) {
  //returns song recommendations onClick

  //this will be the array that we add the album artworks to after retreiving our tracks from recs
  const images = ['https://picsum.photos/404/604'];

  //this will be populated by the post request
  const tracksList = [];

  const [genre, setGenre] = useState('');
  const [trackList, setTracklist] = useState([]);

  function handleOnChange(e) {
    setGenre(e.target.value);
    console.log('genre', genre);
  }

  useEffect(() => {
    axios.defaults.withCredentials = true; // not what youre supposed to do
    //probably need to pass in headers
    const recs = axios
      .post('http://localhost:3000/getSongRecs', { genre: genre })
      .then((data) => console.log('Tracklist: ', data.data.tracks));
  }, [genre]);
  //^^^ can add a conditional to check to see if submit has been entered or not before checking genre changes

  return (
    //div for flex container
    <div id="main-page-container">
      {/* //input tag */}
      <div className="container1" id="searchbar">
        <input onChange={handleOnChange} placeholder="Enter Genre here"></input>
        <button id="searchbutton" onClick={props.getRecommendations}>
          Search
        </button>
      </div>
      <Card trackList={tracksList} images={images} />
      {/* //link button for playlist? */}
    </div>
  );
}
