import type IAuthRes from "../fulfill/authenRes.ts"

/**
 * authen error response
 */
export default interface IAuthError extends IAuthRes {
    email?: string                  // email relevant error 
    password?: string               // password relevant error 
    confirmPassword?: string        // confirmPassword relevant error 
    credential?: string             // credential relevant error, exp: "user or pass incorect"
}