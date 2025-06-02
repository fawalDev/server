import './.d.ts/requestHandler.d.ts'
import type { Request, Response, NextFunction } from 'express'
import type ErrorRes from './models/response/errorRes.ts';

import express from 'express';
import dotenv from 'dotenv';
dotenv.config();
import cors from 'cors';
import Mongoose from 'mongoose';

import authRoute from './routes/authen.ts';
import postRoute from './routes/post.ts';

const app = express();

const corsOptions = {
    origin: process.env.Client_URL || 'http://localhost:3000',
    credentials: true
}

app.use(cors(corsOptions))

// app.use((req: Request, res: Response, next: NextFunction) => {
//     res.setHeader("Access-Control-Allow-Origin", 'http://localhost:3000');
//     res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
//     res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
//     next();
// })

app.use('/public', express.static('public'))

app.use('/api/v1/auth', authRoute)
app.use('/api/v1/post', postRoute)

app.use((error: ErrorRes, req: Request, res: Response, nex: NextFunction) => {
    const status = error.status || 500

    const safeError = {
        message: error.message || 'Server Internal Error',
        cause: error.cause
    }
    console.log(error)


    res.status(status).json(safeError)
})

import bcrypt from 'bcryptjs'
import User from './models/mogooseModels/user.ts';

import IO from './utils/socket.io.ts'

Mongoose.connect(process.env.MONGODB_URI!)
    .then(_ => {
        const server = app.listen(5000)
        IO.init(server);
        IO.getIO().on('connection', socket => {
            console.log('Socket connected:', socket.id);
            
        })
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


