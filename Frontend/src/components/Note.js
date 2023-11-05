import React from 'react'
import abstruct1 from '../assests/abstructs/abstruct1.jpg'

export default function Note() {

  const editNote = () =>{
    console.log("Edit Note")
  }

  const delNote = ()=>{
    console.log("Delete Note")
  }

  return (
    <div className="note-container">
      <div className="img-wrapper"><img src={abstruct1} alt="ab" /></div>
      <div className="container">
        <div className="left">
          <h2>Note Test Title Lorem ipsum dolor</h2>  {/* 25 chars */}
          <p>This is a note page. Lorem ipsum, dolor sit amet consectetur adipisicing elit. Tenetur dolor iste omnis, consequatur, delectus commodi ut sint molestiae possimus minus alias tempora aut quaerat</p>  {/* 150 chars */}
        </div>
        <div className="right">
          <button className="img-wrapper" title='Edit' onClick={editNote}><i className="fa-solid fa-pen" style={{color: '#000000'}} /></button>
          <button className="img-wrapper" title='Delete' onClick={delNote}><i className="fa-regular fa-trash-can fa-lg" style={{color: '#000000'}} /></button>
          <button className="img-wrapper" id='star-btn' title='Star'><i className="fa-regular fa-star" style={{color: '#000000'}} /></button>
        </div>
      </div>

    </div>
  )
}
