import React, { useState, useEffect } from "react";
import styles from "./AISupport.module.css";

function AISupport() {
    const [messages, setMessages] = useState([]);
    const [input, setInput] = useState("");
    const [answers, setAnswers] = useState([]);
    const [jobSuggestions, setJobSuggestions] = useState([]);
    const [courses, setCourses] = useState([]);
    const [nextQuestion, setNextQuestion] = useState("");

    useEffect(() => {
        // Fetch the initial message from the backend when the component mounts
        const fetchInitialMessage = async () => {
            try {
                const response = await fetch("http://localhost:3000/questions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "api-key": "thidas"
                    },
                    body: JSON.stringify({ answers: [] })
                });
                const data = await response.json();
                // If data is an array, process each message
                if (Array.isArray(data)) {
                    const initialMessages = data.map((item) => ({ text: item.text, sender: "ai" }));
                    setMessages(initialMessages);
                    setNextQuestion(data[data.length - 1].nextQuestion);
                } else {
                    const initialMessage = { text: data.text, sender: "ai" };
                    setMessages([initialMessage]);
                    setNextQuestion(data.nextQuestion);
                }
            } catch (error) {
                console.error("Error fetching initial message:", error);
            }
        };

        fetchInitialMessage();
    }, []);

    const handleSend = async () => {
        if (input.trim()) {
            const newMessages = [...messages, { text: input, sender: "user" }];
            setMessages(newMessages);
            setInput("");

            try {
                const updatedAnswers = [...answers, input];
                const response = await fetch("http://localhost:3000/questions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "api-key": "thidas"
                    },
                    body: JSON.stringify({ answers: updatedAnswers })
                });
                const data = await response.json();

                if (Array.isArray(data)) {
                    const aiMessages = data.map((item) => ({ text: item.text, sender: "ai" }));
                    setMessages((prevMessages) => [...prevMessages, ...aiMessages]);
                    setNextQuestion(data[data.length - 1].nextQuestion);
                } else {
                    const aiMessage = { text: data.text, sender: "ai" };
                    setMessages((prevMessages) => [...prevMessages, aiMessage]);
                    setNextQuestion(data.nextQuestion);

                    if (data.jobRole) {
                        console.log("Job role:", data.jobRole);
                        setJobSuggestions([{ title: data.jobRole }]);
                    }
                }

                setAnswers(updatedAnswers); // Update answers state after successful fetch

            } catch (error) {
                console.error("Error determining job roles:", error);
            }
        }
    };
    const handleKeyPress = (event) => {
        if (event.key === 'Enter') {
            handleSend();
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
            {nextQuestion && (
                <div className={styles.inputContainer}>
                    <input
                        className={styles.input}
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={handleKeyPress}
                        placeholder="Type your message..."
                    />
                    <button className={styles.sendButton} onClick={handleSend}>
                        Send
                    </button>
                </div>
            )}
            {jobSuggestions.length > 0 && (
                <div className={styles.suggestions}>
                    <h3>  Suggested Job Roles:</h3>
                    <ul>
                        {jobSuggestions.map((job, index) => (
                            <li key={index}><pre>{job.title}</pre></li>
                        ))}
                    </ul>
                </div>
            )}
            {courses.length > 0 && (
                <div className={styles.courses}>
                    <h3>Related Courses:</h3>
                    <ul>
                        {courses.map((course, index) => (
                            <li key={index}>
                                {course.title} - {course.type} ({course.link})
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

export default AISupport;
