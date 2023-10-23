import Head from 'next/head';
import React from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from 'styles/settings.module.css'; // Import your CSS styles
import { useRouter } from 'next/router';

const inter = Inter({ subsets: ['latin'] });

export default function Settings() {
  return (
    <div className={styles.settingsContainer}>
      <Head>
        <title>Account Settings</title>
      </Head>
      <h2>Account Settings</h2>
      <form>
        <div className={styles.inputGroup}>
          <label htmlFor="nickname">Nickname:</label>
          <input type="text" id="nickname" className={styles.inputField} />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="password">Password</label>
          <input type="text" id="password" className={styles.inputField} />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="bio">Bio:</label>
          <input type="text" id="bio" className={styles.inputField} />
        </div>
        <div className={styles.inputGroup}>
          <label htmlFor="email">E-mail:</label>
          <input type="text" id="email" className={styles.inputField} />
        </div>

        {/* Choose preferred side */}
        <div className={styles.radioGroup}>
          <label>Preferred Side:</label>
          <div className={styles.radioButton}>
            <input type="radio" id="left" name="side" value="left" />
            <label htmlFor="left">Left</label>
          </div>
          <div className={styles.radioButton}>
            <input type="radio" id="right" name="side" value="right" />
            <label htmlFor="right">Right</label>
          </div>
        </div>

        {/* Upload profile picture */}
        <div className={styles.fileInput}>
          <label htmlFor="profilePicture">Upload Profile Picture:</label>
          <input type="file" id="profilePicture" accept=".jpg, .jpeg, .png" />
        </div>

        <button type="submit" className={styles.saveButton}>Save Changes</button>
      </form>
    </div>
  );
}

