import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import InputField from '../components/InputField';
import styles from './RegisterPageConsultants.module.css';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';

function RegisterPageConsultants() {
    // State variables for storing form inputs
    const [Email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [Bio, setBio] = useState('');
    const [Name, setName] = useState('');
    const [confirmPassword, setconfirmPassword] = useState('');
    const navigate = useNavigate();

    // Handlers to update state variables based on user input
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    const handleBioChange = (e) => {
        setBio(e.target.value);
    };

    const handleNameChange = (e) => {
        setName(e.target.value);
    };

    const handleConfirmPasswordChange = (e) => {
        setconfirmPassword(e.target.value);
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        // Check if password and confirm password match
        if (password !== confirmPassword) {
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
                bio: Bio,
                role: "Consultants"
            });

            console.log('User registered and additional details saved:', user);
            navigate('/home-consultants'); // Navigate to the home page after successful registration
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
                    <lable className={styles['tAreaLable']}>
                        Bio
                        <textarea className={styles['tArea']} onChange={handleBioChange} name="Bio" placeholder="Enter your Bio" rows={4} cols={40} />

                    </lable>
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
                        value={confirmPassword}
                        onChange={handleConfirmPasswordChange}
                    />
                    {/* Register button */}
                    <button className={styles['Register-button']} type="submit">Register</button>
                </form>
                {/* Register text */}
                <p className={styles['registerText']} onClick={handleHaveAnAccount}>If you have an account please click here</p>
            </div>
        </div>
    );
}

export default RegisterPageConsultants;
