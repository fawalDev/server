import type { Request, Response, NextFunction } from 'express'
import type IAuthError from '../models/interfaces/response/error/authError.ts'
import type IAuthRes from '../models/interfaces/response/fulfill/authenRes.ts'

import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'

import ErrorRes from '../models/errorResponse.ts'
import Res from '../models/res.ts'

import User from '../models/mogooseModels/user.ts'
import { createErrorRes } from '../utils/exValidator/createErrorRes.ts'
import { jwtGen } from '../utils/jwtToken.ts'
import JwtPayload from '../models/jwtPayload.ts'


// req.body = { email, password }
async function login(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, password } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errorObj = createErrorRes(errors)
            throw new ErrorRes('Login failed', 422, errorObj)
        }

        const user = await User.findOne({ email }).lean()
        if (!user)
            throw new ErrorRes<IAuthError>('Login failed', 400, { credential: 'User or password is not correct' })

        const isValid = await bcrypt.compare(password, user?.password)
        if (isValid) {
            const { name, email, isAdmin } = user
            const payload = new JwtPayload(email, name, isAdmin).toObject()
            const token = 'Bearer ' + jwtGen(payload)

            res.status(200).json(new Res<IAuthRes>('login success', 200, {
                jwtToken: token,
                userInfor: { email, name, isAdmin }
            }))
        }
        else {
            throw new ErrorRes<IAuthError>('Login failed', 400, { credential: 'User or password is not correct' })
        }
    } catch (error) {
        next(error)
    }
}

// req.body = { email, name, password }
async function signup(req: Request, res: Response, next: NextFunction) {
    try {
        const { email, name, password } = req.body

        const errors = validationResult(req)
        if (!errors.isEmpty()) {
            const errorObj = createErrorRes(errors)
            throw new ErrorRes('Creating user failed', 422, errorObj)
        }

        const hashed = bcrypt.hashSync(password, +process.env.SALT_LENGTH!)

        const created = await User.create({
            email: email, name: name, password: hashed
        })

        const { isAdmin } = created
        const payload = new JwtPayload(email, name, isAdmin).toObject()
        const token = 'Bearer ' + jwtGen(payload)

        res.status(201).json(new Res<IAuthRes>('Signup successfully', 200, {
            jwtToken: token,
            userInfor: { email, name, isAdmin }
        }))

    } catch (error) {
        next(error)
    }
}



export default { login, signup }