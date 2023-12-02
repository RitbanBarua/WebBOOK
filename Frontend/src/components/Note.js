import React from 'react'
import abstruct1 from '../assests/abstructs/abstruct1.jpg'
import { useDispatch } from 'react-redux';
import { setEditableData } from '../app/features/editableData/editableDataSlice';

export default function Note(props) {
  const { id, title, content, category, priority, deleteFnc, onEditOpen } = props;
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
  };console.log(id)

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
          <button className="img-wrapper" title='Delete' onClick={()=>{delNote(id)}}><i className="fa-regular fa-trash-can fa-lg" style={{ color: '#000000' }} /></button>
          <button className="img-wrapper" id='star-btn' title='Star'><i className="fa-regular fa-star" style={{ color: '#000000' }} /></button>
        </div>
      </div>

    </div>
  )
}
