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
        }
    }
})

//export the action reducers
export const {setUser} = userSlice.actions;

export default userSlice.reducer