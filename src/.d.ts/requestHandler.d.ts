import 'express'

import type JwtPayload from '../models/jwtPayload.ts';


declare module 'express' {
    interface Request {
        user?: JwtPayload
    }
}