import type { NextApiRequest, NextApiResponse } from 'next';
import { connection } from '@/lib/database';
import { createHash } from 'crypto';
import { generateSecret } from '@/lib/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { auth_token } = req.headers;

  const sessionHash = createHash('sha256').update(session_token as string).digest('hex');

    connection.query(
        'SELECT * FROM sessions WHERE hash = ?',
        [sessionHash],
        function (error, results, fields) {
            if (error) return res.status(500).json({ error });
            //@ts-expect-error
            if (results.length > 0) {
                // Authentication successful
                const session = results[0];
                res.status(200).json({ 
                    session_id: session["session_id"],
                    user_id: session["user_id"]
                });
            } else {
                // Authentication failed
                return res.status(401).json({ error: 'session_not_found' });
            }
        }
    );
}