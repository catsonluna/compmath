import React, { useState, useEffect } from 'react';
import style from '@/styles/leaderboard.module.css';

function Display() {
    const [leaderboard, setLeaderboard] = useState([
        // ...your player data...
        {
            username: "raivo",
            elo: 123,
        },
        {
            username: "davis",
            elo: 323,
        },
        {
            username: "as",
            elo: 37,
        },
        {
            username: "avi",
            elo: 3734,
        },
        {
            username: "avs",
            elo: 33,
        },
        {
            username: "a1evis",
            elo: 3731,
        },
        {
            username: "aves",
            elo: 3,
        },
        {
            username: "avies",
            elo: 3173,
        },
        {
            username: "aviwes",
            elo: 3113,
        },
        {
            username: "ass",
            elo: 3073,
        }

    ]);

    useEffect(() => {
        // Ensure that Elo scores are parsed as numbers for correct sorting.
        const sortedLeaderboard = [...leaderboard].sort((a, b) => {
            return b.elo - a.elo;
        });
        setLeaderboard(sortedLeaderboard.slice(0, 10)); // Display only the top ten players.
    }, []);

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