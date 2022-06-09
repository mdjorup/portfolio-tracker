import React from 'react'
import "./Trades.css"


const Trade = ({date, type, stock, quantity, price}) => {
    return (
        <div className='trade'>
            <div className='trade__inner'>{date}</div>
            <div className={'trade__inner'}>
                <p className={type}>{type}</p>
            </div>
            <div className='trade__inner'>{stock}</div>
            <div className='trade__inner'>{quantity}</div>
            <div className='trade__inner'>{price}</div>
        </div>
    )
  }
  



const Trades = () => {


    let date = new Date("2022-06-07")

    return (
        <div className='trades'>
            <p style={{"font-size": '1.5em', 'padding-left': '0.5em'}}>Trades</p>
            <Trade date={date.toDateString().slice(4)} type="Buy" stock="AAPL" quantity={5.4} price={137.5}/> 
            <Trade date={date.toDateString().slice(4)} type="Sell" stock="F" quantity={5.4} price={137.5}/>
        </div>
  )
}

export default Trades