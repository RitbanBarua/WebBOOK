// import logo from './logo.svg';
import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom";
import './App.css';
import MainContent from './components/MainContent';
//import Navbar from './components/Navbar';
import CreateNote from './components/CreateNote';
import EditNote from './components/EditNote';
import Register from './components/Register';
import LogIn from './components/LogIn';


function App() {
  const [isCreateNoteModalOpen, setCreateNoteModalOpen] = useState(false);
  const [isEditNoteModalOpen, setEditNoteModalOpen] = useState(false);

  const openCreateNoteModal = () => {
    setCreateNoteModalOpen(true);
  };

  const closeCreateNoteModal = () => {
    setCreateNoteModalOpen(false);
  };

  const openEditNoteModal = () => {
    setEditNoteModalOpen(true);
  };

  const closeEditNoteModal = () => {
    setEditNoteModalOpen(false);
  };

  //   const validateField = (fieldName, value, minLength, errorMessage) => {
  //     if (!value || value.trim() === '' || value.trim().length === 0) {
  //         setErrorDataField(fieldName, `Please enter ${errorMessage}`);
  //         return false;
  //     } else if (value.trim().length < minLength) {
  //         setErrorDataField(fieldName, `${errorMessage} should be at least ${minLength} characters long`);
  //         return false;
  //     } else {
  //         setErrorDataField(fieldName, undefined);
  //         return true;
  //     }
  // };

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MainContent onCreateOpen={openCreateNoteModal} onEditOpen={openEditNoteModal} />} />
          <Route path='/register' element={<Register />} />
          <Route path="/login" element={<LogIn />} />
        </Routes>
        {isCreateNoteModalOpen && <CreateNote onClose={closeCreateNoteModal} />}
        {isEditNoteModalOpen && <EditNote onClose={closeEditNoteModal} />}
      </BrowserRouter>
    </>
  );
}

export default App;

// https://timetoprogram.com/encrypt-and-decrypt-text-react/
// https://dzone.com/articles/data-encrypt-decrypt-in-react-application

// https://www.youtube.com/watch?v=1i04-A7kfFI
