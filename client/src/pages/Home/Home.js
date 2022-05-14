import React from 'react'
import "./Home.css";
import moment from 'moment'

//components
import Header from '../../components/Header/Header';
import MainChart from '../../components/MainChart/MainChart';



const Home = () => {
    return(
        <div className='home'>
            <Header /> 
            <div className='home__body'>
                <div className='home__chart'>
                    <MainChart timeframes={["5d", "1m", "3m", "6m", "1y", "2y", "ALL"]}/>
                </div>
                
            </div>
            
        </div>
    )
}

export default Home