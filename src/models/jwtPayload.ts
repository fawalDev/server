export default class JwtPayload {
    constructor(
        public email: string,
        public name: string,
        public isAdmin: boolean
    ) {}

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