import React, { useState, useEffect, useRef } from 'react'
import penImg from '../assests/pen.webp'
import axios from 'axios';

export default function CreateNote(props) {
    const { validateField, onClose } = props;
    const [shouldCloseModal, setShouldCloseModal] = useState(false);
    const [notePriority, setNotePriority] = useState(undefined);
    const [formError, setFormError] = useState({})

    const titleRef = useRef(undefined);
    const contentRef = useRef(undefined);
    const categoryRef = useRef(undefined);

    const handleButtonClick = (value) => {
        setNotePriority(value)
    };

    const setErrorDataField = (fieldName, value) => {
        setFormError(prevData => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    // const createNote = async (formData) => {
    //     // Convert the form data object to a JSON string
    //     const formDataJSON = JSON.stringify(formData);

    //     // Send a POST request with the JSON data
    //     const data = await axios.post("URL", formData, {
    //         headers: {
    //             "Content-Type": 'application/json',
    //         }
    //     })
    // }

    const submitForm = (e) => {
        e.preventDefault();
        let newFormData = {};
        const title = titleRef.current.value;
        const content = contentRef.current.value;
        console.log(content.trim().length)
        const category = categoryRef.current.value;
        const priority = notePriority;
        const isTitleValid = validateField('title', title, 3, 'Title', setErrorDataField);
        // if (title && title.trim() !== "") {
        //     if (title.trim().length < 3 || title.trim().length === 0) {
        //         setErrorDataField('title', "Title should be at least 3 characters long");
        //     } else {
        //         newFormData.title = title.trim()
        //         setErrorDataField('title', undefined);
        //     }
        // }
        const isContentValid = validateField('content', content, 5, 'Content', setErrorDataField)
        // if (content && content.trim() !== "") {
        //     if (content.trim().length < 5) {
        //         setErrorDataField('content', "Content should be at least 5 characters long");
        //     } else {
        //         newFormData.content = content.trim()
        //         setErrorDataField('content', undefined);
        //     }
        // }
        const isCategoryValid = validateField('category', category, 1, 'Category', setErrorDataField)
        // if (!category || category.trim() === "") {
        //     setErrorDataField('category', "Please choose a note category");
        // } else {
        //     newFormData.category = category.trim()
        //     setErrorDataField('category', undefined);
        // }

        if (isTitleValid && isContentValid && isCategoryValid) {
            newFormData.title = title.trim();
            newFormData.content = content.trim();
            newFormData.category = category.trim();
            if (priority) {
                newFormData.priority = priority;
            }
        }

        // Convert the form data object to a JSON string
        const formDataJSON = JSON.stringify(newFormData);
        console.log(formDataJSON)
    }

    useEffect(() => {
        const handleClickOutside = (event) => {
            const modalContainer = document.querySelector('.modal-container');
            if (modalContainer && !modalContainer.contains(event.target) && shouldCloseModal) {
                onClose();
            }
        };

        document.addEventListener('click', handleClickOutside);

        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [onClose, shouldCloseModal]);

    const handleModalClick = () => {
        // Set this flag to false when clicking inside the modal
        setShouldCloseModal(false);
    };

    return (
        <div className="modal-background" onClick={() => setShouldCloseModal(true)}>
            <div className="modal-container" onClick={handleModalClick}>
                <header>
                    <div className="img-wrapper pen-img-wrapper"><img className='pen-img' src={penImg} alt="pen" /></div>
                    <h2>Create A New Note</h2>
                </header>
                <form className='note-form' id='create-update-note-form' onSubmit={submitForm}>
                    <label htmlFor="note-title">Title</label>
                    <input id='note-title' type='text' name='title' ref={titleRef} placeholder='Enter Note Title' required />
                    <p className="error-text">{formError.title}</p>
                    <label htmlFor="note-content">Content</label>
                    <textarea id='note-content' name='content' rows='5' cols='30' ref={contentRef} placeholder='Enter Note Content' required></textarea>
                    <p className="error-text">{formError.content}</p>
                    <label htmlFor="note-category">Category</label>
                    <input id='note-category' type="text" name='category' ref={categoryRef} placeholder='Enter Note Category' required />
                    <p className="error-text"></p>
                    <label htmlFor="note-priority">Priority</label>
                    <div className="priority-buttons" id='note-priority'>
                        <div className={`high-priority`}>
                            <button type="button" className={`${notePriority === 'high' ? 'selected' : ''}`} data-value="high" onClick={() => handleButtonClick('high')}>
                                High
                            </button>
                        </div>
                        <div className={`medium-priority`}>
                            <button type="button" className={`medium-priority ${notePriority === 'medium' ? 'selected' : ''}`} data-value="medium" onClick={() => handleButtonClick('medium')}>
                                Medium
                            </button>
                        </div>
                        <div className={`low-priority`}>
                            <button type="button" className={`medium-priority ${notePriority === 'low' ? 'selected' : ''}`} data-value="low" onClick={() => handleButtonClick('low')}>
                                Low
                            </button>
                        </div>
                    </div>
                    <div className='btn-container'>
                        <button type="reset" onClick={onClose}>Cancel</button>
                        <button type='submit'>Submit</button>
                    </div>
                </form>
            </div>
        </div>
    )
}
