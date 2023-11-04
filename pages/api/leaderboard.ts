// Next.js API maršruta atbalsts: https://nextjs.org/docs/api-routes/introduction
import { register } from 'module'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connection } from '@/lib/database';

type Data = {
  name: string
}

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
    // Veic datu bāzes vaicājumu, lai iegūtu 10 labākos spēlētājus pēc ELO vērtējuma.
    connection.query(
        `
        SELECT username, elo FROM users ORDER BY elo desc LIMIT 10;
        `,
        function (error, results, fields) {
            if (error) return res.status(500).json({ error });
            res.status(200).json({ results });
        }
    );
}





