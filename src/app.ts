import type { Request, Response, NextFunction } from 'express'
import type ErrorRes from './models/errorResponse.ts';


import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import Mongoose from 'mongoose';

import authRoute from './routes/authen.ts';




const app = express();

const corsOptions = {
    origin: process.env.Client_URL || 'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOptions))

app.use('/api/v1', authRoute)


app.use((error: ErrorRes, req: Request, res: Response, nex: NextFunction) => {
    const status = error.status ?? 500
    const message = status === 500 ? 'Server Internal Error!' : error.message ?? 'Unknown error'
    const name = status === 500 ? 'Server Internal Error!' : error.name ?? 'Error'

    const safeError = {
        status, message, name, cause: error.cause
    }

    res.status(status).json(safeError)
})

import bcrypt from 'bcryptjs'
import User from './models/mogooseModels/user.ts';

Mongoose.connect(process.env.MONGODB_URI!)
    .then(_ => {
        app.listen(5000)
        return User.findOne({ email: 'admin@gmail.com' })
    })
    // check existed and create admin user
    .then(user => {
        if (!user) {
            const hashed = bcrypt.hashSync('123', +process.env.SALT_LENGTH!)
            user = new User({ email: 'admin@gmail.com', password: hashed, isAdmin: true })
            return user.save()
        }
    })
    .catch(err => console.error(err))


