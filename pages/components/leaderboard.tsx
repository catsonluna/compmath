import React, { useState, useEffect } from 'react';
import style from '@/styles/leaderboard.module.css'

function Display(){
    const [leaderboard, setLeaderboard] = useState([
        {
            username: "afs",
            elo: 453543,
        },
        {
            username: "wef23f",
            elo: 323432,
        },
        {
            username: "ewfewfvscd",
            elo: 2133214,
        },
        {
            username: "wefgewg",
            elo: 132214214,
        }
    ])

    useEffect(() => {
        const sortedLeaderboard = [...leaderboard].sort((a, b) => b.elo - a.elo);
        setLeaderboard(sortedLeaderboard);
    }, []);

    const ordinalSuffix = (i) => {
        let j = i % 10;
        let k = i % 100;
        if (j == 1 && k != 11) {
            return i;
        }
        if (j == 2 && k != 12) {
            return i;
        }
        if (j == 3 && k != 13) {
            return i;
        }
        return i;
    }

    return (
        <>
        {leaderboard.map((player, index) => {
            let className;
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
                <div key={player.username} className={style.row}>
                    <h1 className={className}>{ordinalSuffix(index+1)}. {player.username}</h1>
                    <p className={className}>Elo: {player.elo}</p>
                </div>
            )
        })}
        </>
    )
}

export default Display
