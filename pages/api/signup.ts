import type {NextApiRequest, NextApiResponse } from 'next'
import { connection} from "@/lib/database";

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
   username, email, password     
    }
    =req.body

    connection.query(
        "INSERT INTO compmathusers (email, password) VALUES (?, ?)", 
        [email, password],
        function (error, results, fields) {
            if (error) return res.status(500).json({ error });
            return res.status(200).json(results);
        }
    );
}
