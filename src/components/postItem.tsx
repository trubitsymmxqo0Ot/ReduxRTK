import type { FC } from "react";
import type { IPost } from "../models/IPosts";

interface PostItemProps {
    post: IPost
}

export const PostItem: FC<PostItemProps> = ({ post }) => {
    return (
        <div>
            {post.id}. {post.title}
            <button>delete</button>
        </div>
    )
}