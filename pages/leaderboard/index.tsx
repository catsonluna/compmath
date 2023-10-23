import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
// the style
import styles from '@/styles/Home.module.css'
import { useState } from 'react'
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
      <main className={`${styles.main} ${inter.className}`}>
        <div>
        <h1>
            <input onChange={(e) => setUsername(e.target.value)} value={username} />
          leaderboard
        </h1>
        </div>
      </main>
    </>
  )
}
