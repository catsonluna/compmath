import React from 'react';
import styles from '@/styles/game.module.css';
function Calc() {
  return (
    <>
        <div className={`${styles.align}`}>
            <button className={`${styles.button}`} value={7}>7</button>
            <button className={`${styles.button}`} value={8}>8</button>
            <button className={`${styles.button}`} value={9}>9</button>
        </div>
            <div className={`${styles.align}`}>
            <button className={`${styles.button}`} value={4}>4</button>
            <button className={`${styles.button}`} value={5}>5</button>
            <button className={`${styles.button}`} value={6}>6</button>
        </div>
        <div className={`${styles.align}`}>
            <button className={`${styles.button}`} value={1}>1</button>
            <button className={`${styles.button}`} value={2}>2</button>
            <button className={`${styles.button}`} value={3}>3</button>
        </div>
        <div className={`${styles.align}`}>
            <button className={`${styles.button}`} value={0}>0</button>
        </div>
    </>
  );
}

export default Calc;

