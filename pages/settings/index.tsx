import Head from 'next/head';
import React from 'react';
import Image from 'next/image'
import { Inter } from 'next/font/google'
import Header from '@/pages/components/header';
// the style
import styles from 'styles/settings.module.css'
import { useRouter } from 'next/router';

export default function settings(){
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
                <div className="settings">
                <h2>Settings</h2>
                    <form>
                        <div className="form-group">
                            <label>Nickname:</label>
                            <input type="text" name="nickname" placeholder="Your new nickname" />
                        </div>
                        <div className="form-group">
                            <label>Bio:</label>
                            <textarea name="bio" placeholder="Your new bio"></textarea>
                        </div>
                        <div className="form-group">
                            <label>Password Change:</label>
                            <input type="password" name="password" placeholder="New Password" />
                        </div>
                        <div className="form-group">
                            <label>E-mail Change:</label>
                            <input type="email" name="email" placeholder="New E-mail" />
                        </div>
                        <div className="form-group">
                            <label>Preferred Side:</label>
                            <select name="side">
                                <option value="right">Right</option>
                                <option value="left">Left</option>
                            </select>
                        </div>
                        <div className="form-group">
                            <label>Upload Profile Picture:</label>
                            <input type="file" name="profilePicture" accept="image/*" />
                        </div>
                        <button type="submit">Save Changes</button>
                    </form>
                </div>
            </div>
            </>
        );
    };

      
