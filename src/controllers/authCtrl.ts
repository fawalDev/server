import type { Request, Response, NextFunction } from 'express'
import type IAuthError from '../interfaces/response/error/authError.js'
import type IAuthRes from '../interfaces/response/fulfill/authenRes.js'

import { validationResult } from 'express-validator'
import bcrypt from 'bcryptjs'

import ErrorRes from '../models/response/errorRes.js'
import Res from '../models/response/res.js'

import User from '../models/mogooseModels/user.js'
import { createErrorRes } from '../utils/exValidator/createErrorRes.js'
import { jwtGen } from '../utils/jwtToken.js'
import JwtPayload from '../models/jwtPayload.js'
import AuthRes from '../models/response/authRes.js'


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
            throw new ErrorRes<IAuthError>('Login failed', 422, { credential: 'User or password is not correct' })

        const isValid = await bcrypt.compare(password, user?.password)
        if (isValid) {
            const { _id, name, email, isAdmin } = user
            const payload = new JwtPayload(_id, email, name, isAdmin).toObject()

            const token = 'Bearer ' + jwtGen(payload)

            res.status(200).json(new AuthRes(token, { email, name, isAdmin }))
        }
        else {
            throw new ErrorRes<IAuthError>('Login failed', 422, { credential: 'User or password is not correct' })
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

        const { _id, isAdmin } = created
        const payload = new JwtPayload(_id, email, name, isAdmin).toObject()
        const token = 'Bearer ' + jwtGen(payload)

        res.status(201).json(new AuthRes(token, { email, name, isAdmin }))

    } catch (error) {
        next(error)
    }
}



export default { login, signup }