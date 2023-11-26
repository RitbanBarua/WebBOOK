import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import CryptoJS from 'crypto-js';
import Note from './Note'
import axios from 'axios'
import Navbar from './Navbar';

export default function MainContent(props) {
    const { getUserNotes, onCreateOpen, onEditOpen } = props;

    const cryptoKey = process.env.REACT_APP_SECRET_CRYPTO_KEY;

    //const isLoggedIn = useSelector(state => state.loggedInStatus.isLoggedIn);
    const encryptedUserData = useSelector(state => state.loggedInStatus.user);
    const decryptedUserData = JSON.parse(CryptoJS.AES.decrypt(encryptedUserData, cryptoKey).toString(CryptoJS.enc.Utf8));

    const [dailyQuote, setDailyQuote] = useState()
    //const [notes, setNotes] = useState([])
    //const [userData, setUserData] = useState(decryptedUserData)
    const userData = decryptedUserData;
    const userNotes = useSelector(state => state.userNotes.userNotes);


    const fetchDailyQuote = async () => {
        try {
            const fetchingQuote = await axios.get("http://localhost:5000/daily-quote");
            const fetchedQuote = fetchingQuote.data;
            if (fetchedQuote) {
                setDailyQuote(fetchedQuote);
            }
        } catch (error) {
            console.log('Error in Fetching Quotes', error);
        }
    }

    // const demoData = {
    //     "_id": {
    //         "$oid": "65466604fee1dad7d2c5f84d"
    //     },
    //     "title": "note title 2",
    //     "content": "note content totally! 😄",
    //     "category": "general",
    //     "priority": "low",
    //     "author": {
    //         "$oid": "654606c92d890612af175bc6"
    //     },
    //     "createdAt": {
    //         "$date": "2023-11-04T15:40:52.795Z"
    //     },
    //     "updatedAt": {
    //         "$date": "2023-11-04T15:40:52.795Z"
    //     },
    //     "__v": 0
    // }

    useEffect(() => {
        fetchDailyQuote();
        getUserNotes();
    }, [])


    return (
        <>
            <Navbar />
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
                        right
                    </div>
                </div>
            </header>
            <main>
                <div id="notes-container">
                    {(userNotes && userNotes.length !== 0) ? 
                     userNotes.forEach(note => {
                        return(
                            <Note title={note.title} content={note.content} category={note.category} priority={note.priority} onEditOpen={onEditOpen} />
                        )
                     })
                     : undefined}
                    {/* <Note title={demoData.title} content={demoData.content} category={demoData.category} priority={demoData.priority} onEditOpen={onEditOpen} />
                    <Note title={demoData.title} content={demoData.content} category={demoData.category} priority={demoData.priority} onEditOpen={onEditOpen} />
                    <Note title={demoData.title} content={demoData.content} category={demoData.category} priority={demoData.priority} onEditOpen={onEditOpen} />
                    <Note title={demoData.title} content={demoData.content} category={demoData.category} priority={demoData.priority} onEditOpen={onEditOpen} />
                    <Note title="title" content="{demoData.content}" category="{demoData.category}" priority="medium" onEditOpen={onEditOpen} /> */}
                    <div className="note-container add-note-container">

                        <button onClick={onCreateOpen}>
                            <i className="fa-solid fa-plus fa-2xl" style={{ color: '#b0b0b0' }} />
                        </button>
                        <p>Create Note</p>

                    </div>
                </div>
            </main>
        </>
    )
}
