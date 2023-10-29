import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/pages/components/header';
import Display from '../components/leaderboard';
// the style
import styles from '@/styles/leaderboard.module.css'
import { useState } from 'react';
// font
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
    const [username, setUsername] = useState('')

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
          <div className={`${styles.size}`}>
          <h1>
            Leaderboard
          </h1>
            <Display />
          </div>
        </main>
      </div>
    </>
  )
}
