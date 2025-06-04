import type { Request, Response, NextFunction } from 'express'
import type IAuthRes from '../interfaces/response/fulfill/authenRes.js';

import ErrorRes from '../models/response/errorRes.js';
import { jwtVerify } from '../utils/jwtToken.js';
import type JwtPayload from '../models/jwtPayload.js';



export default async function isAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const jwt = req.headers.authorization;
        if (!jwt)
            throw new ErrorRes<IAuthRes>('Unauthorized', 401, { credential: 'Token is not valid' })

        // Verify the token
        const token = jwt.split(" ")[1];

        try {
            //if verify failed, it will throw an error
            const decoded= (await jwtVerify(token)) as JwtPayload;
            req.user = decoded; 
        } catch (error) {
            throw new ErrorRes<IAuthRes>('Unauthorized', 401, { credential: 'Token is not valid' })
        }
        


        next()

    } catch (err) {
        next(err)
    }
}