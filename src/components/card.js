import React, { useState, useRef } from 'react';
import { useSpring, animated } from '@react-spring/web';
import TinderCard from 'react-tinder-card';
import { Howl, Howler } from 'howler';

export default function Card({ trackList, setTrackList }) {
  // initialize sound as null w/ useRef
  let sound = useRef(null);
  let isPlaying = useRef(false);

  //add the fetch functions here
  // const [lastDirection, setLastDirection] = useState();
  const [trackArray, addTrack] = useState([]);

  const swiped = (direction, trackUri) => {
    console.log('DIRECTION: ', direction);
    // setLastDirection(direction);
    //if direction is right, add key/trackUri to playlist
    if (direction === 'right') {
      const newTrackArray = [...trackArray, trackUri];
      addTrack(newTrackArray);
    }
    if (isPlaying === true) {
      sound.stop();
    }

    isPlaying = false;
  };

  console.log('TRACK ARRAY: ', trackArray);

  const outOfFrame = (name) => {
    // check to see if name exists in trackList, if YES, pop it off
    let nameFound = false;

    for (const element of trackList) {
      if (element.trackUri === name) {
        nameFound = true;
      }
    }

    if (nameFound === true) {
      setTrackList((prevTrackList) => {
        const newTrackList = prevTrackList.slice();
        newTrackList.pop();
        return newTrackList;
      });
    }
  };

  const playSong = (previewUrl) => {
    if (isPlaying !== true) {
      isPlaying = true;
      //do some howler stuff
      const { Howl, Howler } = require('howler');

      sound = new Howl({
        src: [previewUrl + '.mp3'],
        html5: true,
        volume: 0.25,
      });

      sound.play();
    }
  };

  const tinderCards = trackList.map((track) => {
    return (
      <TinderCard
        flickOnSwipe
        className="swipe"
        key={track.trackUri}
        onSwipe={(dir) => swiped(dir, track.trackUri)}
        onCardLeftScreen={() => outOfFrame(track.trackUri)}
        preventSwipe={['up', 'down']}
      >
        <div
          className="card container1"
          style={{ backgroundImage: `url(${track.albumImg.url})` }}
        ></div>
        {/* <p>{props.trackList}</p> */}
        <button onClick={() => playSong(track.previewUrl)} id="playButton">
          Play
        </button>
      </TinderCard>
    );
  });

  return (
    <div className="cardContainer">
      {trackList.length > 0 && <div>{tinderCards}</div>}
    </div>
  );
}
