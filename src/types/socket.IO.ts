import type IPost from "../interfaces/post.ts"

export type PostEmitVal = {
    action: 'create' | 'update' | 'delete',
    post: IPost
}