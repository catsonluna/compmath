import React, { useState, useEffect } from 'react';
import style from '@/styles/leaderboard.module.css';
import axios from 'axios';

function Display() {
    // Initialize the 'leaderboard' state variable with some initial player data.
    const [leaderboard, setLeaderboard] = useState([
        {
            username: "raivo",
            elo: 123,
        }
    ]);

    // Use the 'useEffect' hook to fetch data from an API when the component mounts.
    useEffect(() => {
        axios.get("/api/leaderboard").then((res) => {
            console.log(res.data); // Log the API response data.
            // Update the 'leaderboard' state with the fetched data.
            setLeaderboard(res.data.results);
        });
    }, []); // The empty array [] means this effect runs only once when the component mounts.

    // Function to add a suffix to numbers (1st, 2nd, 3rd, 4th, ...).
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

            {/* Map through the 'leaderboard' array and display player information. */}
            {leaderboard.map((player, index) => {
                let className;

                // Determine the CSS class for styling based on the player's rank.
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