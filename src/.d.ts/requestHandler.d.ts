import 'express'

import type { IUser, IUserMethod, UserModel } from '../models/interfaces/mongoose/user.ts'
import type { Document, Query, QueryWithHelpers } from 'mongoose'
import type { HydratedDocument } from 'mongoose'


declare module 'express' {
    interface Request {
        user?: HydratedDocument<UserModel, IUserMethod>
    }
}