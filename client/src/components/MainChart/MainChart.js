import React, {useState, useEffect} from 'react'

//css
import './MainChart.css'

//redux 
import {useDispatch, useSelector} from 'react-redux';

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


 const TimeframeOption = ({text, selected, handleTimeframeClick}) => {
    return (
        <div className={`timeframe__option ${selected ? "selected" : ""}`} onClick={handleTimeframeClick}>
            {text}
        </div>
    )
 }

const MainChart = ({timeframes}) => {

    const dispatch = useDispatch();
    
    const [currentTimeframe, setCurrentTimeframe] = useState("5d")
    const [color, setColor] = useState("#00C805");

    const balanceData = useSelector((state) => state.balance[currentTimeframe])

    
    useEffect(() => {
        
        // fetch data for the current time frame and dispatch
        // color setting based on that data
        balanceData.balances.at(-1) >= balanceData.balances.at(0) ? setColor("#00C805") : setColor("#C80500")
        
    }, [currentTimeframe])

    const chartData = {
        labels: balanceData.days,
        datasets: [{
            labels: "Account Balance Chart",
            backgroundColor: color,
            borderColor: color,
            borderWidth: 2,
            pointBorderWidth: 0,
            pointRadius: 0,
            pointHitRadius: 20,
            tension: 0,
            xAxisId: 'x',
            yAxisId: 'y',
            data: balanceData.balances
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
        let balances = balanceData.balances
        let change = balances[balances.length-1] - balances[0]
        let sign = change.toString().charAt(0) === '-' ? "-" : "+"
        let percentChange = 100 * (change) / balances[0]
        return sign + "$" + Math.abs(change).toFixed(2).toString() + " (" + sign + Math.abs(percentChange).toFixed(2).toString() + "%)"
    }

    const handleTimeframeClick = (event) => {
        if(event.target.innerText === currentTimeframe){
            return
        }
        setCurrentTimeframe(event.target.innerText)
    }

    return (
        <div className='mainchart' style={{"--color-theme": color}}>
            <p className='mainchart__balance'>{"$" + balanceData.balances[balanceData.balances.length-1].toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}</p>
            <p className='mainchart__description'>{generateDescription()}</p>
            <Line options={options} data={chartData}/> 
            <div className='timeframe__options'>
                {timeframes.map((e, i) => <TimeframeOption key={i} text={e} selected={e === currentTimeframe} handleTimeframeClick={handleTimeframeClick}/>)}
            </div>
        </div>
    )
}

export default MainChart