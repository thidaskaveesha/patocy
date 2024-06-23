import React, { useState, useEffect } from "react";
import styles from "./AISupport.module.css";

// Define the AISupport component
function AISupport() {
    // State variables to manage different aspects of the chat
    const [messages, setMessages] = useState([]); // To store chat messages
    const [input, setInput] = useState(""); // To store the current user input
    const [answers, setAnswers] = useState([]); // To store user's answers
    const [jobSuggestions, setJobSuggestions] = useState([]); // To store job suggestions from the AI
    const [courses, setCourses] = useState([]); // To store related courses from the AI
    const [nextQuestion, setNextQuestion] = useState(""); // To store the next question from the AI

    // useEffect hook to fetch the initial message when the component mounts
    useEffect(() => {
        // Function to fetch the initial message from the backend
        const fetchInitialMessage = async () => {
            try {
                // Send a POST request to the backend
                const response = await fetch("http://localhost:3000/questions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "api-key": "thidas"
                    },
                    body: JSON.stringify({ answers: [] }) // Send an empty answers array
                });
                const data = await response.json(); // Parse the response as JSON

                // Check if the response is an array
                if (Array.isArray(data)) {
                    // Map over the array and set messages for each item
                    const initialMessages = data.map((item) => ({ text: item.text, sender: "ai" }));
                    setMessages(initialMessages); // Update messages state
                    setNextQuestion(data[data.length - 1].nextQuestion); // Set the next question from the last item
                } else {
                    // If response is not an array, process as a single object
                    const initialMessage = { text: data.text, sender: "ai" };
                    setMessages([initialMessage]); // Update messages state
                    setNextQuestion(data.nextQuestion); // Set the next question
                }
            } catch (error) {
                console.error("Error fetching initial message:", error); // Log any errors
            }
        };

        fetchInitialMessage(); // Call the function
    }, []); // Empty dependency array ensures this runs only once

    // Function to handle sending messages
    const handleSend = async () => {
        if (input.trim()) { // Check if input is not just whitespace
            const newMessages = [...messages, { text: input, sender: "user" }]; // Add user message to messages array
            setMessages(newMessages); // Update messages state
            setInput(""); // Clear the input field

            try {
                const updatedAnswers = [...answers, input]; // Add the current input to answers array
                // Send a POST request to the backend with updated answers
                const response = await fetch("http://localhost:3000/questions", {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        "api-key": "thidas"
                    },
                    body: JSON.stringify({ answers: updatedAnswers }) // Send updated answers
                });
                const data = await response.json(); // Parse the response as JSON

                // Check if the response is an array
                if (Array.isArray(data)) {
                    const aiMessages = data.map((item) => ({ text: item.text, sender: "ai" })); // Map AI messages
                    setMessages((prevMessages) => [...prevMessages, ...aiMessages]); // Update messages state
                    setNextQuestion(data[data.length - 1].nextQuestion); // Set the next question
                } else {
                    const aiMessage = { text: data.text, sender: "ai" }; // Process as a single object
                    setMessages((prevMessages) => [...prevMessages, aiMessage]); // Update messages state
                    setNextQuestion(data.nextQuestion); // Set the next question

                    // If jobRole is present in the response, update job suggestions
                    if (data.jobRole) {
                        console.log("Job role:", data.jobRole);
                        setJobSuggestions([{ title: data.jobRole }]); // Update job suggestions state
                    }
                }

                setAnswers(updatedAnswers); // Update answers state after successful fetch

            } catch (error) {
                console.error("Error determining job roles:", error); // Log any errors
            }
        }
    };

    // Function to handle key presses (Enter key)
    const handleKeyDown = (event) => {
        if (event.key === "Enter") { // Check if the pressed key is Enter
            handleSend(); // Call handleSend function
        }
    };

    return (
        <div className={styles.chatContainer}> {/* Main container for the chat interface */}
            <div className={styles.chatWindow}> {/* Container for the chat messages */}
                {messages.map((msg, index) => ( // Iterate over messages array to display each message
                    <div
                        key={index} // Set a unique key for each message
                        className={`${styles.message} ${msg.sender === "user" ? styles.userMessage : styles.aiMessage}`} // Apply different styles for user and AI messages
                    >
                        {msg.text} {/* Display the message text */}
                    </div>
                ))}
            </div>
            {nextQuestion && ( // Check if there's a next question to ask
                <div className={styles.inputContainer}> {/* Container for the input field and send button */}
                    <input
                        className={styles.input} // Apply input styles
                        value={input} // Bind input value to state
                        onChange={(e) => setInput(e.target.value)} // Update state on input change
                        onKeyDown={handleKeyDown} // Handle key down events
                        placeholder="Type your message..." // Placeholder text
                    />
                    <button className={styles.sendButton} onClick={handleSend}> {/* Button to send message */}
                        Send
                    </button>
                </div>
            )}
            {jobSuggestions.length > 0 && ( // Check if there are job suggestions to display
                <div className={styles.suggestions}> {/* Container for job suggestions */}
                    <h3>Suggested Job Roles:</h3>
                    <ul>
                        {jobSuggestions.map((job, index) => ( // Iterate over job suggestions to display each one
                            <li key={index}><pre>{job.title}</pre></li> // Display job title
                        ))}
                    </ul>
                </div>
            )}
            {courses.length > 0 && ( // Check if there are related courses to display
                <div className={styles.courses}> {/* Container for related courses */}
                    <h3>Related Courses:</h3>
                    <ul>
                        {courses.map((course, index) => ( // Iterate over courses to display each one
                            <li key={index}>
                                {course.title} - {course.type} ({course.link}) {/* Display course details */}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
        </div>
    );
}

// Export the AISupport component as the default export
export default AISupport;
