import React from 'react'
import abstruct1 from '../assests/abstructs/abstruct1.jpg'
import abstruct2 from '../assests/abstructs/abstruct2.jpg'
import abstruct3 from '../assests/abstructs/abstruct3.jpg'
import abstruct4 from '../assests/abstructs/abstruct4.jpg'
import { useDispatch } from 'react-redux';
import { setEditableData } from '../app/features/editableData/editableDataSlice';

export default function Note(props) {
  const { id, title, content, category, priority, deleteFnc, onEditOpen } = props;
  const dispatch = useDispatch();
  const abstructs = [abstruct1, abstruct2, abstruct3, abstruct4];
  const randomAbstruct = abstructs[Math.round(Math.random() * (abstructs.length - 1))];

  const editNote = () => {
    onEditOpen();
    console.log("edit opened")
    dispatch(setEditableData(
      {
        id: id,
        title: title,
        content: content,
        category: category,
        priority: priority
      }
    ))
  };

  const delNote = async (_id) => {
    try {
      const responseData = await deleteFnc(_id);
      const { success, message, error } = responseData;
      if (success) {
        console.log('Deleted Successfully');
      } else {
        console.log(message || error.msg);
      }
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="note-container">
      <div className="img-wrapper"><img src={randomAbstruct} alt="ab" /></div>
      <div className="container">
        <div className="left">
          <h2 className='note-title'>{title}</h2>  {/* 25 chars */}
          <p className='note-content'>{content}</p>  {/* 150 chars */}
        </div>
        <div className="right">
          <button className="img-wrapper" title='Edit' data-title={title} onClick={editNote}><i className="fa-solid fa-pen" style={{ color: '#000000' }} /></button>
          <button className="img-wrapper" title='Delete' onClick={() => { delNote(id) }}><i className="fa-regular fa-trash-can fa-lg" style={{ color: '#000000' }} /></button>
          <button className="img-wrapper" id='star-btn' title='Star'><i className="fa-regular fa-star" style={{ color: '#000000' }} /></button>
        </div>
      </div>

    </div>
  )
}
