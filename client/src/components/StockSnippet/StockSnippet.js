import React from 'react'
import "./StockSnippet.css"

const StockSnippet = ({ticker, price, dayPercent, dayDollar}) => {

    const color = dayPercent >= 0 ? "#00C805" : "#C80500"

    const convertPrice = () => {
        return "$" + price.toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    const convertDayPercent = () => {
        let sign = dayPercent >= 0 ? "+" : "-"
        return sign + Math.abs(dayPercent).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',') + "%"

    }

    const convertDayDollar = () => {
        let sign = dayDollar >= 0 ? "+" : "-"
        return sign + "$" + Math.abs(dayDollar).toFixed(2).toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
    }

    return (
        <div className='stocksnippet' style={{"--color-theme": color}}>
            
            <div className="child">
                {ticker}
            </div>
            <div className="child middle">
                {convertPrice()}
            </div>
            <div className="child middle color">
                {convertDayPercent()}
            </div>
            <div className="child color">
                {convertDayDollar()}
            </div>

        </div>
    )
}

export default StockSnippet