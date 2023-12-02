import React from 'react'
import logo from '../assests/logo.png'
import defaultUserImg from '../assests/default-profile.webp'
import { Link } from 'react-router-dom';

const toggleDropdown = () => {
    const dropdownContainer = document.getElementById('user-dropdown-container');
    dropdownContainer.classList.toggle('active');
}

export default function Navbar() {
    return (
        <nav>
            <img className='logo' src={logo} alt="logo" draggable="false" />
            <div className="search-container">
                <form className="search-form">
                    <input type="search" placeholder='Search' />
                    <button type='submit' title='search'><i className="fa-solid fa-magnifying-glass" style={{ color: '#000000' }} /></button>
                </form>
            </div>
            <div id="nav-right-container">
                <i className="fa-regular fa-pen-to-square fa-xl" style={{ color: '#000000' }} />
                <div className="dropdown-enabled-container" id='nav-dropdown-btn' onClick={toggleDropdown}>
                    <div className="user-container">
                        <div className="img-container">
                            <img className='user-img' src={defaultUserImg} alt="user-img" />
                        </div>
                    </div>
                    <i className="fa-solid fa-caret-down" style={{ color: '#000000' }} />
                    <div className="dropdown-container" id='user-dropdown-container'>
                        <h3 className='profile-name'>Ritban Barua Harsh</h3>
                        <p className='profile-email'>ritban@gmail.com</p>
                        <ul className="dropdown-menu" id='user-dropdown-menu'>
                            <li>
                                <Link href="/">
                                    <i class="far fa-user-circle"></i>
                                    <span className='nav-list-item'>Profile</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/">
                                    <i class="far fa-star"></i>
                                    <span className='nav-list-item'>Stared Notes</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/">
                                    <i class="fas fa-user-cog"></i>
                                    <span className='nav-list-item'>Settings</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/">
                                    <i class="far fa-question-circle"></i>
                                    <span className='nav-list-item'>Help</span>
                                </Link>
                            </li>
                            <li>
                                <Link href="/">
                                    <i class="fas fa-arrow-right-from-bracket"></i>
                                    <span className='nav-list-item'>Logout</span>
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </nav>
    )
}
