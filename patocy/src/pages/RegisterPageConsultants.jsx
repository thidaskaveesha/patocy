import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import CustomModal from '../components/CustomModal';
import styles from './RegisterPageConsultants.module.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function RegisterPageConsultants() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [bio, setBio] = useState('');
    const [name, setName] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

    // Define validation message state variables
    const [passwordMessage, setPasswordMessage] = useState('');
    const [confirmPasswordMessage, setConfirmPasswordMessage] = useState('');

    // Handlers for input changes
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

    const handleBioChange = (e) => {
        setBio(e.target.value);
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

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            setError("Passwords do not match!");
            setShowModal(true);
            return;
        }
        try {
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            await setDoc(doc(db, "users", user.uid), {
                name: name,
                email: email,
                bio: bio,
                role: "Consultants"
            });

            console.log('User registered and additional details saved:', user);
            navigate('/home-consultants');
        } catch (error) {
            console.error("Error registering user:", error);
            setError('Something went wrong, please try again later.');
            setShowModal(true);
        }
    };

    // Navigate to login page
    const handleHaveAnAccount = () => {
        navigate('/');
    };

    // Close modal
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={styles['bi']}>
            <div className={styles['cRegister-container']}>
                <form className={styles['Register-form']} onSubmit={handleSubmit}>
                    <h2 className={styles['SignUp-title']}>Sign Up <span>Here</span></h2>
                    <p className={styles['SignUp-para']}>Hey there! Nice to see you here...</p>
                    {/* Input fields */}
                    <InputField
                        type="text"
                        name="name"
                        label="Name"
                        placeholder="Enter your name"
                        value={name}
                        onChange={handleNameChange}
                    />
                    <InputField
                        type="text"
                        name="email"
                        label="Email"
                        placeholder="Enter your email"
                        value={email}
                        onChange={handleEmailChange}
                    />
                    <label className={styles['tAreaLable']}>
                        Bio
                        <textarea className={styles['tArea']} onChange={handleBioChange} name="Bio" placeholder="Enter your Bio" rows={4} cols={40} />
                    </label>
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
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    {/* Confirm password validation message */}
                    <p className={password !== confirmPassword ? styles['error-text'] : styles['success-text']}>
                        {confirmPasswordMessage}
                    </p>
                    {/* Register button */}
                    <button className={styles['Register-button']} type="submit">Register</button>
                </form>
                {/* Link to navigate to login page */}
                <p className={styles['registerText']} onClick={handleHaveAnAccount}>If you have an account please click here</p>
            </div>
            {/* Modal for displaying error messages */}
            {showModal && <CustomModal open={showModal} message={error} onClose={closeModal} />}
        </div>
    );
}

export default RegisterPageConsultants;
