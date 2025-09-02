import { useState } from "react";
import { postAPI } from "../service/postService"
import { PostItem } from "./postItem";

export const PostContainer = () => {
    const [limit, setLimit] = useState(20);
    //с помощью refetch мы можем навязать новый запрос данных на сервер в обход кэша
    const {data: posts, error, isLoading, refetch} = postAPI.useFetchAllUsersQuery(limit, {
        pollingInterval: 500000, //Теперь каждые 5 секунд будет отправлен новый запрос, это так называемый longPolling, такое используется в чатах и прочем, аналог websocket
    });
    const plusObject = () => {
        setLimit(limit + 1);
    }
    console.log(limit);
    return (
        <div>
            <button onClick={plusObject}>
                Сделать список больше на 1
            </button>
            <button onClick={() => refetch()}>
                Вызвать данные ещё раз
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