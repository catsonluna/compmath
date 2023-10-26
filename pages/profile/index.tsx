import Head from 'next/head'
import React from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/pages/components/header'
// the style
import styles from 'styles/profile.module.css'
import { useRouter } from 'next/router';
// font
const inter = Inter({ subsets: ['latin'] })

export default function Profile(){
        return (
            <div className={styles.profile}>
                <div className={`${styles.fixed}`}>
                    <Header />
                    <div className={styles['pro']}>
                        <img className={styles['profile-picture']} src="profile-image.jpg" alt="Profile" />
                        <div className={styles['profile-info']}>
                            <h2>Nickname</h2>
                            <p>Bio: This is the user's bio. Lorem ipsum dolor sit amet, consectetur adipiscing elit.</p>
                            <p>Rank: Gold</p>
                            <p>Match History: Wins: 10 / Losses: 5</p>
                        </div>
                        <div className={styles['profile-buttons']}>
                            <button className={styles['profile-button']}>Settings</button>
                            <button className={styles['profile-button']}>Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };