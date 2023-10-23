import React, { useState } from 'react';
import style from '@/styles/header.module.css'
import { AiOutlineMenu } from 'react-icons/ai'

function Header() {
  const [display, setDisplay] = useState(style.displayNone);

  const toggleDisplay = () => {
    setDisplay(prevDisplay => prevDisplay === style.displayFlex ? style.displayNone : style.displayFlex);
  };

  return (
    <header className={`${style.header}`}>
      <div id="change" className={`${style.change}`}>
        <button id="buttonChange" onClick={toggleDisplay} className={`${style.button}`}><AiOutlineMenu /></button>
        <div id="display" className={display}>
          <nav>
            <ul>
              <li><a href="/">Home</a></li>
              <li><a href="/login">login</a></li>
              <li><a href="/settings">settings</a></li>
              <li><a href="/leaderboard">leaderboard</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
