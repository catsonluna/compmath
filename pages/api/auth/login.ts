import type { NextApiRequest, NextApiResponse } from 'next';
import { connection } from '@/lib/database';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  connection.query(
    'SELECT * FROM comp WHERE email = ? AND password = ?',
    [email, password],
    function (error, results, fields) {
      if (error) return res.status(500).json({ error });
      //@ts-expect-error
      if (results.length > 0) {
        // Authentication successful
        return res.status(200).json({ message: 'Login successful' });
      } else {
        // Authentication failed
        return res.status(401).json({ error: 'Invalid credentials' });
      }
    }
  );
}