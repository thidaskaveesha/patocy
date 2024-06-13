import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import CustomModal from '../components/CustomModal';
import { CircularProgress } from '@mui/material';
import styles from './RegisterPageLookers.module.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function RegisterPageLookers() {
    // State variables for form inputs
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Name, setName] = useState('');
    const [ConfirmPassword, setConfirmPassword] = useState('');

    // State variables for error, loading, modal visibility, and validation messages
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [passwordMessage, setPasswordMessage] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');

    // React Router navigation
    const navigate = useNavigate();

    // Handlers for form input changes
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        const value = e.target.value;
        setPassword(value);
        // Set password validation message based on length
        if (value.length < 6) {
            setPasswordMessage('Password must be at least 6 characters');
        } else {
            setPasswordMessage('Password length is sufficient');
        }
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        const value = e.target.value;
        setConfirmPassword(value);
        // Set confirm password validation message based on match with password
        if (value !== password) {
            setConfirmPasswordMessage('Passwords do not match');
        } else {
            setConfirmPasswordMessage('Passwords match');
        }
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        // Check if password meets minimum length requirement
        if (password.length < 6) {
            setError("Password must be at least 6 characters long!");
            setShowModal(true);
            return;
        }
        // Check if password and confirm password match
        if (password !== ConfirmPassword) {
            setError("Passwords do not match!");
            setShowModal(true);
            return;
        }
        setLoading(true); // Set loading state to true
        try {
            // Create user with email and password
            const userCredential = await createUserWithEmailAndPassword(auth, Email, password);
            const user = userCredential.user;

            // Save additional user details to Firestore
            await setDoc(doc(db, "users", user.uid), {
                name: Name,
                email: Email,
                role: "Industry lookers"
            });

            console.log('User registered and additional details saved:', user);
            navigate('/home'); // Navigate to home page on successful registration
        } catch (error) {
            console.error("Error registering user:", error);
            setError('Something happened, please try again!');
            setShowModal(true); // Show modal with error message
        } finally {
            setLoading(false); // Set loading state to false
        }
    };

    // Handler for navigating to login page
    const handleHaveAnAccount = () => {
        navigate('/');
    };

    // Handler for closing the modal
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={styles["Register-container"]}>
            <form className={styles['Register-form']} onSubmit={handleSubmit}>
                <h2 className={styles['SignUp-title']}>Sign Up <span>Here</span></h2>
                <p className={styles['SignUp-para']}>Hey there! Nice to see you here...</p>
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
                {/* Password validation message */}
                <p className={password.length < 6 ? styles['error-text'] : styles['success-text']}>
                    {passwordMessage}
                </p>
                <InputField
                    type="password"
                    name="confirm-password"
                    label="Confirm Password"
                    placeholder="Confirm your password"
                    value={ConfirmPassword}
                    onChange={handleConfirmPasswordChange}
                />
                {/* Confirm password validation message */}
                <p className={password !== ConfirmPassword ? styles['error-text'] : styles['success-text']}>
                    {confirmPasswordMessage}
                </p>
                {/* Register button */}
                <button className={styles['Register-button']} type="submit" disabled={loading}>
                    {loading ? <CircularProgress size={20} /> : 'Register'}
                </button>
            </form>
            {/* Link to navigate to login page */}
            <p className={styles['registerText']} onClick={handleHaveAnAccount}>If you have an account please click here</p>
            {/* Modal for displaying error messages */}
            {showModal && <CustomModal open={showModal} message={error} onClose={closeModal} />}
        </div>
    );
}

export default RegisterPageLookers;
