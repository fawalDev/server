
export default class ErrorRes<T extends object = {}> extends Error {
    constructor(
        message: string,
        public status?: number,
        public cause?: T
    ) {
        super(message)
    }
}
