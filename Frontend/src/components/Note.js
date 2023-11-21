import React from 'react'
import abstruct1 from '../assests/abstructs/abstruct1.jpg'
import { useDispatch } from 'react-redux';
import { setEditableData } from '../app/features/editableData/editableDataSlice';

export default function Note(props) {
  const { title, content, category, priority, onEditOpen } = props;
  const dispatch = useDispatch();

  const editNote = () => {
    onEditOpen();
    console.log("edit opened")
    dispatch(setEditableData(
      {
        // id: props._id,
        title: title,
        content: content,
        category: category,
        priority: priority
      }
    ))
  };

  const delNote = () => {
    console.log("Delete Note")
  }

  return (
    <div className="note-container">
      <div className="img-wrapper"><img src={abstruct1} alt="ab" /></div>
      <div className="container">
        <div className="left">
          <h2>{title}</h2>  {/* 25 chars */}
          <p>{content}</p>  {/* 150 chars */}
        </div>
        <div className="right">
          <button className="img-wrapper" title='Edit' data-title={title} onClick={editNote}><i className="fa-solid fa-pen" style={{ color: '#000000' }} /></button>
          <button className="img-wrapper" title='Delete' onClick={delNote}><i className="fa-regular fa-trash-can fa-lg" style={{ color: '#000000' }} /></button>
          <button className="img-wrapper" id='star-btn' title='Star'><i className="fa-regular fa-star" style={{ color: '#000000' }} /></button>
        </div>
      </div>

    </div>
  )
}
