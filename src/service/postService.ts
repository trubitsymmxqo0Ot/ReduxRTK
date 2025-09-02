import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IPost } from "../models/IPosts";

export const postAPI = createApi({
  reducerPath: "postAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3000",
  }),
  /*
    Запись ниже нужна для следующей вещи. Если бы мы не указали её, то RTK Query просто не знал бы, куда ему нужно смотреть и, допустим, при добавлении поста 
    на страницу он появится только после обновления страницы. А через tag мы как бы явно связываем между собой функции.

    Если прочитать структуру ниже, то мы сначала говорим, что вот этот эндпоинт получает данные (fetchAllUsers), но далее, т.к. мы создали новый пост,
    список постов у нас обновился и те данные, которые были получены на момент срабатывания fetchAllUsers уже не актуальны, именно поэтому в createPost
    мы указываем, что данные не актуальны и их нужно обновить.

    Также, в моем примере есть 2 postContainer, которые делают запрос на одни и те же данные, ранее говорилось о том, что у rtk query есть кэшируемость и он
    в том или ином случае будет делать 1 запрос, вместо 2, но что будет при обновлении данных? При обновлении данных будет тоже самое, несмотря на то, что 
    мы могли сделать обновление в 1 компоненте, а второй компонент оставался у нас, например, с 10 постами, при обновлении данных будет 1 запрос вместо двух.
  */
  tagTypes: ['Post'],
  endpoints: (builder) => ({
    fetchAllUsers: builder.query<IPost[], number>({ //number - это тип аргумента, который ожидает хук, внутри postContainer мы юзаем хук, а IPost - это тип выводимого тела, которое мы ограничиваем через хук
      query: (limit: number = 5) => ({
        url: "/posts",
        params: {
            _limit: limit, //Указываем параметр, который будет в url строке, типо такого ?_limit=5 и jsonplaceholder вернет нам только 5 объектов
        }
      }),
      providesTags: ['Post'], //Мы явно указываем, что этот эндпоинт (fetchAllusers) обеспечивает доставку данных
    }),
    createPost: builder.mutation<IPost, IPost>({ //Получаем на вход iPost и на выход отдаем iPost
      query: (post) => ({
        url: '/posts',
        method: "POST", //Создаем новые данные
        body: post
      }),
      invalidatesTags: ['Post'], //А тут мы явно указываем, что эти данные становятся не актуальными
    }),
    updatePost: builder.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: "PUT", //Обновляем новые данные
        body: post
      }),
      invalidatesTags: ['Post']
    }),
    deletePost: builder.mutation<IPost, IPost>({
      query: (post) => ({
        url: `/posts/${post.id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Post'],
    })
  }),
});
