import React from 'react';
import styles from '@/styles/game.module.css';

function Calc({ setInputValue, disabled }) { // Add this line
  const handleClick = (event) => {
    // Append the new value to the existing inputValue
    setInputValue(inputValue => inputValue + event.target.value);
  }
  return (
    <>
        <div className={`${styles.align}`}>
            <button className={`${styles.button}`} value={7} onClick={handleClick} disabled={disabled}>7</button>
            <button className={`${styles.button}`} value={8} onClick={handleClick} disabled={disabled}>8</button>
            <button className={`${styles.button}`} value={9} onClick={handleClick} disabled={disabled}>9</button>
        </div>
        <div className={`${styles.align}`}>
            <button className={`${styles.button}`} value={4} onClick={handleClick} disabled={disabled}>4</button>
            <button className={`${styles.button}`} value={5} onClick={handleClick} disabled={disabled}>5</button>
            <button className={`${styles.button}`} value={6} onClick={handleClick} disabled={disabled}>6</button>
        </div>
        <div className={`${styles.align}`}>
            <button className={`${styles.button}`} value={1} onClick={handleClick} disabled={disabled}>1</button>
            <button className={`${styles.button}`} value={2} onClick={handleClick} disabled={disabled}>2</button>
            <button className={`${styles.button}`} value={3} onClick={handleClick} disabled={disabled}>3</button>
        </div>
        <div className={`${styles.align}`}>
            <button className={`${styles.button}`} value={0} onClick={handleClick} disabled={disabled}>0</button>
        </div>

        {/* Display the input field */}
    </>
  );
}

export default Calc;
