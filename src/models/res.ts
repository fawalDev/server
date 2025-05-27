
export default class Res<T extends object>  {
    constructor(
        public message: string,
        public status?: number,
        public infor?: T,
    ) { }
}