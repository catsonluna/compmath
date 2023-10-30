import type { NextApiRequest, NextApiResponse } from 'next';
import { connection } from '@/lib/database';
import { checkEmail, generateSecret } from '@/lib/utils';
import { createHash } from 'crypto';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    if (req.method === 'POST') {
        const { username, email, password } = req.body;

        if (!checkEmail(email)) {
            return res.status(400).json({ error: "invalid_email" });
        }
        // check if username is taken
        if (username.length < 3 || username.length > 16) {
            return res.status(400).json({ error: "invalid_username" });
        }
        connection.query(
            "SELECT * FROM users WHERE username = ?",
            [username],
            function (error, results, fields) {
                if (error) return res.status(500).json({ error });
                //@ts-expect-error
                if (results.length > 0) {
                    return res.status(400).json({ error: "username_taken" });
                }
                const userid = generateSecret(32);
                const salt = generateSecret(8);
                const hashedPass = createHash('sha256').update(salt + password).digest('hex');
                connection.query(
                    "INSERT INTO users (user_id, username, email, password) VALUES (?, ?, ?, ?)",
                    [userid, username, email, hashedPass],
                    function (error, results, fields) {
                        if (error) return res.status(500).json({ error });                        
                        // create a session
                        const sessionID = generateSecret(32);
                        const sessionSecret = generateSecret(128);
                        const secretHash = createHash('sha256').update(sessionSecret).digest('hex');
                        connection.query(
                            "INSERT INTO sessions (session_id, user_id, secret_hash) VALUES (?, ?, ?)",
                            [sessionID, username, secretHash],
                            function (error, results, fields) {
                                if (error) return res.status(500).json({ error });
                                res.status(200).json({ sessionID, sessionSecret });
                            }
                        );
                        
                    }
                );
            }
        );
    } else {
        // Handle other HTTP methods if needed.
        res.status(405).end();
    }
}