import type {NextApiRequest, NextApiResponse } from 'next'
import { connection} from "@/lib/database";
import { checkEmail } from '@/lib/utils';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {

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
        `
    );
    // return 
    res.status(200).json({ message: "Database created"});
}
