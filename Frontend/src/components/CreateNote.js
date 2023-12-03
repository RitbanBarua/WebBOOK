import React, { useState, useEffect, useRef } from 'react'
import penImg from '../assests/pen.webp'
import DottedLoader from './DottedLoader';

export default function CreateNote(props) {
    const { validateField, createUserNote, onClose } = props;
    const [shouldCloseModal, setShouldCloseModal] = useState(false);
    const [notePriority, setNotePriority] = useState(undefined);
    const [formError, setFormError] = useState({});
    const [showLoader, setShowLoader] = useState(false);

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

    const submitForm = async (e) => {
        try {
            e.preventDefault();
            setShowLoader(true);

            let newFormData = {};
            const title = titleRef.current.value;
            const content = contentRef.current.value;
            const category = categoryRef.current.value;
            const priority = notePriority;

            const isTitleValid = await validateField('title', title, 3, 'Title', setErrorDataField);
            const isContentValid = await validateField('content', content, 5, 'Content', setErrorDataField)
            const isCategoryValid = await validateField('category', category, 1, 'Category', setErrorDataField)


            if (isTitleValid && isContentValid && isCategoryValid) {
                newFormData.title = title.trim();
                newFormData.content = content.trim();
                newFormData.category = category.trim();
                if (priority) {
                    newFormData.priority = priority;
                }
                const responseData = await createUserNote(newFormData)
                console.log(responseData)
                onClose();
            }
        } catch (error) {
            console.log(error)
        } finally {
            setShowLoader(false);
        }
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
                        <button type='submit'>
                            {showLoader ? <DottedLoader /> : "Submit"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
