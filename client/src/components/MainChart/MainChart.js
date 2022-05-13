import React, {useState, useEffect} from 'react'
import moment from 'moment'

//css
import './MainChart.css'

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


 const TimeframeOption = ({text, selected, handleTimeframeClick}) => {
    return (
        <div className={`timeframe__option ${selected ? "selected" : ""}`} onClick={handleTimeframeClick}>
            {text}
        </div>
    )
 }


const MainChart = ({timeframes}) => {
    
    const [currentTimeframe, setCurrentTimeframe] = useState("5d")

    // need one use state for each timeframe

    const testPrices = Array.from({length: 20}, () => 100 + Math.random()*20)

    const startDate = new Date(2020, 0, 1);
    const labels = [];
    for (let i = 0; i < 20; i++) {
        const date = moment(startDate).add(i, 'days').format('MM-DD');
        labels.push(date.toString());
    } 

    const testData = {
        labels: labels,
        datasets: [{
            labels: "Account Balance Chart",
            backgroundColor: "rgb(0, 200, 5)",
            borderColor: "rgb(0, 200, 5)",
            borderWidth: 2,
            pointBorderWidth: 0,
            pointRadius: 0,
            pointHitRadius: 20,
            tension: .1,
            xAxisId: 'x',
            yAxisId: 'y',
            data: testPrices
        }]
    }

    const options = {
        responsive: true,
        interaction: {
            mode: 'index',
            intersect: false,
        },
        plugins: {
            legend: {
                display: false
            }
        },
        scales: {
            x: {
                display: false
            }, 
            y: {
                display: false
            }
        }
    }

    const generateDescription = () => {
        let lastPrice = testPrices[testPrices.length-1]
        let change = testPrices[testPrices.length-1] - testPrices[0]
        let sign = change.toString().charAt(0) === '-' ? "-" : "+"
        let percentChange = 100 * (change) / testPrices[0]

        return sign + "$" + Math.abs(change).toFixed(2).toString() + " (" + sign + Math.abs(percentChange).toFixed(2).toString() + "%)"
    }

    const handleTimeframeClick = (event) => {
        if(event.target.innerText === currentTimeframe){
            return
        }
        setCurrentTimeframe(event.target.innerText)
    }

    return (
        <div className='mainchart'>
            <p className='mainchart__balance'>{"$" + testPrices[testPrices.length-1].toFixed(2).toString()}</p>
            <p className='mainchart__description'>{generateDescription()}</p>
            <Line options={options} data={testData}/> 
            <div className='timeframe__options'>
                {timeframes.map((e, i) => <TimeframeOption key={i} text={e} selected={e === currentTimeframe} handleTimeframeClick={handleTimeframeClick}/>)}
            </div>
        </div>
    )
}

export default MainChart