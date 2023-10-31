import Head from 'next/head'
import React from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/pages/components/header'
// the style
import styles from 'styles/login.module.css'
import { useRouter } from 'next/router';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { Customalert } from'@/pages/components/alert';
// font
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const router=useRouter()
    const [username,setUsername]=React.useState("")
    const [email,setEmail]=React.useState("")
    const [password,setPassword]=React.useState("")
  return (
    <>
      <Head>
        <title>Compmath</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div className={`${styles.fixed}`}>
        <Header />
        <main className={`${styles.main} ${inter.className}`}>
        <div className={styles['login-container']}>
                  <h2>Register</h2>
                  <form onSubmit={
                    (e)=>{
                      e.preventDefault()
                      // check if its login or register
                      if(e.type == "login") {
                        return
                      }
                      axios.post("/api/auth/register",{
                        username:username,
                        email:email,
                        password:password
                      }).then((res)=>{
                        console.log(res.data)
                        setCookie("session_token",res.data.session_secret)
                        // redirect to main page
                        router.push("/")
                      }).catch((err)=>{console.log(err.response.data)
                        Customalert(err.response.data.error)}
                      )
                    }
                  }>
                  <input type="text" placeholder="Username" name="username" required onChange={(e)=>setUsername(e.target.value)}value={username}/>
                      <input type="text" placeholder="E-mail" name="email" required onChange={(e)=>setEmail(e.target.value)}value={email}/>
                      <input type="password" placeholder="Password" name="password" required onChange={(e)=>setPassword(e.target.value)}value={password}/>
                      <input type="submit" value="Register" />
                      <input type="submit" value="Login" onClick={(e)=>{router.push("/login")}}/>
                  </form>
              </div>
        </main>
      </div>
    </>
  )
}
