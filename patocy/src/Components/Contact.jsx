import React from "react";
import "./Contact.css";
import logoSymbol from '../assets/logoSymbol.png';

function Contact() {
    return (
        <div id="contact">
            <div className="left-side">
                <h1>Contact us</h1>
                <img src={logoSymbol} alt="Company Logo" />
            </div>
            <div className="right-side">
                <form>
                    <label htmlFor="name">Name</label>
                    <input type="text" id="name" name="name" placeholder="Jane" required />
                    <label htmlFor="email">Email</label>
                    <input type="email" id="email" name="email" placeholder="email@domain.com" required />
                    <label htmlFor="message">Your message</label>
                    <textarea id="message" name="message" placeholder="Enter your question or message" required></textarea>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
}

export default Contact;
