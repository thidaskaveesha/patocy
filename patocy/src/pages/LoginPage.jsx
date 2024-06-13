import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { signInWithEmailAndPassword, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { auth, db } from '../firebase';
import InputField from '../components/InputField';
import CustomModal from '../components/CustomModal';
import { CircularProgress } from '@mui/material';
import styles from './LoginPage.module.css';

function LoginPage() {
    // State variables for form inputs, error messages, loading status, and modal visibility
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const [showModal, setShowModal] = useState(false);

    // React Router navigation
    const navigate = useNavigate();

    // Handlers for form input changes
    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    };

    const handlePasswordChange = (e) => {
        setPassword(e.target.value);
    };

    // Handler for form submission
    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true); // Set loading state to true
        try {
            // Sign in with email and password using Firebase Authentication
            const userCredential = await signInWithEmailAndPassword(auth, username, password);
            const user = userCredential.user;

            // Retrieve user document from Firestore
            const userDoc = await getDoc(doc(db, 'users', user.uid));
            if (userDoc.exists()) {
                const userData = userDoc.data();
                // Navigate to respective home pages based on user role
                if (userData.role === 'Industry lookers') {
                    navigate('/home');
                } else if (userData.role === 'Consultants') {
                    navigate('/home-consultants');
                } else {
                    setError('Unknown user role');
                    setShowModal(true);
                }
            } else {
                console.log('No such document!');
                setError('User data not found');
                setShowModal(true);
            }
        } catch (error) {
            setError("Invalid username or password, Please try again.");
            setShowModal(true);
            console.error('Error logging in:', error);
        } finally {
            setLoading(false); // Set loading state to false
        }
    };

    // Handler for navigating to the reset password page
    const handleForgotPassword = () => {
        navigate('/reset-password');
    };

    // Handler for navigating to the registration page
    const handleRegisterClick = () => {
        navigate('/choosing-role');
    };

    // Effect to check authentication state on component mount
    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            if (user) {
                setLoading(true); // Set loading state to true
                try {
                    const userDoc = await getDoc(doc(db, 'users', user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        // Navigate to respective home pages based on user role
                        if (userData.role === 'Industry lookers') {
                            navigate('/home');
                        } else if (userData.role === 'Consultants') {
                            navigate('/home-consultants');
                        } else {
                            setError('Unknown user role');
                            setShowModal(true);
                        }
                    } else {
                        console.log('No such document!');
                        setError('User data not found');
                        setShowModal(true);
                    }
                } catch (error) {
                    console.error('Error checking auth state:', error);
                    setError('Error checking authentication state');
                    setShowModal(true);
                } finally {
                    setLoading(false); // Set loading state to false
                }
            }
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, [navigate]);

    // Handler for closing the modal
    const closeModal = () => {
        setShowModal(false);
    };

    return (
        <div className={styles['login-container']}>
            <form className={styles['login-form']} onSubmit={handleSubmit}>
                <h2 className={styles['login-title']}>Login <span>Here</span></h2>
                <p className={styles['login-para']}>Hey there! Nice to see you here...</p>
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
                <p className={styles['forgot-para']}><span onClick={handleForgotPassword}>Forgot password?</span></p>
                <button className={styles['login-button']} type="submit" disabled={loading}>
                    {loading ? <CircularProgress size={20} /> : 'Login'}
                </button>
            </form>
            <p className={styles['registerText']} onClick={handleRegisterClick}>If you haven't an account please click here</p>
            {showModal && <CustomModal open={showModal} message={error} onClose={closeModal} />}
        </div>
    );
}

export default LoginPage;
