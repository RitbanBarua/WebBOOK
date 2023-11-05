import React, { useEffect, useState } from 'react'
import logo from '../assests/logo.png'

const toggleDropdown = () => {
    const dropdownContainer = document.getElementById('user-dropdown-container');
    dropdownContainer.classList.toggle('show-dropdown');
}

export default function Navbar() {
    const [loggedIn, setLoggedIn] = useState(false);

    useEffect(() => {
        if (localStorage.getItem("token")) {
            setLoggedIn(true)
        } else {
            setLoggedIn(false)
        }
    }, [])

    /*useEffect(() => {  // Make it work later HTML Collection
        if (loggedIn) {
            document.getElementsByClassName('default-disabled').forEach(element => {
                element.style.display = 'block';
            });
        } else {
            document.getElementsByClassName('default-disabled').forEach(element => {
                element.style.display = 'none';
            });
        }
    }, [loggedIn])*/
console.log(Array.from(document.getElementsByClassName('default-disabled')))

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
                        <div className="img-container"><i className="fa-regular fa-user fa-xl" style={{ color: '#000000' }} /></div>
                    </div>
                    <i className="fa-solid fa-caret-down" style={{ color: '#000000' }} />
                    <ul className="dropdown-container" id='user-dropdown-container'>
                        <li className='default-disabled'><a href="/"><span className='nav-list-item'>Profile</span></a></li>
                        <li className='default-disabled'><a href="/"><span className='nav-list-item'>Stared Notes</span></a></li>
                        <li className='default-disabled'><a href="/"><span className='nav-list-item'>Settings</span></a></li>
                        <li className='default-disabled'><a href="/"><span className='nav-list-item'>Logout</span></a></li>
                        <li><a href="/"><span className='nav-list-item'>SignUp</span></a></li>
                        <li><a href="/"><span className='nav-list-item'>Login</span></a></li>
                    </ul>
                </div>
            </div>
        </nav>
    )
}
