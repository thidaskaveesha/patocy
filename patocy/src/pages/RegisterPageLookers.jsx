import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import styles from './RegisterPageLookers.module.css';


function RegisterPageLookers() {
    // Using usestate to store the username and password
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Name, setName] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();
    // Function to handle the change in the username field
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    // Function to handle the change in the password field
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };
    // Function to handle the form submission which is called when the user clicks on the login button
    const handleSubmit = (e) => {
        e.preventDefault();
        // Login logic here
        console.log('Email:', Email, 'Password:', password, 'Name:', Name, 'ConfirmPassword', ConfirmPassword);
    };
    // Function to handle the forgot password functionality
    const handleHaveAnAccount = () => {
        // Navigate to the forgotpassword page
        //console.log('Forgot password clicked');
        navigate('/LoginPage');
    };
    // Function to handle the register click
    const handleRegisterClick = () => {
        // Navigate to the choosing-role page
        navigate('/choosing-role');
    };

    return (
        // Main container which contains the child container
        <div className={styles["Register-container"]}>
            {/* Child container which contains the login form */}
            <form className={styles['Register-form']} onSubmit={handleSubmit}>
                {/* Login title */}
                <h2 className={styles['SignUp-title']}>Sign Up <span>Here</span></h2>
                {/* Login sentence */}
                <p className={styles['SignUp-para']}>Hey there! Nice to see you here...</p>
                {/* Input fields for username and password */}
                <InputField
                        type="text"
                        name="name"
                        label="Name"
                        placeholder="Enter your name"
                        value=""
                        onChange={() => {}}
                    />
                    <InputField
                        type="text"
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                        value=""
                        onChange={() => {}}
                    />
                    <InputField
                        type="password"
                        name="password"
                        label="Password"
                        placeholder="Enter your password"
                        value=""
                        onChange={() => {}}
                    />
                    <InputField
                        type="password"
                        name="confirm-password"
                        label="Confirm Password"
                        placeholder="Confirm your password"
                        value=""
                        onChange={() => {}}
                    />
                {/* Login button */}
                <button className={styles['Register-button']} type="submit">Register</button>
            </form>
            {/* Register text */}
            <p className={styles['registerText']} onClick={handleRegisterClick}>If you have an account please click here</p>
        </div>
    );
}

export default RegisterPageLookers;
