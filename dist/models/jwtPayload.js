export default class JwtPayload {
    id;
    email;
    name;
    isAdmin;
    constructor(id, email, name, isAdmin) {
        this.id = id.toString();
        this.email = email;
        this.name = name;
        this.isAdmin = isAdmin;
    }
    static fromObject(obj) {
        return new JwtPayload(obj.id || obj._id.toString(), obj.email, obj.name, obj.isAdmin);
    }
    toObject() {
        return {
            id: this.id,
            email: this.email,
            name: this.name,
            isAdmin: this.isAdmin
        };
    }
}
