import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import { useNavigate } from "react-router-dom";

//Importing Components
import Header from '../../components/Header';
import Copyright from '../../components/Copyright';

const AddStudent = () => {
    const navigate = useNavigate();

    const [first_name, setFirstName] = useState('');
    const [last_name, setLastName] = useState('');
    const [profile_picture, setProfilePicture] = useState('');

    const postToCloud = async (event) => {
        // 👇️ prevent page refresh
        event.preventDefault();

        try {
            let url = 'http://localhost:8080/student';
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "first_name": first_name,
                    "last_name": last_name,
                    "profile_picture": profile_picture
                }),
            }
            const response = await fetch(url, config)
            //const json = await response.json()
            if (response.ok) {
                //return json
                alert("Student Added to Cloud");
                navigate('/student');
                //Reset the form
                setFirstName('');
                setLastName('');
                setProfilePicture('');
                //Reset the form
                return response
            } else {
                //
                alert("Error Posting the Students Data to Cloud");
            }
        } catch (error) {
            //
            console.log("Error Posting the Students Data to Cloud ==> ", error);
        }
    }

    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        PERN STACK Application |  <Typography variant="inherit" color={"lightgreen"} component="span" gutterBottom>Add Students here below</Typography>
                    </Typography>
                    <Box component="div" style={{ border: "1px solid gray", borderRadius: "10px", padding: "15px" }}>
                        <form onSubmit={postToCloud}>
                            <FormControl fullWidth={true}>
                                <Box component={'section'} mt={2}>
                                    <Typography id="firstname" fontSize={"25px"}>Please enter your first name <Typography variant="inherit" color={"red"} fontSize={"20px"} component="span">*</Typography></Typography>
                                    <Input id="firstname" value={first_name} onChange={(e) => setFirstName(e.target.value)} autoComplete='Ammar' placeholder='Enter your first name here eg: Ammar' autoFocus={true} required={true} type={"text"} fullWidth={true} />
                                </Box>
                                <Box component={'section'} mt={2}>
                                    <Typography id="lastname" fontSize={"25px"}>Please enter your last name <Typography variant="inherit" color={"red"} fontSize={"20px"} component="span">*</Typography></Typography>
                                    <Input id="name" value={last_name} onChange={(e) => setLastName(e.target.value)} autoComplete='Mohib' placeholder='Enter your last name here eg: Mohib' autoFocus={false} required={true} type={"text"} aria-describedby="lastname" fullWidth={true} />
                                </Box>
                                <Box component={'section'} mt={2}>
                                    <Typography id="profilepicture" fontSize={"25px"}>Enter the profile picture url: <Typography variant="inherit" color={"green"} fontSize={"20px"} component="span">(Optional)</Typography></Typography>
                                    <Input id="profilepicture" value={profile_picture} onChange={(e) => setProfilePicture(e.target.value)} autoComplete='https://image.png' placeholder='Image url i.e https://image.png ...' autoFocus={false} type={"text"} aria-describedby="picture" fullWidth={true} />
                                </Box>

                                <Box component={'section'} mt={2}>
                                    {(first_name !== "" && last_name !== "" && profile_picture !== "") ? (
                                        <>
                                            <Typography variant="inherit" color={"green"} fontSize={"20px"} component="p" mb={2}>You are now ready to Add Student to the Database Record</Typography>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Add Student
                                            </Button>
                                        </>
                                    ) : (
                                        <>
                                            <Typography mb={2} variant="inherit" color={"red"} fontSize={"20px"} component="p">Please fill all the fields with * sign to submit</Typography>
                                            <Button
                                                disabled={true}
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Add Student
                                            </Button>
                                        </>
                                    )}
                                </Box>
                            </FormControl>
                        </form>
                    </Box>
                    <br />
                    <Copyright />
                </Box>
            </Container>
        </>
    );
}
export default AddStudent;