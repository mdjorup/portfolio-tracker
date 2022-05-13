import { createSlice } from "@reduxjs/toolkit";




export const balanceSlice = createSlice({
    name: 'balance',
    initialState: {
        '5d': {}, // needs a lastUpdated property and the data 
        '1m': {},
        '3m': {},
        '6m': {},
        '1y': {},
        '2y': {},
        'all': {}
    }, 
    reducers: {

    }

})