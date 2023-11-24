// import logo from './logo.svg';
import React, { useState } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import './App.css';
import MainContent from './components/MainContent';
//import Navbar from './components/Navbar';
import CreateNote from './components/CreateNote';
import EditNote from './components/EditNote';
import Register from './components/Register';
import LogIn from './components/LogIn';
import axios from 'axios';
import { login } from './app/features/loggedInStatus/loggedInStatusSlice';


function App() {
  const [isCreateNoteModalOpen, setCreateNoteModalOpen] = useState(false);
  const [isEditNoteModalOpen, setEditNoteModalOpen] = useState(false);

  const registerURL = process.env.REACT_APP_REGISTER_URL;
  const loginURL = process.env.REACT_APP_LOGIN_URL;

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.loggedInStatus.isLoggedIn);
  // console.log(loggedInStatus)

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

  const validateField = (fieldName, value, minLength, errorMessageFieldName, errorFnc) => {
    if (!value || value.trim() === '' || value.trim().length === 0) {
      errorFnc(fieldName, `Please enter ${errorMessageFieldName}`);
      return false;
    } else if (value.trim().length < minLength) {
      errorFnc(fieldName, `${errorMessageFieldName} should be at least ${minLength} characters long`);
      return false;
    } else {
      errorFnc(fieldName, undefined);
      return true;
    }
  };

  const validatePassword = (password, minLength, errorFnc) => {
    // const minLength = 8;
    const hasWhiteSpace = /\s/g.test(password)
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasDigit = /\d/.test(password);
    const hasSpecialChar = /[!@#$%^&*()_+{}[\]:;<>,.?~\\/-]/.test(password);

    // Check minimum length
    if (password.length < minLength) {
      errorFnc('password', `Password should be at least ${minLength} characters long.`);
      return false;
    }

    // Check for white spaces
    if (hasWhiteSpace) {
      errorFnc('password', 'Password should not contain any white spaces.');
      return false;
    }

    // Check for at least one uppercase letter
    if (!hasUppercase) {
      errorFnc('password', 'Password should contain at least one uppercase letter.');
      return false;
    }

    // Check for at least one lowercase letter
    if (!hasLowercase) {
      errorFnc('password', 'Password should contain at least one lowercase letter.');
      return false;
    }

    // Check for at least one digit
    if (!hasDigit) {
      errorFnc('password', 'Password should contain at least one number.');
      return false;
    }

    // Check for at least one special character
    if (!hasSpecialChar) {
      errorFnc('password', 'Password should contain at least one special character.');
      return false;
    }

    // If all checks pass, the password is valid
    errorFnc('password', undefined)  // Reset Error Field
    return true;
  }

  const registerUser = async (newUserData) => {
    try {
      // Convert the user data object to a JSON string
      const userData = JSON.stringify(newUserData);

      // Create a new user
      const response = await axios.post(registerURL, userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // console.log(response)
      const responseData = response.data;

      // If the user was created successfully, redirect to the login page
      if (response.status === 201 && responseData.success === true) {
        dispatch(login({
          username: newUserData.username,
          fName: newUserData.firstName,
          lName: newUserData.lastName,
        }))
        // window.location.href = loginURL;
        return responseData;
      }
    } catch (error) {
      console.log(error.message)

      const statusCode = error.response.status;
      const responseData = error.response.data;
      if (statusCode === 400 && responseData.success === false) {

        // If the user was not created successfully, display an error message
        return responseData;
      }
    }
  }

  const loginUser = async (existingUserData) => {
    try {
      // Convert the user data object to a JSON string
      const userData = JSON.stringify(existingUserData);

      // Create a new user
      const response = await axios.post(loginURL, userData, {
        headers: {
          'Content-Type': 'application/json'
        }
      })
      // console.log(response)
      const responseData = response.data;

      // If the user was created successfully, redirect to the login page
      if (response.status === 200 && responseData.success === true) {
        dispatch(login(responseData.userData))
        // window.location.href = loginURL;
        return responseData;
      }
    } catch (error) {
      console.log(error.message)

      const statusCode = error.response.status;
      const responseData = error.response.data;
      if ((statusCode === 400 || statusCode === 401) && responseData.success === false) {

        // If the user was not created successfully, display an error message
        return responseData;
      }
    }
  }

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={isLoggedIn ? <MainContent onCreateOpen={openCreateNoteModal} onEditOpen={openEditNoteModal} /> : <Navigate to={"/register"} />} />
          <Route path='/register' element={isLoggedIn ? <Navigate to={"/"} /> : <Register validateField={validateField} validatePassword={validatePassword} registerUser={registerUser} />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to={"/"} /> : <LogIn validateField={validateField} validatePassword={validatePassword} loginUser={loginUser} />} />
        </Routes>
        {isCreateNoteModalOpen && <CreateNote validateField={validateField} onClose={closeCreateNoteModal} />}
        {isEditNoteModalOpen && <EditNote onClose={closeEditNoteModal} />}
      </BrowserRouter>
    </>
  );
}

export default App;

// https://timetoprogram.com/encrypt-and-decrypt-text-react/
// https://dzone.com/articles/data-encrypt-decrypt-in-react-application

// https://www.youtube.com/watch?v=1i04-A7kfFI
