import type { Types } from "mongoose"



export default class JwtPayload {
    public id: string
    public email: string
    public name: string
    public isAdmin: boolean




    constructor(
        id: string | Types.ObjectId,
        email: string,
        name: string,
        isAdmin: boolean
    ) {
        this.id = id.toString()
        this.email = email;
        this.name = name;
        this.isAdmin = isAdmin;
    }

    static fromObject(obj: any): JwtPayload {
        return new JwtPayload(
            obj.id || obj._id.toString(),
            obj.email,
            obj.name,
            obj.isAdmin
        );
    }

    toObject(): object {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            isAdmin: this.isAdmin
        };
    }
}