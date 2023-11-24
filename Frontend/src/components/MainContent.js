import React, { useEffect, useState } from 'react'
import Note from './Note'
import axios from 'axios'
import Navbar from './Navbar';

export default function MainContent(props) {
    const { onCreateOpen, onEditOpen } = props;
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

    const demoData = {
        "_id": {
            "$oid": "65466604fee1dad7d2c5f84d"
        },
        "title": "note title 2",
        "content": "note content totally! 😄",
        "category": "general",
        "priority": "low",
        "author": {
            "$oid": "654606c92d890612af175bc6"
        },
        "createdAt": {
            "$date": "2023-11-04T15:40:52.795Z"
        },
        "updatedAt": {
            "$date": "2023-11-04T15:40:52.795Z"
        },
        "__v": 0
    }

    useEffect(() => {
        fetchDailyQuote();
    }, [])


    return (
        <>
            <Navbar />
            <header>
                <div className="header-container">
                    <div id="header-left">
                        <p>Welcome Back! <span>Mr. Ashutosh</span></p>
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
                    <Note title={demoData.title} content={demoData.content} category={demoData.category} priority={demoData.priority} onEditOpen={onEditOpen} />
                    <Note title={demoData.title} content={demoData.content} category={demoData.category} priority={demoData.priority} onEditOpen={onEditOpen} />
                    <Note title={demoData.title} content={demoData.content} category={demoData.category} priority={demoData.priority} onEditOpen={onEditOpen} />
                    <Note title={demoData.title} content={demoData.content} category={demoData.category} priority={demoData.priority} onEditOpen={onEditOpen} />
                    <Note title="title" content="{demoData.content}" category="{demoData.category}" priority="medium" onEditOpen={onEditOpen} />
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
