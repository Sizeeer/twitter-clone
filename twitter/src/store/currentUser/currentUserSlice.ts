import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { UserApi } from "../../api/userApi";
import { Status } from "../../shared/types/communicationTypes";
import { UserAttributes } from "../../shared/types/userTypes";

interface InitialInterface {
  data: UserAttributes | undefined;
  status: Status;
  error: string | null;
}

const initialState: InitialInterface = {
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
      { payload }: PayloadAction<UserAttributes | undefined>
    ) => {
      if (payload) {
        state.data = {
          ...payload,
          avatar: payload.avatar === null ? "" : payload.avatar,
          backgroundImage:
            payload.backgroundImage === null ? "" : payload.backgroundImage,
        };
      } else {
        state.data = undefined;
      }

      state.status = Status.SUCCESS;
    },
  },
  extraReducers: {
    [getCurrentUser.pending.type]: (state) => {
      state.status = Status.LOADING;
    },
    [getCurrentUser.rejected.type]: (
      state,
      { payload }: PayloadAction<string>
    ) => {
      state.error = payload;
      state.status = Status.ERROR;
    },
    [getCurrentUser.fulfilled.type]: (
      state,
      { payload }: PayloadAction<UserAttributes>
    ) => {
      state.data = payload;
      state.status = Status.SUCCESS;
    },
    [subscribeThunk.pending.type]: (state) => {
      state.status = Status.LOADING;
    },
    [subscribeThunk.fulfilled.type]: (state) => {
      state.status = Status.SUCCESS;
    },
    [me.fulfilled.type]: (
      state,
      { payload }: PayloadAction<UserAttributes>
    ) => {
      state.data = { ...payload };
      state.status = Status.SUCCESS;
    },
    [me.pending.type]: (state) => {
      state.status = Status.LOADING;
    },
    [me.rejected.type]: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.status = Status.ERROR;
    },
  },
});

export const { setCurrentUser } = currentUserSlice.actions;
export const currentUserReducer = currentUserSlice.reducer;
