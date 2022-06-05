import React from 'react'
import "./Home.css";
import moment from 'moment'
import { useDispatch, useSelector } from 'react-redux';


//components
import Header from '../../components/Header/Header';
import MainChart from '../../components/MainChart/MainChart';
import StockSnippet from '../../components/StockSnippet/StockSnippet';



const Home = () => {

    const user = useSelector((state) => state.user)

    return(
        <div className='home'>
            <Header /> 
            <div className='home__body'>
                <div className='home__chart'>
                    <MainChart timeframes={["5d", "1m", "3m", "6m", "1y", "2y", "ALL"]}/>
                </div>
                <div className="home__positions">
                    <StockSnippet ticker="AAPL" price={35000.763892} dayPercent={4.15023} dayDollar={10200.44443}/>
                    <StockSnippet ticker="F" price={14.007} dayPercent={12.345} dayDollar={45.7863}/>
                    <StockSnippet ticker="AMZN" price={14.007} dayPercent={12.345} dayDollar={45.7863}/>
                    <StockSnippet ticker="NVDA" price={150.007} dayPercent={-6.5} dayDollar={-24.98}/>
                </div>
            </div>
            
        </div>
    )
}

export default Home