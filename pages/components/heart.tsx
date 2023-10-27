import React from 'react';
import { FaHeart } from 'react-icons/fa';
import styles from '@/styles/heart.module.css';
function Heart({num}: {num: number}) {
  return (
    <div className={`${styles.col}`}>
      {Array(num).fill(<FaHeart color="red" size={30}/>)}
    </div>
  );
}

export default Heart;
