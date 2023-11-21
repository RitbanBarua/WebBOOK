import React, { useEffect } from 'react'

export default function NoteForm(props) {
    const { type, onClose } = props;
    // const form = document.getElementById('create-update-note-form');
    const submitForm = (e) => {
        e.preventDefault();
        const form = document.getElementById('create-update-note-form');
        let formData = {};
        if (type === "create") {
            for (let i = 0; i < form.elements.length; i++) {
                if (form.elements[i].name) {
                    formData[form.elements[i].name] = form.elements[i].value;
                }
            }

            // Convert the form data object to a JSON string
            const formDataJSON = JSON.stringify(formData);
            console.log(formData)
        } else if (type === "edit") {
            console.log("edit note submit")
        }
    };

    useEffect(() => {
        const buttons = document.querySelectorAll('.priority-buttons button');
        const select = document.getElementById('note-priority');

        buttons.forEach(button => {
            button.addEventListener('click', () => {
                const value = button.getAttribute('data-value');
                const option = select.querySelector(`[value="${value}"]`);

                if (option) {
                    select.querySelectorAll('option').forEach(option => option.selected = false);
                    option.selected = true;

                    buttons.forEach(btn => btn.classList.remove('selected'));
                    button.classList.add('selected');
                }
            });
        });
    }, [])

    return (
        <form className='note-form' id='create-update-note-form' onSubmit={submitForm}>
            <label htmlFor="note-title">Title</label>
            <input id='note-title' type='text' name='title' placeholder='Enter Note Title' />
            <p className="error-text">hi</p>
            <label htmlFor="note-content">Content</label>
            <textarea id='note-content' name='content' rows='5' cols='30' placeholder='Enter Note Content'></textarea>
            <p className="error-text">hi</p>
            <label htmlFor="note-category">Category</label>
            <input id='note-category' type="text" name='category' placeholder='Enter Note Category' />
            <label htmlFor="note-priority">Priority</label>
            <select name="priority" id="note-priority" >
                <option className="high-priority" value="high">High</option>
                <option className="medium-priority" value="medium">Medium</option>
                <option className="low-priority" value="low">Low</option>
            </select>
            <div className="priority-buttons">
                <div className="high-priority"><button type="button" data-value="high">High</button></div>
                <div className="medium-priority"><button type="button" data-value="medium">Medium</button></div>
                <div className="low-priority"><button type="button" data-value="low">Low</button></div>

            </div>
            <div className='btn-container'>
                <button type="reset" onClick={onClose}>Cancel</button>
                <button type='submit'>Submit</button>
            </div>
        </form>
    )
}
