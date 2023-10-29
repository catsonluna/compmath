import type {NextApiRequest, NextApiResponse } from 'next'
import { connection} from "@/lib/database";
import { checkEmail } from '@/lib/utils';

export default async function handler(
    req: NextApiRequest,
    res: NextApiResponse
) {
    const {
   username, email, password     
    }
    =req.body

    if (!checkEmail(email)) {
        return res.status(400).json({ error: "invalid_email" });
    }

    connection.query(
        "INSERT INTO compmathusers (username, email, password) VALUES (?, ?, ?)", 
        [username, email, password],
        function (error, results, fields) {
            if (error) return res.status(500).json({ error });
            return res.status(200).json(results);
        }
    );
}
