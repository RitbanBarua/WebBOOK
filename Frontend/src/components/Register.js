import React, { useRef, useState } from 'react'
import 'react-phone-number-input/style.css'
import PhoneInput, { isPossiblePhoneNumber, parsePhoneNumber, getCountryCallingCode } from 'react-phone-number-input'
import logoW from '../assests/logo-W.png'
import { Link, useNavigate } from 'react-router-dom';
import DottedLoader from './DottedLoader';


export default function Register(props) {
    const [userName, setUserName] = useState('');
    const [phoneNo, setPhoneNo] = useState('');
    const [formError, setFormError] = useState({})
    const [showLoader, setShowLoader] = useState(false)

    const { validateField, validatePassword, registerUser } = props;
    const navigate = useNavigate();

    const fNameRef = useRef('');
    const lNameRef = useRef('');
    const emailRef = useRef('');
    const passwordRef = useRef('');
    // const confirmPasswordRef = useRef('');

    const setErrorDataField = (fieldName, value) => {
        setFormError(prevData => ({
            ...prevData,
            [fieldName]: value,
        }));
    };

    const checkPhoneNo = () => {
        if (phoneNo && phoneNo.trim().length !== 0) {
            const possibleNo = isPossiblePhoneNumber(phoneNo);
            if (possibleNo) {
                setErrorDataField('phone', undefined);  // Reset Error msg
                const parseNo = parsePhoneNumber(phoneNo)
                if (parseNo) {
                    const countryCode = getCountryCallingCode(parseNo.country);
                    const nationalNumber = parseNo.nationalNumber;
                    return { countryCode, nationalNumber };
                } else {
                    setErrorDataField('phone', 'Please enter a valid phone number');
                    return;
                }
            } else {
                setErrorDataField('phone', 'Please enter a valid phone number');
                return;
            }
        } else {
            setErrorDataField('phone', 'This field cannot be empty')
            return;
        }
    }

    const submitForm = async (e) => {
        try {
            e.preventDefault();
            setShowLoader(true);

            // Resetting specific error field
            setErrorDataField('username', undefined);
            setErrorDataField('email', undefined);

            const fName = fNameRef.current.value;
            const lName = lNameRef.current.value;
            const email = emailRef.current.value;
            const password = passwordRef.current.value;

            const validateFirstNameResult = validateField('fName', fName, 2, 'Name', setErrorDataField);
            const validateLastNameResult = validateField('lName', lName, 2, 'Name', setErrorDataField);
            const validatePasswordResult = validatePassword(password, 8, setErrorDataField);
            const validatePhoneResult = checkPhoneNo();

            if (validateFirstNameResult && validateLastNameResult && validatePasswordResult && validatePhoneResult) {
                const countryCode = Number.parseInt(validatePhoneResult.countryCode);
                const nationalNumber = Number.parseInt(validatePhoneResult.nationalNumber);
                const newUserData = {
                    username: userName,
                    firstName: fName,
                    lastName: lName,
                    email,
                    password,
                    countryCode,
                    mobile: nationalNumber,
                }

                // Sending data to API
                const responseData = await registerUser(newUserData);
                const { success, message } = responseData;

                if (success !== undefined && success === true) {

                    // Redirect to the dashboard
                    navigate("/");
                }

                else if (success !== undefined && success === false) {
                    setErrorDataField('username', message);
                    setErrorDataField('email', message);
                }
            }
        } catch (error) {
            console.log(error)
        } finally {
            setShowLoader(false);
        }
    }

    return (
        <>
            <div id="register-container">
                <div className="left">
                    <img src={logoW} alt="logo" />
                    <header className='signup-login-header'>
                        <h1>Sign Up</h1>
                        <p>Already have an account? <Link to="/login"><span>Login Here</span></Link></p>
                    </header>
                    <form id='register-form' onSubmit={submitForm}>
                        <input type="text" className='disabled-input' name="username" value={userName} placeholder="Username" disabled />
                        <p className="error-text">{formError.username}</p>
                        <div id="signup-name">
                            <input type="text" name='firstName' ref={fNameRef} placeholder='First Name' required />
                            <input type="text" name='lastName' ref={lNameRef} placeholder='Last Name' required />
                        </div>
                        <p className="error-text">{formError.fName || formError.lName}</p>
                        <input type="email" name='email' ref={emailRef} onChange={e => setUserName(e.target.value)} placeholder='Email Address' required />
                        <p className="error-text">{formError.email}</p>
                        <input type="password" name="password" ref={passwordRef} placeholder="Password" required />
                        <p className="error-text">{formError.password}</p>
                        <div className="phone-input-container">
                            <PhoneInput placeholder="Enter phone number" value={phoneNo} onChange={setPhoneNo} />
                            <p className="error-text">{formError.phone}</p>
                        </div>
                        <button type="submit" className='signup-login-btn flex-centered'>
                            {showLoader ? <DottedLoader /> : "Register"}
                        </button>
                    </form>
                </div>
                <div className="right"></div>
            </div>
        </>
    )
}

// https://gitlab.com/catamphetamine/react-phone-number-input#readme