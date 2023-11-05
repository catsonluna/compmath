// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next'
import { connection } from '@/lib/database';

export default function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const { id } = req.query;
    console.log(id);

    connection.query(
        `
        SELECT user_id, username, bio, elo, games_won, games_lost, games_drawn, creation_date FROM users WHERE username = ?;
        `
        , [id],
        //@ts-expect-error
        function (error, results, fields) {
            if (error) return res.status(500).json({ error });
            if (results.length > 0) {
                return res.status(200).json({user: results[0]});
            }
            else {
                return res.status(404).json({ error: "user_not_found" });
            }
        }
    )

}
