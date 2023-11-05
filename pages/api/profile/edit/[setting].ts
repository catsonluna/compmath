// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import { register } from 'module'
import type { NextApiRequest, NextApiResponse } from 'next'
import { connection } from '@/lib/database'
import { createHash } from 'crypto';


export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
    const { setting } = req.query;
    const { auth_token } = req.headers;

    if (!auth_token) return res.status(401).json({ error: 'no_auth_token' });
    if (!setting) return res.status(400).json({ error: 'no_setting' });

    const authHash = createHash('sha256').update(auth_token as string).digest('hex');

    // check if its a PUT request
    if(req.method == "PUT"){
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

                    if(setting == "USERNAME"){
                        // check if username is 16 characters or less
                        if(req.body.username.length > 16){
                            return res.status(400).json({ error: 'username_too_long' });
                        }
                        // check if username is 3 characters or more
                        if(req.body.username.length < 3){
                            return res.status(400).json({ error: 'username_too_short' });
                        }
                        // check if username is Aa2_-
                        if(!req.body.username.match(/^[A-Za-z0-9_-]+$/)){
                            return res.status(400).json({ error: 'username_invalid_characters' });
                        }
                        console.log(user_id)
                        connection.query(
                            `
                            UPDATE users SET username = ? WHERE user_id = ?;
                            `,
                            [req.body.username, user_id],
                            //@ts-expect-error
                            function (error, results, fields) {
                                if (error) return res.status(500).json({ error });
                                return res.status(200).json({ success: true });
                            }
                        )
                    }else if(setting == "PASSWORD"){
                        // get the user first
                        connection.query(
                            `
                            SELECT salt FROM users WHERE user_id = ?;
                            `
                            , [user_id],
                            //@ts-expect-error
                            function (error, results, fields) {
                                if (error) return res.status(500).json({ error });
                                if (results.length > 0) {
                                    // Authentication successful
                                    const user = results[0];
                                    const salt = user["salt"];
                                    const password = req.body.password;
                                    const hashedPassword = createHash('sha256').update(password + salt).digest('hex');
                                    // update the password
                                    connection.query(
                                        `
                                        UPDATE users SET password = ? WHERE user_id = ?;
                                        `
                                        , [hashedPassword, user_id],
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
                                    return res.status(401).json({ error: 'user_not_found' });
                                }
                            }
                        )

                    }else if(setting == "BIO"){
                        connection.query(
                            `
                            UPDATE users SET bio = ? WHERE user_id = ?;
                            `,
                            [req.body.bio, user_id],
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

                    }else if(setting == "EMAIL"){
                        connection.query(
                            `
                            UPDATE users SET email = ? WHERE user_id = ?;
                            `,
                            [req.body.email, user_id],
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
                    }else if(setting == "PROFILE_PICTURE"){
                        connection.query(
                            `
                            UPDATE users SET profile_picture = ? WHERE user_id = ?;
                            `,
                            [req.body.profile_picture, user_id],
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
                    }else{
                        return res.status(400).json({ error: 'invalid_setting' });
                    }
                } else {
                    // Authentication failed
                    return res.status(401).json({ error: 'session_not_found' });
                }
            }
        );
    }else{
        return res.status(400).json({ error: 'invalid_method' });
    }
}