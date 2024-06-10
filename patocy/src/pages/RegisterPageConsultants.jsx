import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import styles from './RegisterPageConsultants.module.css';



function RegisterPageConsultants() {
    // Using usestate to store the username and password
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Bio, setBio] = useState('');
    const [Name, setName] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const navigate = useNavigate();
    // Function to handle the change in the username field
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };
    // Function to handle the change in the password field
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    const handleBiochange = (e) => {
        setBio(e.target.value);
    }
    // Function to handle the change in the name field
    const handleNameChange = (e) => {
        setName(e.target.value);
    };
    // Function to handle the change in the confirm password field
    const handleconfirmPasswordChange = (e) => {
        setconfirmPassword(e.target.value);
    };
    // Function to handle the form submission which is called when the user clicks on the login button
    const handleSubmit = (e) => {
        e.preventDefault();
        // Login logic here
        console.log('Email:', Email, 'Password:', password, 'Name:', Bio, 'Bio', Name,'confirmPassword',confirmPassword);
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
        <div className={styles['bi']}>
            {/* Main container which contains the child container*/}
            <div className={styles['cRegister-container']}>
                {/* Child container which contains the login form */}
                <form className={styles['Register-form']} onSubmit={handleSubmit}>
                    {/* Login title */}
                    <h2 className={styles['SignUp-title']}>Sign Up <span>Here</span></h2>
                    {/* Login sentence */}
                    <p className={styles['SignUp-para']}>Hey there! Nice to see you here...</p>
                    {/* Input fields for username and password */}
                    <InputField oninput={handleNameChange}
                            type="text"
                            name="name"
                            label="Name"
                            placeholder="Enter your name"
                            onChange={() => {}}
                        />
                        <InputField oninput={handleEmailChange}
                            type="text"
                            name="email"
                            label="Email"
                            placeholder="Enter your email"
                            onChange={() => {}}
                        />
                        <lable className={styles['tAreaLable']}>
                            Bio
                            <textarea className={styles['tArea']} oninput={handleBiochange} name="Bio" placeholder="Enter your Bio" rows={4} cols={40} /> 
                        
                        </lable>
                        
                        <InputField oninput={handlePasswordChange}
                            type="password"
                            name="password"
                            label="Password"
                            placeholder="Enter your password"
                            onChange={() => {}}
                        />
                        <InputField oninput={handleconfirmPasswordChange}
                            type="password"
                            name="confirm-password"
                            label="Confirm Password"
                            placeholder="Confirm your password"
                            onChange={() => {}}
                        />
                    {/* Login button */}
                    <button className={styles['Register-button']} type="submit" onClick={handleHaveAnAccount}>Register</button>
                </form>
                {/* Register text */}
                <p className={styles['registerText']} onClick={handleRegisterClick}>If you have an account please click here</p>
            </div>
        </div>
    );
}

export default RegisterPageConsultants;
