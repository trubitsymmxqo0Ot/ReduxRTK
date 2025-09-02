import { useState } from "react";
import { postAPI } from "../service/postService"
import { PostItem } from "./postItem";
import type { IPost } from "../models/IPosts";

export const PostContainer = () => {
    const [limit, setLimit] = useState(20);
    //с помощью refetch мы можем навязать новый запрос данных на сервер в обход кэша
    const {data: posts, error, isLoading, refetch} = postAPI.useFetchAllUsersQuery(limit, {
        pollingInterval: 500000, //Теперь каждые 5 секунд будет отправлен новый запрос, это так называемый longPolling, такое используется в чатах и прочем, аналог websocket
    });
    //Первый элемент для мутации - это функция, которая, собственно, эту мутацию и вызывает, а далее уже внутри {} обычные поля (error, isLoading)
    const [createPost, {error: createPostError, isLoading: createIsLoading}] = postAPI.useCreatePostMutation()
    const [deletePost, {}] = postAPI.useDeletePostMutation();
    const [updatePost, {}] = postAPI.useUpdatePostMutation();
    const plusObject = () => {
        setLimit(limit + 1);
    }
    const handleCreate = async () => {
        const title = prompt();
        await createPost({title, body: title} as IPost)
    }

    const handleRemove = (post: IPost) => {
        deletePost(post);
    }

    const handleUpdate = (post: IPost) => {
        updatePost(post)
    }

    return (
        <div>
            <button onClick={handleCreate}>
                Создать новый пост
            </button>
            <button onClick={plusObject}>
                Сделать список больше на 1
            </button>
            <button onClick={() => refetch()}>
                Вызвать данные ещё раз
            </button>
            <div>
                {isLoading && <p>Идет загрузка...</p>}
                {error && <p>Ошибка!</p>}
                {createPostError && <p>Ошибка создания поста</p>}
                {createIsLoading && <p>Новый пост создается...</p>}
                {posts?.map((item) => (
                    <div key={item.id}>
                        <PostItem remove={handleRemove} update={handleUpdate} post={item}/>
                    </div>
                ))}
            </div>
        </div>
    )
}