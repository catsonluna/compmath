
import Head from 'next/head'
import React, { useEffect } from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/pages/components/header'
// the style
import styles from 'styles/profile.module.css'
import { useRouter } from 'next/router';
// font
import { logout } from '../components/profile';
import { getCookie } from 'cookies-next';
import axios from 'axios';

const inter = Inter({ subsets: ['latin'] })

export default function Profile(){
    const router=useRouter()
    const [profile, setProfile] = React.useState(null as any)
    useEffect(() => {
        if (!getCookie('token')) {
            router.push('/login')
            return
        }

        axios.get('/api/profile/me', {
            headers: {
                "auth_token": getCookie('token')
            }
        }).then((res) => {
            console.log(res.data.user)
            setProfile(res.data.user)
        })
    }, [])
    if(!profile){
        return <></>
    }
        return (
            <div className={styles.profile}>
                <div className={`${styles.fixed}`}>
                    <Header />
                    <div className={styles['pro']}>
                        <img className={styles['profile-picture']} src="profile-image.jpg" alt="Profile" />
                        <div className={styles['profile-info']}>
                            <h2>{profile.username}</h2>
                            <p>{profile.bio}</p>
                            <p>Elo: {profile.elo}</p>
                            <p>Match History: Wins: {profile.games_won ?? 0} / Losses: {profile.games_lost ?? 0} / Draws: {profile.games_drawn ?? 0}</p>
                        </div>
                        <div className={styles['profile-buttons']}>
                            <button onClick={() => {
                                router.push('/settings')
                            }}className={styles['profile-button']}>Settings</button>
                            <button className={styles['profile-button']} onClick={() => {
                                logout();
                                router.push('/login')
                            }}>Sign Out</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };