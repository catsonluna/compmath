import type { NextApiRequest, NextApiResponse } from 'next';
import { connection } from '@/lib/database';
import { createHash } from 'crypto';
import { generateSecret } from '@/lib/utils';
import { inQueue, addToQueue, removeFromQueue, findAGame, inAGame  } from './queue';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { auth_token } = req.headers;

  const authHash = createHash('sha256').update(auth_token as string).digest('hex');

    connection.query(
        'SELECT * FROM sessions WHERE hash = ?',
        [authHash],
        function (error, results, fields) {
            if (error) return res.status(500).json({ error });
            //@ts-expect-error
            if (results.length > 0) {

                // get the user's elo
                const session = results[0];
                const user_id = session["user_id"];

                connection.query(
                    'SELECT elo FROM users WHERE user_id = ?',
                    [user_id],
                    function (error, results, fields) {
                        if (error) return res.status(500).json({ error });
                        //@ts-expect-error
                        if (results.length > 0) {
                            // Authentication successful
                            const user = results[0];

                            if(!inQueue(user_id)){
                                if(!inAGame(user_id)){
                                    return res.status(200).json({
                                        elo: user["elo"],
                                        inQueue: false,
                                        inGame: false,
                                        game_found: false
                                    });
                                }
                            }

                            if(inQueue(user_id)){
                                return res.status(200).json({
                                    elo: user["elo"],
                                    inQueue: true,
                                    inGame: false,
                                    game_found: false
                                });
                            }

                            let inGame = inAGame(user_id);

                            if(inGame[0]){
                                return res.status(200).json({
                                    elo: user["elo"],
                                    inQueue: false,
                                    inGame: true,
                                    game_id: inGame[1],
                                    game_found: true
                                });
                            }

                            let game = findAGame(user_id);

                            if(game !== null){
                                return res.status(200).json({
                                    elo: user["elo"],
                                    inQueue: false,
                                    inGame: true,
                                    game_id: game,
                                    game_found: true
                                });
                            }

                            return res.status(200).json({
                                elo: user["elo"],
                                game_found: false,
                            });
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