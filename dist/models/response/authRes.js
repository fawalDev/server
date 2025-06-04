export default class AuthRes {
    jwtToken; // JWT token
    userInfor;
    constructor(jwtToken, userInfor) {
        this.jwtToken = jwtToken;
        this.userInfor = userInfor;
    }
}
