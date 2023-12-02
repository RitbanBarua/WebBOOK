import React from 'react'
import cookieSvg from '../assests/cookie.svg'
import { Link } from 'react-router-dom'

export default function Cookie() {
    return (
        <>
            <div className="cookie-container">
                <div>
                    <img className='cookie-img' src={cookieSvg} loading='lazy' alt="cookie image" />
                    <p className='cookie-text'>We use cookies for essential website functions and to better understand how you use our site, so we can create the best possible experience for you ❤️</p>
                </div>
                <div className='cookie-btn-container'>
                    <Link to={'/'}>Privacy Policy</Link>
                    <button onClick={() => document.querySelector('.cookie-container').style.display = "none"}>Got it</button>
                </div>
            </div>
        </>
    )
}
