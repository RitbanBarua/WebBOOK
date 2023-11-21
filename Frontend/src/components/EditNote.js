import React, { useState, useEffect } from 'react'
// import NoteForm from './NoteForm'
import penImg from '../assests/pen.webp'
import { useSelector } from 'react-redux';

export default function EditNote(props) {
    const { onClose } = props;
    const [shouldCloseModal, setShouldCloseModal] = useState(false);
    const [editableData, setEditableData] = useState({})
    const [formError, setFormError] = useState({})


    const data = useSelector(state => state.reducer.data)
    const [noteData, setNoteData] = useState(data);

    const setNoteDataField = (fieldName, value) => {
        setNoteData(prevData => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const setErrorDataField = (fieldName, value) => {
        setFormError(prevData => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const handleButtonClick = (value) => {
        setNoteDataField('priority', value)
    };

    const submitForm = (e) => {
        e.preventDefault();
        let formData = {};
        if (noteData.title && noteData.title.trim() !== "") {
            if (noteData.title.trim().length < 3) {
                setErrorDataField('title', "Title should be at least 3 characters long");
            } else {
                formData.title = noteData.title.trim()
                setErrorDataField('title', undefined);
            }
        }
        if (noteData.content && noteData.content.trim() !== "") {
            if (noteData.content.trim().length < 5) {
                setErrorDataField('content', "Content should be at least 5 characters long")
            } else {
                formData.content = noteData.content.trim()
                setErrorDataField('content', undefined);
            }
        }
        if (noteData.category && noteData.category.trim() !== "") { formData.category = noteData.category.trim() }
        if (noteData.priority && noteData.priority.trim() !== "") { formData.priority = noteData.priority.trim() }

        // Convert the form data object to a JSON string
        const formDataJSON = JSON.stringify(formData);
        console.log(formDataJSON)
    };

    useEffect(() => {
        setEditableData(data)
        console.log(data)
    }, [data])

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

    console.log(editableData)

    return (
        <div className="modal-background" onClick={() => setShouldCloseModal(true)}>
            <div className="modal-container" onClick={handleModalClick}>
                <header>
                    <div className="img-wrapper pen-img-wrapper"><img className='pen-img' src={penImg} alt="pen" /></div>
                    <h2>Edit Note</h2>
                </header>
                <form className='note-form' id='edit-note-form' onSubmit={submitForm}>
                    <label htmlFor="note-title">Title</label>
                    <input id='note-title' type='text' name='title' value={noteData.title} placeholder='Enter Note Title' onChange={(e) => setNoteDataField('title', e.target.value)} />
                    <p className="error-text">{formError.title}</p>
                    <label htmlFor="note-content">Content</label>
                    <textarea id='note-content' name='content' rows='5' cols='30' value={noteData.content} placeholder='Enter Note Content' onChange={(e) => setNoteDataField('content', e.target.value)}></textarea>
                    <p className="error-text">{formError.content}</p>
                    <label htmlFor="note-category">Category</label>
                    <input id='note-category' type="text" name='category' value={noteData.category} placeholder='Enter Note Category' onChange={(e) => setNoteDataField('category', e.target.value)} />
                    <p className="error-text"></p>
                    <label htmlFor="note-priority">Priority</label>
                    {/* <select name="priority" id="note-priority" value={noteData.priority} onChange={(e) => setNoteDataField('priority', e.target.value)}>
                        <option className="high-priority" value="high">High</option>
                        <option className="medium-priority" value="medium">Medium</option>
                        <option className="low-priority" value="low">Low</option>
                    </select>
                    <div className="priority-buttons">
                        <div className="high-priority"><button type="button" data-value="high">High</button></div>
                        <div className="medium-priority"><button type="button" data-value="medium">Medium</button></div>
                        <div className="low-priority"><button type="button" data-value="low">Low</button></div>

                    </div> */}
                    <div className="priority-buttons" id='note-priority'>
                        <div className={`high-priority`}>
                            <button type="button" className={`${noteData.priority === 'high' ? 'selected' : ''}`} data-value="high" onClick={() => handleButtonClick('high')}>
                                High
                            </button>
                        </div>
                        <div className={`medium-priority`}>
                            <button type="button" className={`medium-priority ${noteData.priority === 'medium' ? 'selected' : ''}`} data-value="medium" onClick={() => handleButtonClick('medium')}>
                                Medium
                            </button>
                        </div>
                        <div className={`low-priority`}>
                            <button type="button" className={`medium-priority ${noteData.priority === 'low' ? 'selected' : ''}`} data-value="low" onClick={() => handleButtonClick('low')}>
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
