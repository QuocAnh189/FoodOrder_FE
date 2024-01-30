import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuth, IUser } from 'src/interfaces';

export const AuthSliceKey = 'auth';

type InitialType = {
  authData: IAuth | undefined;
};

const initialState = {
  authData: undefined
} as InitialType;

const authSlice = createSlice({
  name: AuthSliceKey,
  initialState,
  reducers: {
    signIn: (state, action: PayloadAction<IAuth>) => {
      state.authData = action.payload;
    },

    signUp: (state, action: PayloadAction<IAuth>) => {
      state.authData = action.payload;
    },

    updateAuth: (state, action: PayloadAction<IUser>) => {
      if (state.authData != undefined) {
        state.authData.user = action.payload!;
      }
    },
    signOut: state => {
      state.authData = undefined;
    }
  }
});

export const { signIn, signUp, signOut, updateAuth } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
