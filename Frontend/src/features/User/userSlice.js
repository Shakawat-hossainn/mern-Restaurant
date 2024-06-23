import { createSlice } from "@reduxjs/toolkit";


const initialState = {
  currentUser: null,
  loading: false,
  error: null,
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
       signinStart:(state)=>{
        state.loading = true,
        state.error = null

       },
       signinSuccess:(state,action)=>{
        //console.log(action)
        state.loading = false,
        state.error = null,
        state.currentUser = action.payload
       },
       signinFailure:(state,action)=>{
        state.loading = false,
        state.error = action.payload,
        state.currentUser = null
       },
       signoutSuccess: (state) => {
        (state.loading = false), (state.error = null), (state.currentUser = null);
      }

    }
})

export const {signinStart,signinSuccess,signinFailure,signoutSuccess} = userSlice.actions;

export default userSlice.reducer;