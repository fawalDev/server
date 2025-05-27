export default class JwtPayload {
    public email: string
    public name: string
    public isAdmin: boolean




    constructor(
        email: string,
        name: string,
        isAdmin: boolean
    ) {
        this.email = email;
        this.name = name;
        this.isAdmin = isAdmin;
    }

    static fromObject(obj: any): JwtPayload {
        return new JwtPayload(
            obj.email,
            obj.name,
            obj.isAdmin
        );
    }

    toObject(): object {
        return {
            email: this.email,
            name: this.name,
            isAdmin: this.isAdmin
        };
    }
}