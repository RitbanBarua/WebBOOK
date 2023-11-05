import React, { useEffect, useState } from 'react'
import Note from './Note'
import axios from 'axios'

export default function MainContent() {
    const [dailyQuote, setDailyQuote] = useState()

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

    useEffect(() => {
        fetchDailyQuote();
    }, [])


    return (
        <>
            <header>
                <div className="header-container">
                    <div id="header-left">
                        <p>Welcome Back! <span>Mr. Ashutosh</span></p>
                    </div>
                    <div id="header-mid">
                        { (dailyQuote) ? <div className="left-container">
                            <img src={dailyQuote.imgURL} alt={dailyQuote.author} width={"60px"} />
                        </div> : null }
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
                    <Note />
                    <Note />
                    <Note />
                    <Note />
                    <Note />
                    <div className="note-container add-note-container">

                        <button>
                            <i className="fa-solid fa-plus fa-2xl" style={{ color: '#b0b0b0' }} />
                        </button>
                        <p>Create Note</p>

                    </div>
                </div>
            </main>
        </>
    )
}
