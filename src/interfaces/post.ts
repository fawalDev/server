import type { Schema } from "mongoose";

export default interface IPost {
    title: string;
    content: string;
    imgUrl: string;
    creator: Schema.Types.ObjectId
}