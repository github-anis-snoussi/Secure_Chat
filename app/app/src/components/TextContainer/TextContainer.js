import React from 'react';

import onlineIcon from '../../icons/onlineIcon.png';

import './TextContainer.css';

export const TextContainer = ({ users }) => (
  <div className='textContainer'>
    <div>
      <h1>
        Secure Chat
        <br />
        Application
      </h1>
    </div>
    {users ? (
      <div>
        <h1>Users chatting</h1>
        <div className='activeContainer'>
          <h2>
            {users.map(({ name }) => (
              <div key={name} className='activeItem'>
                {name}
                <img alt='Online Icon' src={onlineIcon} />
              </div>
            ))}
          </h2>
        </div>
      </div>
    ) : null}
  </div>
);
