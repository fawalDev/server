import type { Request, Response, NextFunction } from 'express'
import type IAuthRes from '../models/interfaces/response/authenRes.ts';

import ErrorRes from '../models/errorResponse.ts';
import { jwtVerify } from '../utils/jwtToken.ts';



export default async function isAuth(req: Request, res: Response, next: NextFunction) {
    try {
        const jwt = req.headers.authorization;
        if (!jwt)
            throw new ErrorRes<IAuthRes>('Unauthorized', 401, { credential: 'Token is not valid' })

        // Verify the token
        const token = jwt.split(" ")[1];
        const decoded = await jwtVerify(token)

        
        next()

    } catch (err) {
        next(err)
    }
}