import Lottie from 'lottie-react'
import React from 'react'
import { Link } from 'react-router-dom';
import mockImg from '../assests/landing-assests/mockup.png';
import mockEditImg from '../assests/landing-assests/mockup-edit.png';
import circleAnimation from '../assests/landing-assests/circle.gif';
import cloudSaveAnimation from '../assests/lottie_animations/cloud-save.json';
import privacyAnimation from '../assests/lottie_animations/privacy.json';
import encryptAnimation from '../assests/lottie_animations/encryption.json';
import freeAnimation from '../assests/lottie_animations/free.json';
import WebBOOKanimation from '../assests/lottie_animations/WebBOOK.json';
import testimonialAuthor1 from '../assests/landing-assests/testimonial-auth1.png';
import testimonialAuthor2 from '../assests/landing-assests/testimonial-auth2.jpg';
import testimonialAuthor3 from '../assests/landing-assests/testimonial-auth3.jpg';
import avatar1 from '../assests/landing-assests/Avatar1.png';
import avatar2 from '../assests/landing-assests/Avatar2.png';
import avatar3 from '../assests/landing-assests/Avatar3.png';
import Footer from './Footer';

export default function LandingPage() {
    // const swiper = new Swiper(".mySwiper", {
    //     spaceBetween: 30,
    //     centeredSlides: true,
    //     autoplay: {
    //         delay: 2500,
    //         disableOnInteraction: false,
    //     },
    //     pagination: {
    //         el: ".swiper-pagination",
    //         clickable: true,
    //     },
    //     navigation: {
    //         nextEl: ".swiper-button-next",
    //         prevEl: ".swiper-button-prev",
    //     },
    // });

    return (
        <>
            <section id='hero'>
                <div className="container">
                    <div className="left">
                        <h1 className='hero-heading'>Enjoy note taking with your friends</h1>
                        <p className='hero-para'>Put down your thoughts down in one app, share
                            with your friends and loved ones.</p>
                        <div className="btn-container">
                            <Link to="/register">
                                <button>Get Started Now!</button>
                            </Link>
                            <Link to="/login">
                                <button>Login</button>
                            </Link>
                        </div>
                    </div>
                    <div className="right">
                        <img id='circle-animation' src={circleAnimation} alt="" />
                        <img id='hero-img' src={mockEditImg} alt="hero-img" />
                    </div>
                </div>
            </section>

            <section id='features'>
                <div className="container">
                    <h1 className="section-title">Features</h1>
                    <div className="container" id="features-container">
                        <div className="single-feature-container">
                            <Lottie className='feature-logo' animationData={cloudSaveAnimation} loop={true} />
                            <h3 className='feature-title'>Cloud Save</h3>
                            <p className='feature-description'>Access From Anywhere On Any Device</p>
                        </div>
                        <div className="single-feature-container">
                            <Lottie className='feature-logo' animationData={privacyAnimation} loop={true} />
                            <h3 className='feature-title'>Privacy</h3>
                            <p className='feature-description'>Privacy</p>
                        </div>
                        <div className="single-feature-container">
                            <Lottie className='feature-logo' animationData={encryptAnimation} loop={true} />
                            <h3 className='feature-title'>End-to-End Encryption</h3>
                            <p className='feature-description'>End-to-End Encryption</p>
                        </div>
                        <div className="single-feature-container">
                            <Lottie className='feature-logo' animationData={freeAnimation} loop={true} />
                            <h3 className='feature-title'>Free</h3>
                            <p className='feature-description'>Free & Open-Source</p>
                        </div>
                    </div>
                </div>
            </section>

            <section id='testimonial'>
                <div className="container">
                    <swiper-container class="swiper-container" pagination="true" pagination-clickable="true" navigation="false" space-between="30" centered-slides="true" autoplay-delay="3500" autoplay-disable-on-interaction="false" style={{
                        "--swiper-pagination-color": "#FFBA08",
                        "--swiper-pagination-bullet-inactive-color": "#A1A1A1"
                    }}>
                        <swiper-slide class='swiper-slide'>
                            <div className="single-testimonial-container">
                                <Lottie className='logo-animation' animationData={WebBOOKanimation} loop={true} />
                                <q className='testimonial-content'>
                                    I have been using this app for a few months now and I have to
                                    say it is one of the best apps I have ever used. I highly recommend this app to anyone looking for a secure and easy to use note taking app.
                                </q>
                                <div className="testimonial-author-container">
                                    <img className="testimonial-author-image" src={testimonialAuthor1} alt="Derrick Tsorme" />
                                    <p className='testimonial-author'>Derrick Tsorme</p>
                                    <p className='testimonial-author-title'>Software Engineer</p>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide class='swiper-slide'>
                            <div className="single-testimonial-container">
                                <Lottie className='logo-animation' animationData={WebBOOKanimation} loop={true} />
                                <q className='testimonial-content'>
                                    WebBOOK is a lifesaver for a software engineer like me. It's free, secure, and accessible from anywhere. The end-to-end encryption ensures my notes are for my eyes only. Love it!
                                </q>
                                <div className="testimonial-author-container">
                                    <img className="testimonial-author-image" src={testimonialAuthor2} alt=" Jessica Turner" />
                                    <p className='testimonial-author'>Jessica Turner</p>
                                    <p className='testimonial-author-title'>Software Engineer</p>
                                </div>
                            </div>
                        </swiper-slide>
                        <swiper-slide class='swiper-slide'>
                            <div className="single-testimonial-container">
                                <Lottie className='logo-animation' animationData={WebBOOKanimation} loop={true} />
                                <q className='testimonial-content'>
                                    WebBOOK is my writing sidekick. Free, secure, and available on any device. Perfect for capturing those creative moments. Highly recommended!
                                </q>
                                <div className="testimonial-author-container">
                                    <img className="testimonial-author-image" src={testimonialAuthor3} alt=" Jessica Turner" />
                                    <p className='testimonial-author'>Grace Thompson</p>
                                    <p className='testimonial-author-title'>Freelance Writer</p>
                                </div>
                            </div>
                        </swiper-slide>
                    </swiper-container>
                </div>
            </section>

            <section id="contact">
                <div className="container">
                    <div id="contact-img-container">
                        <img id='avatar1' src={avatar1} alt="avatar" />
                        <img id='avatar2' src={avatar2} alt="avatar" />
                        <img id='avatar3' src={avatar3} alt="avatar" />
                    </div>
                    <h3 className="contact-title">Do you have any questions?</h3>
                    <p className="contact-subtitle">
                        We are available 24/7 to answer any question you have about WebBOOK
                    </p>
                    <button>Send a message</button>
                </div>
            </section>

            <section id="user-count">
                <div className="container">
                    <div className="content">
                        <p>Use <span style={{fontFamily: 'ClashDisplay-Semibold'}}>WebBOOK</span></p>
                        <p className="user-count-subtitle">
                            Join over 20,000+ users
                            and make your life easier.
                        </p>
                        <div className="btn-container">
                            <Link to={'/register'} >
                                <button>Get started</button>
                            </Link>
                            <Link to={'/login'} >
                                <button>Login</button>
                            </Link>
                        </div>
                    </div>
                    <div className="img-container">
                        <img className='mock-img' src={mockImg} alt="mock-img" draggable='false' />
                    </div>
                </div>
            </section>

            <Footer />
        </>
    )
}
