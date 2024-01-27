import { PayloadAction, createSlice } from '@reduxjs/toolkit';
import { IAuth } from '@/interfaces';

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
    signOut: (state, action: PayloadAction<IAuth>) => {
      state.authData = undefined;
    }
  }
});

export const { signIn, signUp, signOut } = authSlice.actions;

const authReducer = authSlice.reducer;
export default authReducer;
