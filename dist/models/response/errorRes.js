export default class ErrorRes extends Error {
    status;
    cause;
    constructor(message, status, cause) {
        super(message);
        this.status = status;
        this.cause = cause;
    }
}
