import { createSlice } from "@reduxjs/toolkit";


export const userSlice = createSlice({
    "name": "user",
    initialState: {
        "jwt": null,
        "username": ""
    },
    reducers: {
        
    }
})

//export the action reducers

export default userSlice.reducer