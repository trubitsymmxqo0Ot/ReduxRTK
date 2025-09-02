import { useState } from "react";
import { postAPI } from "../service/postService"
import { PostItem } from "./postItem";

export const PostContainer2 = () => {
    const [limit, setLimit] = useState(20);
    const {data: posts, error, isLoading} = postAPI.useFetchAllUsersQuery(limit);
    const plusObject = () => {
        setLimit(limit + 1);
    }
    console.log(limit);
    return (
        <div>
            <button onClick={plusObject}>
                Сделать список больше на 1
            </button>
            <div>
                {isLoading && <p>Идет загрузка...</p>}
                {error && <p>Ошибка!</p>}
                {posts?.map((item) => (
                    <div key={item.id}>
                        <PostItem post={item}/>
                    </div>
                ))}
            </div>
        </div>
    )
}