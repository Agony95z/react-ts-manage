import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import type {PayloadAction} from '@reduxjs/toolkit'
import http from '../../utils/http'
type Token = string
type Infos = {
  [propName: string]: unknown
}
type UsersState = {
  token: Token
  infos: Infos
}
type Login = {
  email: string
  pass: string
}
const userSlice = createSlice({
  name: 'users',
  initialState: {
    token: '',
    infos: {}
  } as UsersState,

  // 同步方法
  reducers: {
    updateToken(state, action:PayloadAction<Token>) {
      state.token = action.payload;
    },
    clearToken(state) {
      state.token = '';
    },
    updateInfos(state, action:PayloadAction<Infos>) {
      state.infos = action.payload;
    },
  }
})
// login
export const loginAction = createAsyncThunk('users/loginAction', async (payload: Login) => {
  const ret = http.post("/users/login", payload);
  return ret;
})
// infos
export const infosAction = createAsyncThunk('users/infosAction', async () => {
  const ret = http.get("/users/infos");
  return ret;
})
export const {
  updateToken,
  clearToken,
  updateInfos
} = userSlice.actions
export default userSlice.reducer