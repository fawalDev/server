import type IAuthRes from "../../interfaces/response/fulfill/authenRes.ts";

export default class AuthRes implements IAuthRes {
    jwtToken?: string;              // JWT token
    userInfor?: {
        email: string;
        name: string;
        isAdmin: boolean;
    };

    constructor(jwtToken?: string, userInfor?: { email: string; name: string; isAdmin: boolean }) {
        this.jwtToken = jwtToken;
        this.userInfor = userInfor;
    }
}