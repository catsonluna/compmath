import Head from 'next/head'
import React from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
// the style
import styles from 'styles/login.module.css'
// font
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [email,setEmail]=React.useState("")
    const [password,setPassword]=React.useState("")
    const [password2,setPassword2]=React.useState("")
  return (
    <>
      <Head>
        <title>Compmath</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={`${styles.main} ${inter.className}`}>
      <div className={styles['login-container']}>
                <h2>Register</h2>
                <form>
                    <input type="text" placeholder="E-mail" name="email" required onChange={(e)=>setEmail(e.target.value)}value={email}/>
                    <input type="password" placeholder="Password" name="password" required onChange={(e)=>setPassword(e.target.value)}value={password}/>
                    <input type="password" placeholder="Password" name="password2" required onChange={(e)=>setPassword2(e.target.value)}value={password2}/>
                    <input type="submit" value="Login" />
                    <input type="submit" value="Register" />
                </form>
            </div>
      </main>
    </>
  )
}
