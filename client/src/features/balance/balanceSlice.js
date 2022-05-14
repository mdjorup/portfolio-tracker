import { createSlice } from "@reduxjs/toolkit";
import moment from 'moment';

const startDate = new Date(2020, 0, 1);
const labels = [];
for (let i = 0; i < 10; i++) {
    const date = moment(startDate).add(i, 'days').format('MM-DD');
    labels.push(date.toString());
} 

export const balanceSlice = createSlice({
    name: 'balance',
    initialState: {
        '5d': {
            lastUpdated: new Date(2022, 4, 14, 14, 30, 20),
            days: labels,
            balances: Array.from({length: 10}, () => 100 + Math.random()*10),
        }, // needs a lastUpdated property and the data 
        '1m': {
            lastUpdated: new Date(2022, 4, 14, 14, 30, 20),
            days: labels,
            balances: Array.from({length: 10}, () => 100 + Math.random()*10),
        },
        '3m': {
            lastUpdated: new Date(2022, 4, 14, 14, 30, 20),
            days: labels,
            balances: Array.from({length: 10}, () => 100 + Math.random()*10),
        },
        '6m': {
            lastUpdated: new Date(2022, 4, 14, 14, 30, 20),
            days: labels,
            balances: Array.from({length: 10}, () => 100 + Math.random()*10),
        },
        '1y': {
            lastUpdated: new Date(2022, 4, 14, 14, 30, 20),
            days: labels,
            balances: Array.from({length: 10}, () => 100 + Math.random()*10),
        },
        '2y': {
            lastUpdated: new Date(2022, 4, 14, 14, 30, 20),
            days: labels,
            balances: Array.from({length: 10}, () => 100 + Math.random()*10),
        },
        'ALL': {
            lastUpdated: new Date(2022, 4, 14, 14, 30, 20),
            days: labels,
            balances: Array.from({length: 10}, () => 100 + Math.random()*10),
        }
    }, 
    reducers: {
        setBalances: (state, action) => {
            state[action.payload.timeframe] = action.payload.data
        }
    }

})

export const {setBalances} = balanceSlice.actions;

export default balanceSlice.reducer