import React, { useState } from "react";
import styles from "./AISupport.module.css";

function AISupport() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");

    const handleSend = () => {
        if (input.trim()) {
            setMessages([...messages, { text: input, sender: "user" }]);
            setInput("");
            // Simulate AI response
            setTimeout(() => {
                setMessages((prevMessages) => [
                    ...prevMessages,
                    { text: "This is an AI response.", sender: "ai" },
                ]);
            }, 1000);
        }
    };

    return (
        <div className={styles.chatContainer}>
            <div className={styles.chatWindow}>
                {messages.map((msg, index) => (
                    <div
                        key={index}
                        className={`${styles.message} ${msg.sender === "user" ? styles.userMessage : styles.aiMessage}`}
                    >
                        {msg.text}
                    </div>
                ))}
            </div>
            <div className={styles.inputContainer}>
                <input
                    className={styles.input}
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Type your message..."
                />
                <button className={styles.sendButton} onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
}

export default AISupport;
