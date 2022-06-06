import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    "name": "user",
    initialState: {
        "jwt": "",
        "username": ""
    },
    reducers: {
        setUser: (state, action) => {
            state.jwt = action.payload.jwt
            state.username = action.payload.username
        }, 
        clearUser: (state, action) => {
            state.jwt = ""
            state.username = ""
        }
    }
})

//export the action reducers
export const {setUser, clearUser} = userSlice.actions;

export default userSlice.reducer