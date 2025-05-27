import type IRes from "./interfaces/response/response.ts";

export default class SuccessRes<T extends object> implements IRes {
    constructor(
        public message: string,
        public status?: number,
        public infor?: T,
    ) { }
}