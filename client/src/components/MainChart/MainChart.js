import React, {useState, useEffect} from 'react'
import moment from 'moment'

import {
    CategoryScale,
    Chart as ChartJS,
    LineElement,
    PointElement,
    Tooltip,
    LinearScale

} from 'chart.js'
import {Line} from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LineElement,
    Tooltip,
    PointElement,
    LinearScale 
 );

 const chartOptions = {
    plugins: {
        legend: {
            display: false
        }
    }
 }


const MainChart = () => {
    
    const [timeframe, setTimeframe] = useState({});
    const [labels, setLabels] = useState([]); // this is dependent on time frame

    // need one use state for each timeframe






    return (
        <div className='mainchart'>
            <Line /> 

        </div>
    )
}

export default MainChart