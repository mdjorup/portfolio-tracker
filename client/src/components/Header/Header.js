import React from 'react'
import './Header.css';

//icons
import {AiOutlineStock} from 'react-icons/ai';
import {FiSearch} from 'react-icons/fi';
//#00C805

function Header() {
  return (
      <div className='header'>
        <div className="header__icon">
          <AiOutlineStock className='app__icon' size={35}/>
        </div>
        <div className="header__searchbar">
          <div className="search">
            <FiSearch className='search__icon' size={22}/>
            <input className='search__input' type='text' placeholder='Search'/> 
          </div>
        </div>
        <div className='header__options'>

        </div>

      </div>
    
  )
}

export default Header