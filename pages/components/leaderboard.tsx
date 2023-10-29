import React, { useState, useEffect } from 'react';
import style from '@/styles/leaderboard.module.css'

function Display() {
    // State variable to hold the leaderboard data.
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

    // useEffect hook to sort the leaderboard when the component is first loaded.
    useEffect(() => {
        // Create a sorted copy of the leaderboard array based on ELO scores in descending order.
        const sortedLeaderboard = [...leaderboard].sort((a, b) => b.elo - a.elo);
        // Update the state variable to reflect the sorted leaderboard.
        setLeaderboard(sortedLeaderboard);
    }, []);

    // Function to determine the ordinal suffix for a number (e.g., 1st, 2nd, 3rd).
    const ordinalSuffix = (i: number) => {
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
            // Determine the CSS class to be applied to the row based on the player's rank.
            if (index === 0) {
                className = style.first;
            } else if (index === 1) {
                className = style.second;
            } else if (index === 2) {
                className = style.third;
            } else {
                className = style.rest;
            }
            
            // Render a row for each player in the leaderboard with their username and ELO score.
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

export default Display;