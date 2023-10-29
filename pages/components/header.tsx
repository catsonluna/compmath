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
      <button id="buttonChange" onClick={toggleDisplay} className={`${style.button}`}>
          <div className={style.iconWrapper}>
            <AiOutlineMenu />
          </div>
          </button>
        <div id="display" className={display}>
          <nav>
            <ul className={style.list}>
              <li><a className={`${style.res}`} href="/">Home</a></li>
              <li><a className={`${style.res}`} href="/profile">profile</a></li>
              <li><a className={`${style.res}`} href="/leaderboard">leaderboard</a></li>
              <li><a className={`${style.res}`} href="/game">Play a match</a></li>
            </ul>
          </nav>
        </div>
      </div>
    </header>
  );
}

export default Header;
