import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./ITIndustry.module.css";

function ITIndustry() {
    const [roles, setRoles] = useState([]);
    const navigate = useNavigate();
    // fetch job roles from the backend server
    useEffect(() => {
        const fetchRoles = async () => {
            try {
                // const response = await fetch("https://backend-server-url/roles");
                // const data = await response.json();
                // Fetch role data from the backend or use static data
                const data = [
                    {
                        "id": 1,
                        "title": "Software Developer",
                        "description": "Develop software applications and programs.",
                        "salary": "$85,000",
                        "courses": ["Course A", "Course B", "Course C"]
                    },
                    {
                        "id": 2,
                        "title": "Data Scientist",
                        "description": "Analyze and interpret complex digital data.",
                        "salary": "$95,000",
                        "courses": ["Course X", "Course Y", "Course Z"]
                    }
                ];
                setRoles(data);
            } catch (error) {
                console.error("Error fetching roles:", error);
            }
        };

        fetchRoles();
    }, []);
    // function to handle the card click
    const handleCardClick = (id) => {
        // navigate to the role details page
        navigate(`/roles/${id}`);
    };

    return (
        // Display the job roles as cards
        <div className={styles.container}>
            {/* Display a loading message if the roles are not fetched yet */}
            {roles.map((role) => (
                <div key={role.id} className={styles.card} onClick={() => handleCardClick(role.id)}>
                    <div className={styles.cardTitle}>{role.title}</div>
                </div>
            ))}
        </div>
    );
}

export default ITIndustry;
