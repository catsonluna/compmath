import type { NextApiRequest, NextApiResponse } from 'next';
import { connection } from '@/lib/database';
import { createHash } from 'crypto';
import { generateSecret } from '@/lib/utils';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { email, password } = req.body;

  connection.query(
    'SELECT * FROM users WHERE email = ? or username = ?',
    [email, email],
    function (error, results, fields) {
      if (error) return res.status(500).json({ error });
      //@ts-expect-error
      if (results.length > 0) {
        // Authentication successful
        const user = results[0];

        // Hash the password
        const hashedPass = createHash('sha256').update(user["salt"] + password).digest('hex');
        console.log(hashedPass);
        console.log(user["password"]);
        console.log(password)

        if (hashedPass !== user["password"]) {
          return res.status(401).json({ error: 'wrong_password' });
        }


        const sessionID = generateSecret(32);
        const sessionSecret = generateSecret(128);

        const secretHash = createHash('sha256').update(sessionSecret).digest('hex');


        

        connection.query(
          "INSERT INTO sessions (session_id, user_id, hash) VALUES (?, ?, ?)",
          [sessionID, user["user_id"], secretHash],
          function (error, results, fields) {
              if (error) return res.status(500).json({ error });
              res.status(200).json({ 
                  session_id: sessionID,
                  session_secret: sessionSecret
              });
          }
      );
      } else {
        // Authentication failed
        return res.status(401).json({ error: 'user_not_found' });
      }
    }
  );
}