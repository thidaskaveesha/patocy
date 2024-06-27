import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styles from "./Counselors.module.css";
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import imagec from "../assets/Consultant.png";
import imageb from "../assets/consultant female 2.png";
import imagea from "../assets/consultant male 1.png";
import imaged from "../assets/consultant female 3.png";
import Box from '@mui/material/Box';



function Counselors() {
    const [counselors, setcounselor] = useState([]);
    const navigate = useNavigate();
    // fetch counselors from the backend server
    useEffect(() => {
    const fetchData = async () => {
        try {
            // const response = await fetch("https://backend-server-url/cosultants");
            // const data = await response.json();
            // Simulating fetching data:
            const data = [
                {
                    "id": 1,
                    "name": "Bela Novad",
                    "title" : "CISSP - Cybersecurity Analyst",
                    "imageUrl": imagec
                    
                },
                {
                    "id": 2,
                    "name": "Sarah Moore",
                    "title" : "B. Sc. - Front-End Development Lead",
                    "imageUrl" : imageb,
                },
                {
                    "id": 3,
                    "name": "Steven Walker",
                    "title" : "ITIL Cerified - IT Consultant",
                    "imageUrl" : imagea,
                },
                {
                    "id": 4,
                    "name": "Eda yildiz",
                    "title": "B. Sc. - Computer scientist",
                    "imageUrl": imaged,

                },
               
                
            ];
            setcounselor(data);
        } catch (error) {
            console.error("Error fetching counselors:", error);
        }
    };

    fetchData(); // Call fetchData immediately

    // useEffect should not return anything other than a clean-up function or nothing
    // Since we don't need to clean up anything in this case, we don't return anything
}, []); // Empty dependency array to run only once on component mount

    // function to handle the card click
    const handleCardClick = (id) => {
        // navigate to the role details page
        navigate(`/cosultant/${id}`);
    };

    return (
        // Display the job roles as cards
    
        <div className = {styles.cardContainer}>
            {/* Display a loading message if the roles are not fetched yet */}
            {counselors.map((counselor) => (
                <div className={styles.cardBackground}
                    key={counselor.id}
                    onclick={() => handleCardClick(counselor.id)}>
            
   
                    <Card  sx={{ maxWidth: 300,
                     }}>
                        <CardMedia
                            component="img"
                            height="140"
                            image={counselor.imageUrl}
                            alt={counselor.name}
                        />
                         <CardContent>
                            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 'bold' }}>
                                {counselor.name}
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                {counselor.title}
                            </Typography>
                        </CardContent>
                        <CardActions>
                             <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%' }}></Box>
                            <Button size="small" variant="contained" color="primary" onClick="handleButtonClick">
                                Book</Button>
                            
                        </CardActions>
                    </Card>
                    
                </div>
            ))}
                     
       </div>
    );
}

export default Counselors;
