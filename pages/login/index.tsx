import Head from 'next/head'
import { Inter } from 'next/font/google'
import Header from '@/pages/components/header';
import styles from 'styles/login.module.css'
import { useRouter } from 'next/router';
import React from 'react';
import axios from 'axios';
import { setCookie } from 'cookies-next';
import { Customalert } from'@/pages/components/alert';
// font
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const router=useRouter()
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
                  <h2>Login</h2>
                  <form onSubmit={(e) => {
                    e.preventDefault()

                    axios.post("/api/auth/login",{
                        email:email,
                        password:password
                        }).then((res)=>{
                        console.log(res.data)
                        setCookie("token",res.data.session_secret)
                        router.push("/")
                        }).catch((err)=>{console.log(err.response.data)
                        Customalert(err.response.data.error)}
                        )
                  }}>
                      <input type="text" placeholder="E-mail" name="email" required onChange={(e)=>setEmail(e.target.value)}value={email}/>
                      <input type="password" placeholder="Password" name="password" required onChange={(e)=>setPassword(e.target.value)}value={password}/>
                      <input type="submit" value="Login" />
                      <input type="submit" value="Register" onClick={(e)=>{router.push("/register")}}/>
                  </form>
              </div>
        </main>
      </div>
    </>
  )
}
