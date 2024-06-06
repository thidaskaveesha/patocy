import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import InputField from '../components/InputField';
import styles from './LoginPage.module.css';


function LoginPage() {
    // Using usestate to store the username and password
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    // Function to handle the change in the username field
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };
    // Function to handle the change in the password field
    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };
    // Function to handle the form submission which is called when the user clicks on the login button
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        try {
            const userCredential = await signInWithEmailAndPassword(auth, username, password);
            const user = userCredential.user;
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                console.log('User data:', userData);

                // Navigate based on user role
                if (userData.role === 'Industry lookers') {
                    navigate('/dashboard');
                } else if (userData.role === 'Consultants') {
                    navigate('/dashboard-consultants');
                } else {
                    setError('Unknown user role');
                }
            } else {
                console.log('No such document!');
                setError('User data not found');
            }
        } catch (error) {
            setError(error.message);
            console.error('Error logging in:', error);
        }
    };
    // Function to handle the forgot password functionality
    const handleForgotPassword = () => {
        // Navigate to the forgotpassword page
        //console.log('Forgot password clicked');
        navigate('/reset-password');
    };
    // Function to handle the register click
    const handleRegisterClick = () => {
        // Navigate to the choosing-role page
        navigate('/choosing-role');
    };

    return (
        // Main container which contains the child container
        <div className={styles['login-container']}>
            {/* Child container which contains the login form */}
            <form className={styles['login-form']} onSubmit={handleSubmit}>
                {/* Login title */}
                <h2 className={styles['login-title']}>Login <span>Here</span></h2>
                {/* Login sentence */}
                <p className={styles['login-para']}>Hey there! Nice to see you here...</p>
                {/* Input fields for username and password */}
                <InputField
                    label="Username"
                    type="text"
                    name="username"
                    placeholder="Enter your username"
                    value={username}
                    onChange={handleUsernameChange}
                />
                <InputField
                    label="Password"
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                {/* Forgot password functionality */}
                <p className={styles['forgot-para']}> <span onClick={handleForgotPassword}>Forgot password?</span></p>
                {/* Login button */}
                <button className={styles['login-button']} type="submit">Login</button>
            </form>
            {/* Register text */}
            <p className={styles['registerText']} onClick={handleRegisterClick}>If you haven't an account please click here</p>
            {error && <p className={styles['error']}>{error}</p>}
        </div>
    );
}

export default LoginPage;
