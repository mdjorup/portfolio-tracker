import React from 'react'
import './Header.css';

//icons
import {AiOutlineStock} from 'react-icons/ai';
import {FiSearch} from 'react-icons/fi';
//#00C805


const HeaderOption = ({text, notification}) => {


  return (
    <div className='headeroption'>
      <p>{text}</p>
      {notification && <div className='headeroption__icon'>
        <span className="material-symbols-outlined">
          exclamation
        </span>
      </div>}


    </div>
  )
}

function Header() {


  const headerOptionSettings = [
    {"text": "Portfolio", "notification": false},
    {"text": "Messages", "notification": true},
    {"text": "Account", "notification": false},
  ]

  return (
      <div className='header'>
        <div className="header__icon">
          <AiOutlineStock className='app__icon' size='2.25em'/>
        </div>
        <div className="header__searchbar">
          <div className="search">
            <FiSearch className='search__icon' size='1.4em'/>
            <input className='search__input' type='text' placeholder='Search'/> 
          </div>
        </div>
        <div className='header__options'>
          {headerOptionSettings.map(e => <HeaderOption text={e.text} notification={e.notification}/>)}
        </div>

      </div>
    
  )
}

export default Header