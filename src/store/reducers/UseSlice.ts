/*
    Слайсы - это некоторая обертка над reducer, которая расширяет возможный функционал. Как я сказал, слайсы в redux toolkit - это чистая функция.
    То есть та функция, которая возращает всегда одно и то же значение.

    По сути, редьюсеры из redux стали слайсами в redux toolkit 
*/
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "../../models/IUser";

interface UserSlice {
  user: IUser[];
  isLoading: boolean;
  error: string;
  count: number;
}

const initialState: UserSlice = {
  user: [],
  isLoading: false,
  error: "",
  count: 0,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    /*
            Тут как я все и рассказывал в state мы получаем данные, которые хранятся внутри state (наш initialState), а в action мы передаем какие-то данные,
            которые сформировались на стороне пользователя. Условно, мы нажали на кнопку и у нас произошел инкремент на 1, в action будет именно это значение
        */
    increment(state, action: PayloadAction<number>) {
      state.count += action.payload;
    },
    fetchingUser(state) {
      state.isLoading = true;
    },
    fetchingUserSucces(state, action: PayloadAction<IUser[]>) {
      state.isLoading = false;
      state.error = '';
      state.user = action.payload
    },
    fetchingUserError(state, action: PayloadAction<string>) {
        state.isLoading = false;
        state.error = action.payload;
    }
  },
});

export default userSlice.reducer;
