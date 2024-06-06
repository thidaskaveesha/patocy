import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styles from "./RoleDetails.module.css"; // Import the CSS module

function RoleDetail() {
    const { id } = useParams();
    const [role, setRole] = useState(null);

    useEffect(() => {
        const fetchRole = async () => {
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

                // Find the role with the matching id
                const selectedRole = data.find(role => role.id === parseInt(id));

                // Set the role state to the selected role
                setRole(selectedRole);
            } catch (error) {
                console.error("Error fetching role:", error);
            }
        };

        fetchRole();
    }, [id]);

    if (!role) {
        return <div>Loading...</div>;
    }

    return (
        <div className={styles.container}> {/* Apply container class */}
            <h1 className={styles.title}>{role.title}</h1> {/* Apply title class */}
            <p className={styles.description}>Description: {role.description}</p> {/* Apply description class */}
            <p className={styles.salary}>Salary: {role.salary}</p> {/* Apply salary class */}
            <h2>Courses</h2>
            <ul>
                {role.courses.map((course, index) => (
                    <li key={index}>{course}</li>
                ))}
            </ul>
        </div>
    );
}

export default RoleDetail;
