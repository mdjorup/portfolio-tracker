import React, { useState } from 'react'
import './Header.css';

//icons
import {AiOutlineStock} from 'react-icons/ai';
import {FiSearch} from 'react-icons/fi';
import { useDispatch, useSelector } from 'react-redux';
import { clearUser } from '../../features/user/userSlice';
import { useNavigate } from 'react-router-dom';
//#00C805


const HeaderOption = ({text, notification, dropdownItems}) => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const username = useSelector(state => state.user.username)

  const [dropdownActive, setDropdownActive] = useState(false)

  const handleUsernameClick = (event) => {
    let text = event.target.innerText
    
    if(text === "Messages" || text === "Portfolio"){
      return
    }
    setDropdownActive(!dropdownActive)
  }

  const handleDropdownOptionClick = (event) => {
    let text = event.target.innerText
    console.log(event)
    if(text === "Log Out"){
      dispatch(clearUser())
    } else if (text === "Profile"){
      navigate("/profile/" + username)
    }
  }


  return (
    <div className='headeroption' style={{backgroundColor: dropdownActive ? "#383838" : "transparent"}}>
      <p className='headeroption__text' onClick={handleUsernameClick}>{text}</p>
      {notification && <div className='headeroption__icon'>
        <span className="material-symbols-outlined">
          exclamation
        </span>
      </div>}
      {dropdownActive && <div className='dropdown__menu'> 
        {dropdownItems && dropdownItems.map((e, i) => (
          <li key={i} className='dropdown__item' onClick={handleDropdownOptionClick}> 
            {e}
          </li>
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