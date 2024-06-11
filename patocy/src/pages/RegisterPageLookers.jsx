import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import styles from './RegisterPageLookers.module.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function RegisterPageLookers() {
    // State variables for storing form inputs
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Name, setName] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');
    const navigate = useNavigate();

    // Handlers to update state variables based on user input
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setConfirmPassword(e.target.value);
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if password and confirm password match
        if (password !== ConfirmPassword) {
            alert("Passwords do not match!");
            return;
        }
        try {
            // Create a new user with email and password using Firebase Authentication
            const userCredential = await createUserWithEmailAndPassword(auth, Email, password);
            const user = userCredential.user;

            // Store additional user details in Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: Name,
                email: Email,
                role: "Industry lookers" // Set the role as "Industry lookers"
            });

            console.log('User registered and additional details saved:', user);
            navigate('/home'); // Navigate to the home page after successful registration
        } catch (error) {
            console.error("Error registering user:", error);
            alert(error.message); // Display error message if registration fails
        }
    };

    // Handler for navigating to the login page
    const handleHaveAnAccount = () => {
        navigate('/');
    };

    return (
        // Main container for the registration form
        <div className={styles["Register-container"]}>
            <form className={styles['Register-form']} onSubmit={handleSubmit}>
                <h2 className={styles['SignUp-title']}>Sign Up <span>Here</span></h2>
                <p className={styles['SignUp-para']}>Hey there! Nice to see you here...</p>
                {/* Input fields for name, email, password, and confirm password */}
                <InputField
                    type="text"
                    name="name"
                    label="Name"
                    placeholder="Enter your name"
                    value={Name}
                    onChange={handleNameChange}
                />
                <InputField
                    type="text"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    value={Email}
                    onChange={handleEmailChange}
                />
                <InputField
                    type="password"
                    name="password"
                    label="Password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <InputField
                    type="password"
                    name="confirm-password"
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={ConfirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                {/* Register button */}
                <button className={styles['Register-button']} type="submit">Register</button>
            </form>
            {/* Text to navigate to the login page */}
            <p className={styles['registerText']} onClick={handleHaveAnAccount}>If you have an account please click here</p>
        </div>
    );
}

export default RegisterPageLookers;
