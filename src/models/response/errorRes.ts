import type IRes from "../../interfaces/response/res.ts";

export default class ErrorRes<T extends object ={}> extends Error implements IRes {
    constructor(
        message: string,
        public status?: number,
        public cause?: T
    ) {
        super(message)
    }
}
