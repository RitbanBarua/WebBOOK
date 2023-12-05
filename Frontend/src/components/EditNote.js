import React, { useState, useEffect } from 'react'
import { useSelector } from 'react-redux';
import penImg from '../assests/pen.webp'
import DottedLoader from './DottedLoader';
import { toast } from 'react-toastify';

export default function EditNote(props) {
    const { validateField, updateNote, onClose } = props;

    const [shouldCloseModal, setShouldCloseModal] = useState(false);
    const [formError, setFormError] = useState({})
    const [showLoader, setShowLoader] = useState(false);


    const data = useSelector(state => state.editableNoteData.editableData)
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

    const submitForm = async (e) => {
        try {
            e.preventDefault();
            setShowLoader(true);

            let formData = {};
            const id = noteData.id;
            const title = noteData.title;
            const content = noteData.content;
            const category = noteData.category;
            const priority = noteData.priority;

            const isTitleValid = await validateField('title', title, 3, 'Title', setErrorDataField);
            const isContentValid = await validateField('content', content, 5, 'Content', setErrorDataField);
            const isCategoryValid = await validateField('category', category, 1, 'Category', setErrorDataField);

            if (isTitleValid && isContentValid && isCategoryValid) {
                formData.title = title.trim();
                formData.content = content.trim();
                formData.category = category.trim();
                if (priority) {
                    formData.priority = priority;
                }

                if (id && id.trim().length !== 0) {
                    const responseData = await updateNote(formData, id.trim());
                    const { success, message } = responseData;
                    if (success) {
                        console.log(message);
                        onClose();
                    }
                } else {
                    toast.error("Client Side Error!");
                    console.log("Note ID Not Available!");
                }
            }
        } catch (error) {
            console.log(error);
        } finally {
            setShowLoader(false);
        }
    };

    useEffect(() => {
        // setEditableData(data)
        setNoteDataField(data)
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


    return (
        <div className="modal-background" onClick={() => setShouldCloseModal(true)}>
            <div className="modal-container" onClick={handleModalClick}>
                <header>
                    <div className="img-wrapper pen-img-wrapper"><img className='pen-img' src={penImg} alt="pen" /></div>
                    <h2>Edit Note</h2>
                </header>
                <form className='note-form' id='edit-note-form' onSubmit={submitForm}>
                    <label htmlFor="note-title">Title</label>
                    <input id='note-title' type='text' name='title' value={noteData.title} placeholder='Enter Note Title' onChange={(e) => setNoteDataField('title', e.target.value)} required />
                    <p className="error-text">{formError.title}</p>
                    <label htmlFor="note-content">Content</label>
                    <textarea id='note-content' name='content' rows='5' cols='30' value={noteData.content} placeholder='Enter Note Content' onChange={(e) => setNoteDataField('content', e.target.value)} required ></textarea>
                    <p className="error-text">{formError.content}</p>
                    <label htmlFor="note-category">Category</label>
                    <input id='note-category' type="text" name='category' value={noteData.category} placeholder='Enter Note Category' onChange={(e) => setNoteDataField('category', e.target.value)} required />
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
                        <button type='submit'>
                            {showLoader ? <DottedLoader /> : "Update"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}
