import type { FC } from "react";
import type { IPost } from "../models/IPosts";

interface PostItemProps {
    post: IPost
    remove: (post: IPost) => void,
    update: (post: IPost) => void,
}

export const PostItem: FC<PostItemProps> = ({ post, remove, update }) => {

    const handleRemove = (event: React.MouseEvent) => {
        event.stopPropagation();
        remove(post);
    }

    const handleUpdate = (event: React.MouseEvent) => {
        const title = prompt() || "";
        update({...post, title})
    }

    return (
        <div onClick={handleUpdate}>
            {post.id}. {post.title}
            <button onClick={handleRemove}>delete</button>
        </div>
    )
}