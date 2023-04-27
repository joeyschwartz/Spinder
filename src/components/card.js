import React, { useState } from 'react';
import { useSpring, animated } from '@react-spring/web';
import TinderCard from 'react-tinder-card';

// const images = [
//   'https://picsum.photos/400/600',
//   'https://picsum.photos/401/601',
//   'https://picsum.photos/402/602',
//   'https://picsum.photos/403/603',
//   'https://picsum.photos/404/604',
// ];

export default function Card({ trackList }) {
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
  };
  console.log('TRACK ARRAY: ', trackArray);

  const outOfFrame = (name) => {
    console.log((name = 'left the screen!'));
  };
  console.log('Tracklist: ', trackList);

  const tinderCards = trackList.map((track) => {
    return (
      <TinderCard
        flickOnSwipe
        className="swipe"
        key={track.trackUri}
        onSwipe={(dir) => swiped(dir, track.trackUri)}
        onCardLeftScreen={() => outOfFrame(track.albumImg.url)}
        preventSwipe={['up', 'down']}
      >
        <div
          className="card container1"
          style={{ backgroundImage: `url(${track.albumImg.url})` }}
        ></div>
        {/* <p>{props.trackList}</p> */}
        <button id="playButton">Play</button>
      </TinderCard>
    );
  });

  console.log('tinderCards, ', tinderCards);

  return (
    <div className="cardContainer">
      {trackList.length > 0 && <div>{tinderCards}</div>}
    </div>
  );
}
