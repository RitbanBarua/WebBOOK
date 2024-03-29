import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import CryptoJS from 'crypto-js';
import Note from './Note'
import axios from 'axios'
import Navbar from './Navbar';
import Clock from './Clock';
import LoadingPage1 from './LoadingPage1';
import { setLoadingStatus } from '../app/features/loadingStatus/loadingStatusSlice';

export default function MainContent(props) {
    const { getUserNotes, deleteUserNote, logoutUser, onCreateOpen, onEditOpen } = props;
    const dispatch = useDispatch();

    const cryptoKey = process.env.REACT_APP_SECRET_CRYPTO_KEY;

    //const isLoggedIn = useSelector(state => state.loggedInStatus.isLoggedIn);
    const encryptedUserData = useSelector(state => state.loggedInStatus.user);
    const decryptedUserData = JSON.parse(CryptoJS.AES.decrypt(encryptedUserData, cryptoKey).toString(CryptoJS.enc.Utf8));

    const [dailyQuote, setDailyQuote] = useState()

    const userData = decryptedUserData;
    const userNotes = useSelector(state => state.userNotes.userNotes);
    const loadingStatus = useSelector(state => state.loadingStatus.isLoading);

    document.title = "Dashboard - WebBOOK";


    const fetchDailyQuote = async () => {
        try {
            const fetchingQuote = await axios.get("https://web-book-api.vercel.app/api/v1/quotes/daily-quote");
            const fetchedQuote = fetchingQuote.data;
            if (fetchedQuote) {
                setDailyQuote(fetchedQuote);
            }
        } catch (error) {
            console.log('Error in Fetching Quotes', error);
        }
    }

    useEffect(() => {
        try {
            // dispatch(setLoadingStatus(true));
            fetchDailyQuote();
            getUserNotes();
        } catch (error) {
            console.log(error)
        } finally {
            setTimeout(() => {
                dispatch(setLoadingStatus(false));
            }, 2500);
        }
    }, [])


    return (
        <>
            {
                loadingStatus ? <LoadingPage1 /> :
                    <>
                        <Navbar logoutUser={logoutUser} onCreateOpen={onCreateOpen} />
                        <header>
                            <div className="header-container">
                                <div id="header-left">
                                    <p id='greetings-para'>Welcome Back! <span>{userData.firstName}</span></p>
                                </div>
                                <div id="header-mid">
                                    {(dailyQuote) ? <div className="left-container">
                                        <img src={dailyQuote.imgURL} alt={dailyQuote.author} width={"60px"} />
                                    </div> : null}
                                    <div className="right-container">
                                        {(dailyQuote) ? <><q>{dailyQuote.quote}</q>
                                            <p>- {dailyQuote.author}</p></>
                                            : "Error Fetching Quote"}
                                    </div>
                                </div>
                                <div id="header-right">
                                    <Clock />
                                </div>
                            </div>
                        </header>
                        <main>
                            <div id="notes-container">
                                {(userNotes && userNotes.length !== 0) ?
                                    userNotes.map(note => {
                                        return (
                                            <Note key={note._id} id={note._id} title={note.title} content={note.content} category={note.category} priority={note.priority} deleteFnc={deleteUserNote} onEditOpen={onEditOpen} />
                                        )
                                    })
                                    : undefined}
                                <div className="note-container add-note-container">

                                    <button onClick={onCreateOpen}>
                                        <i className="fa-solid fa-plus fa-2xl" style={{ color: '#b0b0b0' }} />
                                    </button>
                                    <p>Create Note</p>

                                </div>
                            </div>
                        </main>
                    </>
            }
        </>
    )
}
