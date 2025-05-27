export default interface IAuthRes {
    credential?: string             // credential relevant infor
    jwtToken?: string              // JWT token
    userInfor?: {
        email: string;
        name: string;
        isAdmin: boolean;
    }
}