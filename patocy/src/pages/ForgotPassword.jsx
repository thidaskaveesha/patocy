import React, { useState } from "react";
import styles from './ForgotPassword.module.css';
import InputField from '../components/InputField';
import { auth } from '../firebase';
import { sendPasswordResetEmail } from 'firebase/auth';

function ForgotPassword() {
    const [Email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [error, setError] = useState('');

    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setMessage('');
        setError('');
        try {
            await sendPasswordResetEmail(auth, Email);
            setMessage('Password reset email sent successfully.');
        } catch (error) {
            console.error('Error sending password reset email:', error);
            setError('Failed to send password reset email. Please check the email and try again.');
        }
    };

    return (
        <div className={styles["container"]}>
            <h2 className={styles["title"]}>Reset <span>Password</span></h2>
            <p className={styles["para"]}>Forgot your password, No problem...</p>
            <form className={styles["form"]} onSubmit={handleSubmit}>
                <InputField
                    label="Email"
                    type="email"
                    name="Email"
                    placeholder="Enter your email associated with the account"
                    value={Email}
                    onChange={handleEmailChange}
                />
                <button className={styles["button"]} type="submit">Reset password</button>
            </form>
            {message && <div className={styles["result-text"]}>{message}</div>}
            {error && <div className={styles["error-text"]}>{error}</div>}
        </div>
    );
}

export default ForgotPassword;
