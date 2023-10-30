import type {NextApiRequest, NextApiResponse } from 'next'
import { connection} from "@/lib/database";
import { checkEmail } from '@/lib/utils';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

    // delete all tables 

    connection.query(
        `
        DROP TABLE IF EXISTS users;
        `
    )

    connection.query(
        `
        DROP TABLE IF EXISTS sessions;
        `
    )

    connection.query(
        `
        DROP TABLE IF EXISTS match_history;
        `

    )
        
    connection.query(
        `
        DROP TABLE IF EXISTS participants;
        `
    )

    connection.query(
        `
        DROP TABLE IF EXISTS rounds;
        `
    )

    connection.query(
        `
        DROP TABLE IF EXISTS answers;
        `
    )

    connection.query(
        `
        CREATE TABLE users 
        (
        user_id varchar(255) PRIMARY KEY NOT NULL ,
        username varchar(16), 
        email varchar(255),
        password varchar(32),
        salt varchar(8),
        bio varchar(255), 
        elo int DEFAULT 400,
        creation_date DATE DEFAULT CURRENT_TIMESTAMP
);
        `,
    );

    connection.query(
        `
        CREATE TABLE sessions 
(
session_id varchar(255) PRIMARY KEY, 
hash varchar(255),
created_at date DEFAULT CURRENT_TIMESTAMP,
expiers_at date,
user_id varchar(255),
FOREIGN KEY (user_id) REFERENCES users(user_id)
);
        `
    );

    connection.query(
        `

CREATE TABLE match_history (
    match_id string PRIMARY KEY,
    date date NOW(),
    ended bool DEFAULT false,
    conclusion string,
    );
    
    `
    )

    connection.query(
        `
        participant_id varchar(255) PRIMARY KEY,
match_id varchar(255),
user_id varchar(255),
winner boolean DEFAULT false,
FOREIGN KEY (user_id) REFERENCES users(user_id),
    FOREIGN KEY (match_id) REFERENCES match_history(match_id)
);

        `
        )

        connection.query(
            `
            CREATE TABLE rounds 
            (
            round_id varchar(255) PRIMARY KEY,
            match_id varchar(255),
            equation varchar(255),
            anwser varchar(255),
            level int,
            difficulty int,
            FOREIGN KEY (match_id) REFERENCES match_history(match_id)
            );
            
            `
            )

            connection.query(
                `
                CREATE TABLE answers 
                (
                answer_id string PRIMARY KEY,
                participant_id string,
                round_id string,
                answer,
                correct bool,
                foreign key participant_id REFERENCES participants(participant_id),
                FOREIGN KEY round_id REFERENCES rounds(round_id)
                );
                
                `
                )
    // return 
    res.status(200).json({ message: "Database created"});
}
