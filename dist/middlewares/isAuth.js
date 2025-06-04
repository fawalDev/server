import ErrorRes from '../models/response/errorRes.js';
import { jwtVerify } from '../utils/jwtToken.js';
export default async function isAuth(req, res, next) {
    try {
        const jwt = req.headers.authorization;
        if (!jwt)
            throw new ErrorRes('Unauthorized', 401, { credential: 'Token is not valid' });
        // Verify the token
        const token = jwt.split(" ")[1];
        try {
            //if verify failed, it will throw an error
            const decoded = (await jwtVerify(token));
            req.user = decoded;
        }
        catch (error) {
            throw new ErrorRes('Unauthorized', 401, { credential: 'Token is not valid' });
        }
        next();
    }
    catch (err) {
        next(err);
    }
}
