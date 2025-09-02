import { createAsyncThunk } from "@reduxjs/toolkit";
import type { IUser } from "../../models/IUser";
// import type { AppDispatch } from "../store";
// import { userSlice } from "./UseSlice";
import axios from "axios";
// export const fetchUsers = () => async (dispatch: AppDispatch) => {
//   try {
//     dispatch(userSlice.actions.fetchingUser());
//     const response = await axios.get<IUser[]>("https://jsonplaceholder.typicode.com/users");
//     dispatch(userSlice.actions.fetchingUserSucces(response.data));
//   } catch (e) {
//     dispatch(userSlice.actions.fetchingUserError(e.message));
//   }
// };

export const fetchUsers = createAsyncThunk(
    'users/fetching',
    async (_, thunkAPI) => {
        try {
            const response = await axios.get<IUser[]>("https://jsonplaceholder.typicode.com/users");
            return response.data;
        } catch(e) {
            if(axios.isAxiosError(e)){
                return thunkAPI.rejectWithValue(e.message);
            }
            if(e instanceof Error){
                return thunkAPI.rejectWithValue(e.message);
            }

            return thunkAPI.rejectWithValue('Неизвестная ошибка');
        }
    }
)