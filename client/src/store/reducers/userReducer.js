import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  isAuth: false,
  userData: {}
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setIsAuth: (state, action) => {
      state.isAuth = action.payload
    },
    setUserData: (state, action) => {
      state.userData = action.payload
    }
  }
})

export const {setIsAuth, setUserData} = userSlice.actions;

export default userSlice.reducer;
