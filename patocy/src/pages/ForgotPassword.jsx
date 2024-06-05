import React, { useState } from "react";
import styles from './ForgotPassword.module.css';
import InputField from '../components/InputField';

function ForgotPassword() {
    const [Email, setEmail] = useState('');
    const handleEmailChange = (e) => {
        setEmail(e.target.value);
    }
    return (
        <div className={styles["container"]}>
            <h2 className={styles["title"]}>Reset <span>Password</span></h2>
            <p className={styles["para"]}>Enter your email address and we will send you a link to reset your password</p>
            <form className={styles["form"]}>
                {/* Input fields for username and password */}
                <InputField
                    label="Email"
                    type="text"
                    name="Email"
                    placeholder="Enter your email associated with the account"
                    value={Email}
                    onChange={handleEmailChange}
                />
                <button className={styles["button"]} type="submit">Reset password</button>
            </form>
            <div className={styles["result-text"]}></div>
        </div>
    );
}

export default ForgotPassword;
