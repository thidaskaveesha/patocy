import React, { useState } from "react";
import InputField from "../components/InputField";
import styles from './LoginPage.module.css';

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleEmailChange = (event) => {
        setEmail(event.target.value);
    };

    const handlePasswordChange = (event) => {
        setPassword(event.target.value);
    };

    const handleSubmit = (event) => {
        event.preventDefault();
        // Handle login logic here
        console.log("Email:", email);
        console.log("Password:", password);
    };

    return (
        <div className={styles['container']}>
            <h1>Login <span>Here</span></h1>
            <p>Hey there! Nice to see you here...</p>
            <form onSubmit={handleSubmit}>
                <InputField
                    type="text"
                    name="email"
                    label="Email"
                    placeholder="Enter your email"
                    value={email}
                    onChange={handleEmailChange}
                />
                <InputField
                    type="password"
                    name="password"
                    placeholder="Enter your password"
                    label="Password"
                    value={password}
                    onChange={handlePasswordChange}
                />
                <p>Forgot password?</p>
                <button type="submit">Login</button>
            </form>
            <p>If you haven't an account please click here</p>
        </div>
    );
}

export default LoginPage;
