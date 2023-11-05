import Head from 'next/head'
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/pages/components/header';
import Display from '../components/leaderboard';
//stils
import styles from '@/styles/leaderboard.module.css'
import { useEffect, useState } from 'react';
import axios from 'axios';
//fonts
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  return (
    <>
      {/* Lapas galvene, kurā uzstāda nosaukumu un metadatus */}
      <Head>
        <title>Leaderboard</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {/* Lapas galvene ar nosaukumu un galvenes komponenti */}
      <div className={`${styles.fixed}`}>
        <Header />
        <main className={`${styles.main} ${inter.className}`}>
          <div className={`${styles.size}`}>
          <h1>
            Leaderboard
          </h1>
            {/* Iekļauj "Display" komponenti, kas rādīs lideru tabulu */}
            <Display />
          </div>
        </main>
      </div>
    </>
  )
}