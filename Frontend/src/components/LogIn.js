import React, { useRef, useState } from 'react'
import logoW from '../assests/logo-W.png'
import { Link, useNavigate } from 'react-router-dom';
import DottedLoader from './DottedLoader';

export default function LogIn(props) {
  const [formError, setFormError] = useState({})
  const [showLoader, setShowLoader] = useState(false);

  const { validatePassword, loginUser } = props;
  const navigate = useNavigate();

  const emailRef = useRef('');
  const passwordRef = useRef('');

  const setErrorDataField = (fieldName, value) => {
    setFormError(prevData => ({
      ...prevData,
      [fieldName]: value,
    }));
  };

  const submitForm = async (e) => {
    try {
      e.preventDefault();
      setShowLoader(true);

      // Resetting specific error field
      setErrorDataField('email', undefined);
      setErrorDataField('password', undefined);

      const email = emailRef.current.value;
      const password = passwordRef.current.value;

      // Validating
      const validatePasswordResult = validatePassword(password, 8, setErrorDataField);

      if (validatePasswordResult) {
        const existingUserData = {
          email,
          password
        }
        const responseData = await loginUser(existingUserData);
        const { success, message, errors } = responseData;

        if (success !== undefined && success === true) {

          // Redirect to the dashboard
          navigate("/");
        }

        else if (success !== undefined && success === false) {
          if (message) {
            setErrorDataField('email', message);
            setErrorDataField('password', message);
          } else if (errors) {
            const errorMessage = errors[0].msg;
            setErrorDataField('email', errorMessage);
            setErrorDataField('password', errorMessage);
          }
        }
      }
    } catch (error) {
      console.log(error)
    } finally {
      setShowLoader(false);
    }
  }


  return (
    <div id="login-container">
      <div className="left"></div>
      <div className="right">
        <img src={logoW} alt="logo" />
        <header className='signup-login-header'>
          <h1>Log In</h1>
          <p>Don't have an account yet? <Link to="/register"><span>Register Here</span></Link></p>
        </header>
        <form id="login-form" onSubmit={submitForm}>
          <input type="email" name='email' ref={emailRef} placeholder='Email Address' required />
          <p className="error-text">{formError.email}</p>
          <input type="password" name="password" ref={passwordRef} placeholder="Password" required />
          <p className="error-text">{formError.password}</p>

          <button type="submit" className='signup-login-btn flex-centered'>
            {showLoader ? <DottedLoader /> : "Login"}
          </button>
        </form>
      </div>
    </div>
  )
}
