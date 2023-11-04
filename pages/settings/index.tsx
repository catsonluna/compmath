import Head from 'next/head';
import React from 'react';
import Image from 'next/image';
import { Inter } from 'next/font/google';
import styles from 'styles/settings.module.css'; // Import your CSS styles
import { useRouter } from 'next/router';
import { getCookie } from 'cookies-next';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] });

export default function Settings() {
  const router = useRouter();
  React.useEffect(() => {
    if (!getCookie('token')) {
      router.push('/login');
      return;
    }
  }, [])
  return (
    <div className={styles.settingsContainer}>
      <Head>
        <title>Account Settings</title>
      </Head>
      <h2>Account Settings</h2>
      <form onSubmit={(event) => {
        event.preventDefault();

        // Get the values from the form
        const nickname = (document.getElementById('nickname') as HTMLInputElement).value;
        const password = (document.getElementById('password') as HTMLInputElement).value;
        const bio = (document.getElementById('bio') as HTMLInputElement).value;
        const email = (document.getElementById('email') as HTMLInputElement).value;
        // Send the data to the server
        if(nickname.length > 0){
          axios.put("/api/profile/edit/USERNAME", {
            username: nickname,
          }, {
            headers: {
              "auth_token": getCookie('token')
            }
          }).then((res) => {
            console.log(res.data)
          }).catch((err) => {
            console.log(err.response.data)
          })
        }
        if(password.length > 0){
          axios.put("/api/profile/edit/PASSWORD", {
            password: password,
          }, {
            headers: {
              "auth_token": getCookie('token')
            }
          }).then((res) => {
            console.log(res.data)
          }).catch((err) => {
            console.log(err.response.data)
          })
        }
        if(bio.length > 0 && bio !== ""){
          axios.put("/api/profile/edit/BIO", {
            bio: bio,
          }, {
            headers: {
              "auth_token": getCookie('token')
            }
          }).then((res) => {
            console.log(res.data)
          }).catch((err) => {
            console.log(err.response.data)
          })
        }
        if(email.length > 0 && email !== ""){
          axios.put("/api/profile/edit/EMAIL", {
            email: email,
          }, {
            headers: {
              "auth_token": getCookie('token')
            }
          }).then((res) => {
            console.log(res.data)
          }).catch((err) => {
            console.log(err.response.data)
          })
        }
        // go to profile page
        router.push('/profile');
      }}>
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
        {/* <div className={styles.radioGroup}>
          <label>Preferred Side:</label>
          <div className={styles.radioButton}>
            <input type="radio" id="left" name="side" value="left" />
            <label htmlFor="left">Left</label>
          </div>
          <div className={styles.radioButton}>
            <input type="radio" id="right" name="side" value="right" />
            <label htmlFor="right">Right</label>
          </div>
        </div> */}

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
