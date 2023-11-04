import React, { useState, useEffect } from 'react';
import style from '@/styles/leaderboard.module.css';
import axios from 'axios';

function Display() {
    // Inicializē "leaderboard" stāvokļa mainīgo ar sākotnējiem spēlētāju datiem.
    const [leaderboard, setLeaderboard] = useState([
        {
            username: "raivo",
            elo: 123,
        }
    ]);

    // Izmanto "useEffect" kārtojumu, lai iegūtu datus no API, kad komponents tiek ielādēts.
    useEffect(() => {
        axios.get("/api/leaderboard").then((res) => {
            console.log(res.data); // Reģistrē API atbildes datus konsolē.
            // Atjauno "leaderboard" stāvokli ar iegūtajiem datiem.
            setLeaderboard(res.data.results);
        });
    }, []); // Tukšs masīvs "[]" nozīmē, ka šis kārtojums tiks izpildīts tikai vienreiz, kad komponents tiek ielādēts.

    // Funkcija, kas pievieno sufiksu skaitļiem (1st, 2nd, 3rd, 4th, ...).
    const ordinalSuffix = (i) => {
        let j = i % 10;
        let k = i % 100;
        if (j === 1 && k !== 11) {
            return i + "st";
        }
        if (j === 2 && k !== 12) {
            return i + "nd";
        }
        if (j === 3 && k !== 13) {
            return i + "rd";
        }
        return i + "th";
    };

    return (
        <div className={style.leaderboard}>
            <h2>Top Ten Players</h2>

            {/* Kartē cauri "leaderboard" masīvam un attēlo spēlētāju informāciju. */}
            {leaderboard.map((player, index) => {
                let className;

                // Nosaka CSS klasi stila pielietošanai, pamatojoties uz spēlētāja rangu.
                if (index === 0) {
                    className = style.first;
                } else if (index === 1) {
                    className = style.second;
                } else if (index === 2) {
                    className = style.third;
                } else {
                    className = style.rest;
                }

                return (
                    <div key={player.username} className={`${style.row} ${className}`}>
                        <h1>{ordinalSuffix(index + 1)}. {player.username}</h1>
                        <p>Elo: {player.elo}</p>
                    </div>
                );
            })}
        </div>
    );
}

export default Display;