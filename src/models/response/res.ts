import type IRes from "../../interfaces/response/res.ts";

export default class Res<T extends object> implements IRes {
    constructor(
        public message: string,
        public status?: number,
        public infor?: T,
    ) { }
}