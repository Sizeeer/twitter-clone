import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";

import { AuthApi } from "../../api/authApi";
import { LoginFormData } from "../../pages/SignIn/components/LoginModal";
import { Status } from "../../shared/types/communicationTypes";
import { UserAttributes } from "../../shared/types/userTypes";
import { setCurrentUser } from "../currentUser/currentUserSlice";
import { setNotification } from "../notification/notificationSlice";
import { RegisterDataInterface } from "./../../shared/types/userTypes";

interface Auth {
  status: Status;
  error: string | null;
}

const initialState: Auth = {
  status: Status.SUCCESS,
  error: null,
};

export const register = createAsyncThunk(
  "auth/register",
  async (body: RegisterDataInterface, thunkApi) => {
    try {
      await AuthApi.register(body);
      return thunkApi.dispatch(
        setNotification({
          message: "Вы успешно зарегестрировались! Войдите в свой аккаунт",
          type: "success",
        })
      );
    } catch (error) {
      return thunkApi.dispatch(
        setNotification({
          message: "Произошла ошибка, повторите попытку!",
          type: "error",
        })
      );
    }
  }
);

export const login = createAsyncThunk(
  "auth/login",
  async (body: LoginFormData, thunkApi) => {
    try {
      const myData = await AuthApi.login(body);
      if (myData) {
        window.localStorage.setItem("token", myData.token);
      }
      thunkApi.dispatch(setCurrentUser(myData as unknown as UserAttributes));
      return thunkApi.dispatch(
        setNotification({
          message: "Вы успешно вошли!",
          type: "success",
        })
      );
    } catch (error) {
      //@ts-ignore
      return thunkApi.dispatch(
        setNotification({
          message: "Произошла ошибка, повторите попытку!",
          type: "error",
        })
      );
    }
  }
);

export const logout = createAsyncThunk("auth/logout", async (_, thunkApi) => {
  try {
    window.localStorage.setItem("token", "");
    return thunkApi.dispatch(setCurrentUser(undefined));
  } catch (error) {
    //@ts-ignore
    throw thunkApi.rejectWithValue(error.response?.data?.message);
  }
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: {
    [login.pending.type]: (state) => {
      state.status = Status.LOADING;
    },
    [login.rejected.type]: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.status = Status.ERROR;
    },
    [login.fulfilled.type]: (state) => {
      state.status = Status.SUCCESS;
    },
    [logout.pending.type]: (state) => {
      state.status = Status.LOADING;
    },
    [logout.rejected.type]: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.status = Status.ERROR;
    },
    [logout.fulfilled.type]: (state) => {
      state.status = Status.SUCCESS;
    },
    [register.pending.type]: (state) => {
      state.status = Status.LOADING;
    },
    [register.rejected.type]: (state, { payload }: PayloadAction<string>) => {
      state.error = payload;
      state.status = Status.ERROR;
    },
    [register.fulfilled.type]: (state) => {
      state.status = Status.SUCCESS;
    },
  },
});

export const {} = authSlice.actions;
export const authReducer = authSlice.reducer;
