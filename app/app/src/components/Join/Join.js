import React, { useState } from 'react';

import './Join.css';

export const Join = (props) => {
  const [room, setRoom] = useState('');

  const connectToRoom = (e) => {
    e.preventDefault()
    props.setRoom(room)
  }

  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Join</h1>
        <div>
          <input placeholder="Room" className="joinInput mt-20" type="text" onChange={(event) => setRoom(event.target.value)} />
        </div>
        <button className={'button mt-20'} type="submit" onClick={connectToRoom} >Sign In</button>
      </div>
    </div>
  );
}