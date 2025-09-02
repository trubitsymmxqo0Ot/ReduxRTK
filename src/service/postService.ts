import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type { IPost } from "../models/IPosts";

export const postAPI = createApi({
  reducerPath: "postAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://jsonplaceholder.typicode.com",
  }),
  endpoints: (builder) => ({
    fetchAllUsers: builder.query<IPost[], number>({ //number - это тип аргумента, который ожидает хук, внутри postContainer мы юзаем хук, а IPost - это тип выводимого тела, которое мы ограничиваем через хук
      query: (limit: number = 5) => ({
        url: "/posts",
        params: {
            _limit: limit, //Указываем параметр, который будет в url строке, типо такого ?_limit=5 и jsonplaceholder вернет нам только 5 объектов
        }
      }),
    }),
  }),
});
