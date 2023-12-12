// import logo from './logo.svg';
import React, { useState } from 'react';
import CryptoJS from 'crypto-js';
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
import { login, logout } from './app/features/loggedInStatus/loggedInStatusSlice';
import { setUserNotes, addUserNote, updateUserNote, removeUserNote } from './app/features/userNotes/userNotesSlice';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookie from './components/Cookie';
import Cookies from 'js-cookie';
import LandingPage from './components/LandingPage';
//import LoadingPage1 from './components/LoadingPage1';
import { register } from 'swiper/element/bundle';

function App() {
  const [isCreateNoteModalOpen, setCreateNoteModalOpen] = useState(false);
  const [isEditNoteModalOpen, setEditNoteModalOpen] = useState(false);

  const cryptoKey = process.env.REACT_APP_SECRET_CRYPTO_KEY;
  const registerURL = process.env.REACT_APP_REGISTER_URL;
  const loginURL = process.env.REACT_APP_LOGIN_URL;
  const logoutURL = process.env.REACT_APP_LOGOUT_URL;
  const getUserNotesURL = process.env.REACT_APP_GET_NOTES_URL;
  const createNoteURL = process.env.REACT_APP_CREATE_NOTE_URL;
  const updateNoteURL = process.env.REACT_APP_UPDATE_NOTE_URL;
  const deleteNoteURL = process.env.REACT_APP_DELETE_NOTE_URL;

  const dispatch = useDispatch();
  const isLoggedIn = useSelector(state => state.loggedInStatus.isLoggedIn);
  const isLoggedInCookie = Cookies.get('isLoggedIn');
  //const isLoading = useSelector(state => state.loadingStatus.isLoading);

  register();

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
      const userData = JSON.stringify(newUserData);

      const response = await axios.post(registerURL, userData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      })

      const responseData = response.data;

      // If the user was created successfully, redirect to the login page
      if (response.status === 201 && responseData.success === true) {
        const userData = JSON.stringify(
          {
            username: newUserData.username,
            firstName: newUserData.firstName,
            lastName: newUserData.lastName,
          }
        )

        // Encrypting User Data
        const encryptedUserData = CryptoJS.AES.encrypt(userData, cryptoKey).toString();

        dispatch(login(encryptedUserData))
        toast.success("Registration Successful!");
        return responseData;
      }
    } catch (error) {
      console.log(error.message)
      if (error.response) {
        const statusCode = error.response.status;
        const responseData = error.response.data;
        if (statusCode === 400 && responseData.success === false) {
          toast.error("Registration Failed!");
          return responseData;
        } else {
          toast.error("Internal Server Error!");
        }
      } else {
        toast.error("Network Error!");
      }
    }
  }


  const loginUser = async (existingUserData) => {
    try {
      const userData = JSON.stringify(existingUserData);

      const response = await axios.post(loginURL, userData, {
        headers: {
          'Content-Type': 'application/json'
        },
        withCredentials: true,
      })

      const responseData = response.data;

      // If the user was created successfully, redirect to the login page
      if (response.status === 200 && responseData.success === true) {
        const userData = JSON.stringify(responseData.userData)

        // Encrypting User Data
        const encryptedUserData = CryptoJS.AES.encrypt(userData, cryptoKey).toString();

        dispatch(login(encryptedUserData))
        toast.success("Logged In Successfully!");

        return responseData;
      }
    } catch (error) {
      console.log(error.message)
      if (error.response) {
        const statusCode = error.response.status;
        const responseData = error.response.data;
        if ((statusCode === 400 || statusCode === 401) && responseData.success === false) {
          toast.error("Login Failed!");
          return responseData;
        } else {
          toast.error("Internal Server Error!");
        }
      } else {
        toast.error("Network Error!");
      }
    }
  }


  const logoutUser = async () => {
    try {
      const response = await axios.post(logoutURL, {}, {
        headers: {
          'Content-Type': 'application/json',
        },
        withCredentials: true,
      })

      const responseData = response.data;

      if (response.status === 200 && responseData.success === true) {
        dispatch(logout());
        toast.success("Logged Out Successfully!");
      }
    } catch (error) {
      console.log(error.message);
      if (error.response) {
        const statusCode = error.response.status;
        const responseData = error.response.data;
        if (statusCode === 403 && responseData.success === false) {
          toast.error("Client Side Error!");
        } else {
          toast.error("Internal Server Error!");
        }
      } else {
        toast.error("Network Error!");
      }
    }
  }


  const getUserNotes = async () => {
    try {
      if (isLoggedInCookie) {
        const response = await axios.get(getUserNotesURL, {
          headers: {
            'Content-Type': 'application/json'
          },
          withCredentials: true,
        })
        const responseData = response.data;

        // If user notes found
        if (response.status === 200 && responseData.success === true) {
          const userNotes = responseData.notes;
          dispatch(setUserNotes(userNotes));
          return userNotes;
        } else {
          toast.error("Session Expired, Please Login Again!");
          setTimeout(() => {
            window.location.href = window.location.origin + "/login";
          }, 3000);
        }
      }
    } catch (error) {
      console.log(error.message)
      if (error.response) {
        const statusCode = error.response.status;
        const responseData = error.response.data;
        if (statusCode === 404 && responseData.success === false) {
          console.log("User Notes Not Found!");
          return responseData;
        } else {
          toast.error("Internal Server Error!");
        }
      } else {
        toast.error("Network Error!");
      }
    }
  }

  const createUserNote = async (formData) => {
    try {
      if (isLoggedInCookie) {
        const formDataJSON = JSON.stringify(formData);

        // Send a POST request with the JSON data
        const response = await axios.post(createNoteURL, formDataJSON, {
          headers: {
            "Content-Type": 'application/json',
          },
          withCredentials: true,
        })
        const responseData = response.data;

        // If the new note created successfully
        if (response.status === 201 && responseData.success === true) {
          const newNote = responseData.newNote;
          dispatch(addUserNote(newNote));
          toast.success("New Note Created Sccessfully!");
          return responseData;
        }
      } else {
        toast.error("Session Expired, Please Login Again!");
        setTimeout(() => {
          window.location.href = window.location.origin + "/login";
        }, 3000);
      }
    } catch (error) {
      console.log(error.message)
      if (error.response) {
        const statusCode = error.response.status;
        const responseData = error.response.data;
        if (statusCode === 400 && responseData.success === false) {
          console.log("Failed To Create New Note!");
          return responseData;
        } else {
          toast.error("Internal Server Error!");
        }
      } else {
        toast.error("Network Error!");
      }
    }
  }

  const updateNote = async (formData, noteId) => {
    try {
      if (isLoggedInCookie) {
        const formDataJSON = JSON.stringify(formData);

        // Send a PATCH request with the JSON data
        const response = await axios.patch(updateNoteURL + noteId, formDataJSON, {
          headers: {
            "Content-Type": 'application/json',
          },
          withCredentials: true,
        });
        const responseData = response.data;

        // If the updated note was successful
        if (response.status === 200 && responseData.success === true) {
          const updatedNote = responseData.updatedNote;
          dispatch(updateUserNote(updatedNote));
          toast.success('Note Updated Successfully!');
          return responseData;
        }
      } else {
        toast.error('Session Expired, Please Login Again!');
        setTimeout(() => {
          window.location.href = window.location.origin + "/login";
        }, 3000);
      }
    } catch (error) {
      console.log(error.message);
      if (error.response) {
        const statusCode = error.response.status;
        const responseData = error.response.data;
        if (statusCode === 404 && responseData.success === false) {
          console.log("Note Not Found!");
          return responseData;
        } else if (statusCode === 400 && responseData.success === false) {
          toast.error("Client Side Error!")
          return responseData;
        } else {
          toast.error("Internal Server Error!");
        }
      } else {
        toast.error("Network Error!");
      }
    }
  }

  const deleteUserNote = async (noteId) => {
    try {
      if (isLoggedInCookie) {
        const response = await axios.delete(deleteNoteURL + noteId, {
          headers: {
            "Content-Type": 'application/json',
          },
          withCredentials: true,
        });
        const responseData = response.data;

        // If the note deleted successfully
        if (response.status === 200 && responseData.success === true) {
          dispatch(removeUserNote(noteId));
          toast.success("Note Deleted Successfully!");
          return responseData;
        }
      } else {
        toast.error("Session Expired, Please Login Again!");
         setTimeout(() => {
           window.location.href = window.location.origin + "/login";
         }, 3000);
      }
    } catch (error) {
      console.log(error.message)
      if (error.response) {
        const statusCode = error.response.status;
        const responseData = error.response.data;
        if (statusCode === 404 && responseData.success === false) {
          toast.warning("Note Not Found!");
          return responseData;
        } else if (statusCode === 400 && responseData.success === false) {
          toast.error("Client Side Error!")
          return responseData;
        } else {
          toast.error("Internal Server Error!");
        }
      } else {
        toast.error('Network Error!');
      }
    }
  }


  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/dashboard" element={isLoggedIn ? <MainContent getUserNotes={getUserNotes} deleteUserNote={deleteUserNote} logoutUser={logoutUser} onCreateOpen={openCreateNoteModal} onEditOpen={openEditNoteModal} /> : <Navigate to={"/register"} />} />
          <Route path='/register' element={isLoggedIn ? <Navigate to={"/dashboard"} /> : <Register validateField={validateField} validatePassword={validatePassword} registerUser={registerUser} />} />
          <Route path="/login" element={isLoggedIn ? <Navigate to={"/dashboard"} /> : <LogIn validateField={validateField} validatePassword={validatePassword} loginUser={loginUser} />} />
        </Routes>
        {isCreateNoteModalOpen && <CreateNote validateField={validateField} createUserNote={createUserNote} onClose={closeCreateNoteModal} />}
        {isEditNoteModalOpen && <EditNote validateField={validateField} updateNote={updateNote} onClose={closeEditNoteModal} />}
        <ToastContainer />
        <Cookie />
      </BrowserRouter>
    </>
  );
}

export default App;

// https://timetoprogram.com/encrypt-and-decrypt-text-react/
// https://dzone.com/articles/data-encrypt-decrypt-in-react-application

// https://www.youtube.com/watch?v=1i04-A7kfFI
