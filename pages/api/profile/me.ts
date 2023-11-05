// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connection } from '@/lib/database';
import { createHash } from 'crypto';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { auth_token } = req.headers;
    if (!auth_token) return res.status(401).json({ error: 'no_auth_token' });
    const authHash = createHash('sha256').update(auth_token as string).digest('hex');

    connection.query(
        'SELECT * FROM sessions WHERE hash = ?',
        [authHash],
        //@ts-expect-error
        function (error, results, fields) {
            if (error) return res.status(500).json({ error });
            if (results.length > 0) {

                // get the user's elo
                const session = results[0];
                const user_id = session["user_id"];

                connection.query(
                    'SELECT user_id, username, bio, elo, games_won, games_lost, games_drawn, creation_date FROM users WHERE user_id = ?',
                    [user_id],
                    //@ts-expect-error
                    function (error, results, fields) {
                        if (error) return res.status(500).json({ error });
                        if (results.length > 0) {
                            // Authentication successful
                            const user = results[0];

                            return res.status(200).json({
                                user
                            });
                        } else {
                            // Authentication failed
                            return res.status(401).json({ error: 'user_not_found' });
                        }
                    }
                )

            } else {
                // Authentication failed
                return res.status(401).json({ error: 'session_not_found' });
            }
        }
    );


}
