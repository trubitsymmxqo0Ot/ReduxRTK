import type { IUser } from "../../models/IUser";
import type { AppDispatch } from "../store";
import { userSlice } from "./UseSlice";
import axios from "axios";
export const fetchUsers = () => async (dispatch: AppDispatch) => {
  try {
    dispatch(userSlice.actions.fetchingUser());
    const response = await axios.get<IUser[]>("https://jsonplaceholder.typicode.com/users");
    dispatch(userSlice.actions.fetchingUserSucces(response.data));
  } catch (e) {
    dispatch(userSlice.actions.fetchingUserError(e.message));
  }
};
