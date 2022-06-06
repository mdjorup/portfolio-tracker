import React, { useState } from 'react'
import './Header.css';

//icons
import {AiOutlineStock} from 'react-icons/ai';
import {FiSearch} from 'react-icons/fi';
import { useSelector } from 'react-redux';
//#00C805


const HeaderOption = ({text, notification, dropdownItems}) => {

  const [dropdownActive, setDropdownActive] = useState(false)

  const handleUsernameClick = () => {
    setDropdownActive(!dropdownActive)
  }


  return (
    <div className='headeroption'>
      <p className='headeroption__text' onClick={handleUsernameClick}>{text}</p>
      {notification && <div className='headeroption__icon'>
        <span className="material-symbols-outlined">
          exclamation
        </span>
      </div>}
      {dropdownActive && <div className='dropdown__menu'> 
        {dropdownItems && dropdownItems.map((e, i) => (
          <div className='dropdown__item'> 
            {e}
          </div>
        ))}
      </div>}

    </div>
  )
}

function Header() {

  const user = useSelector((state) => state.user)


  const headerOptionSettings = [
    {"text": "Portfolio", "notification": false},
    {"text": "Messages", "notification": true},
    {"text": user.username, "notification": false, "dropdown": ["Profile", "Log Out"]},
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
          {headerOptionSettings.map((e, i) => <HeaderOption key={i} text={e.text} notification={e.notification} dropdownItems={e.dropdown}/>)}
        </div>

      </div>
    
  )
}

export default Header