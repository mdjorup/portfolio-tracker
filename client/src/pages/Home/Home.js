import React from 'react'
import "./Home.css";
import moment from 'moment'

//components
import Header from '../../components/Header/Header';

// charts
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


const Home = () => {

    const options = {
        plugins: {
            legend: {
                display: false
            }
        }, 
        
        
    }

    const startDate = new Date(2020, 0, 1);
    const labels = [];
    for (let i = 0; i < 6; i++) {
        const date = moment(startDate).add(i, 'days').format('MM-DD');
        labels.push(date.toString());
    }
    

    const data = {
        labels: labels,
        datasets: [{
            xAxisID: 'xAxis',
            label: "Dataset 1",
            backgroundColor: "rgb(0, 200, 5)",
            borderColor: "rgb(0, 200, 5",
            data: [100, 105, 103, 106, 107, 110]
            
        }]
    }

    return(
        <div className='home'>
            <Header /> 
            <div className='home__chart'>
                <Line options={options} data={data}/>
            </div>
            {labels.map(e => e)}
            
        </div>
    )
}

export default Home