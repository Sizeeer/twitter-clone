import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { UserApi } from "../../api/userApi";
import { Status } from "../../shared/types/communicationTypes";
import { UserAttributes, UserAttributesUI } from "../../shared/types/userTypes";
// import { subscribe } from "../users/usersSlice";

interface CurrentUser {
  data: Omit<UserAttributes, "password" | "confirmHash"> | undefined;
  status: Status;
  error: string | null;
}

const initialState: CurrentUser = {
  data: undefined,
  status: Status.SUCCESS,
  error: null,
};

export const getCurrentUser = createAsyncThunk(
  "user/getCurrentUser",
  async (userId: string, thunkApi) => {
    try {
      const data = await UserApi.getUserData(userId);
      return data;
    } catch (error) {
      //@ts-ignore
      throw thunkApi.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const subscribeThunk = createAsyncThunk(
  "user/subscribe",
  async (userId: string, thunkApi) => {
    try {
      // await UserApi.subscribe(userId);
      // return thunkApi.dispatch(subscribe(userId));
    } catch (error) {
      //@ts-ignore
      throw thunkApi.rejectWithValue(error.response?.data?.message);
    }
  }
);

export const me = createAsyncThunk("users/me", async (_, thunkApi) => {
  try {
    const myData = await UserApi.me();
    return myData;
  } catch (error) {
    //@ts-ignore
    throw thunkApi.rejectWithValue(error.response?.data?.message);
  }
});

export const currentUserSlice = createSlice({
  name: "currentUser",
  initialState,
  reducers: {
    setCurrentUser: (
      state,
      { payload }: PayloadAction<UserAttributesUI | undefined>
    ) => {
      if (payload) {
        state.data = { ...payload };
      } else {
        state.data = undefined;
      }

      state.status = Status.SUCCESS;
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;
export const currentUserReducer = currentUserSlice.reducer;
