import JWT from 'jsonwebtoken';



// Secret key for JWT
const secret_key = 'secret-key'


export function jwtGen(payload: string | object) {
    return JWT.sign(payload,
        secret_key,
        {
            algorithm: 'HS256',
            expiresIn: '1h'
        })
}

export function jwtVerify(token: string) {
    return new Promise((resolve, reject) => {
        JWT.verify(
            token,
            secret_key,
            {
                algorithms: ['HS256']
            },
            (err, decoded) => {
                if (err)
                    reject(err)

                resolve(decoded)
            }
        )
    })
}

export default { jwtGen, jwtVerify }