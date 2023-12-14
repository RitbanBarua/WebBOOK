import React from 'react'
import { Link } from 'react-router-dom';
import logo from '../assests/logo.png';

export default function Footer() {
    return (
        <>
            <footer>
                <div className="container">
                    <div className="top">
                        <div className="left">
                            <img className='logo' src={logo} alt="WebBOOK" draggable='false' />
                            <p>Made With ❤️ by <a href="https://ritbanbarua.netlify.app/" target='_blank' rel="noreferrer">Ritban Barua</a></p>
                        </div>
                        <div className="right">
                            <div>
                                <h3>Pages</h3>
                                <ul>
                                    <li><Link to={'/'} >Home</Link></li>
                                    <li><Link to={'/register'} >Sign Up</Link></li>
                                    <li><Link to={'/login'} >Login</Link></li>
                                    <li><Link to={'/dashboard'} >Dashboard</Link></li>
                                </ul>
                            </div>
                            <div>
                                <h3>Others</h3>
                                <ul>
                                    <li><Link to={'/'} >About Us</Link></li>
                                    <li><a href='https://github.com/RitbanBarua/WebBOOK' target='_blank' rel='noreferrer' >Source Code</a></li>
                                    <li><Link to={'/'} >Privacy Policy</Link></li>
                                    <li><Link to={'/'} >Terms of Service</Link></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="bottom">
                        <p>© 2023 - WebBOOK. All rights reserved.</p>
                        <div className="socials-container">
                            <a href="https://github.com/RitbanBarua" target='_blank' rel="noreferrer">
                                <i className="fa-brands fa-square-github fa-2xl" style={{ color: '#000' }}></i>
                            </a>
                            <a href="https://www.linkedin.com/in/ritbanbarua/" target='_blank' rel="noreferrer">
                                <i className="fa-brands fa-linkedin fa-2xl" style={{ color: '#000' }}></i>
                            </a>
                        </div>
                    </div>
                </div>
            </footer>
        </>
    )
}
