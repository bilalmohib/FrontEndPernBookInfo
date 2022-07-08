import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField } from "@mui/material";
import { Link } from 'react-router-dom';

const StudentList = (props) => {
    const { id, first_name, last_name, profile_picture, student, setStudent } = props;

    // first_name = { v.first_name }
    // last_name = { v.last_name }
    // profile_picture = { v.profile_picture }
    // student = { student }
    // setStudent = { setStudent }

    const [edit, setEdit] = useState(false);

    //For Editing Student Data
    const [currentFirstName, setCurrentFirstName] = useState(first_name);
    const [currentLastName, setCurrentLastName] = useState(last_name);
    const [currentProfilePicture, setCurrentProfilePicture] = useState(profile_picture);

    //Methods
    const triggerUpdateToCloud = (uniqueId) => {
        if (currentFirstName !== "" && currentLastName !== "" && currentProfilePicture !== "") {
            fetch(`http://localhost:8080/student/${uniqueId}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    first_name: currentFirstName,
                    last_name: currentLastName,
                    profile_picture: currentProfilePicture
                })
            }).then(response => {
                return response.text();
            }
            ).then(data => {
                alert(`Student Data Updated Successfully with ID: ${uniqueId}`);
                console.log(data);
                let tempList = []
                for (let i = 0; i < student.length; i++) {
                    let tempObj = student[i];
                    if (student[i].id === uniqueId) {
                        tempObj = { ...tempObj, first_name: currentFirstName, last_name: currentLastName, profile_picture: currentProfilePicture }
                    }
                    tempList.push(tempObj);
                }
                setEdit(false);
                setStudent(tempList);
            }).catch(err => {
                alert("Error Updating the Students data");
                console.log("Error Updating the Students data", err);
            });
        }
        else {
            alert("Please enter some value to update. Empty value is not allowed");
        }
    }

    const deleteStudent = async uniqueId => {
        if (window.confirm(`Are you sure you want to delete this student record with id=${uniqueId}?`)) {
            await fetch(`http://localhost:8080/student/${uniqueId}`, {
                method: 'DELETE'
            }).then(response => {
                return response.text();
            }).then(data => {
                alert("Student Deleted Successfully With Id: ", uniqueId);
                setStudent(student.filter(s => s.id !== uniqueId));
            }).catch(err => {
                alert(`Error Deleting the Student with id=${uniqueId}`);
                console.log(`Error Deleting the Student with id=${uniqueId}`, err);
            });
        }
    }

    return (
        <Box component={"div"} boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"} style={{ background: "linear-gradient(to right, #000046, #1CB5E0)" }} borderRadius={2} padding={"1.5rem"} textAlign={"center"} mt={"2rem"}>
            <Typography color={"white"} variant="h5" component="h5" gutterBottom><b>Student Id: </b>{id}</Typography>

            <Typography color={"white"} variant="h5" component="h5" gutterBottom>
                {(edit) ? (
                    <>
                        <TextField
                            style={{ background: "transparent", color: "white" }}
                            placeholder="Profile Picture"
                            inputProps={{ style: { color: "white" } }}
                            type={"text"}
                            value={currentProfilePicture} onChange={(e) => setCurrentProfilePicture(e.target.value)}
                            variant="standard"
                        />
                    </>
                ) : (
                    <>
                        <img src={profile_picture} alt="profile_picture" loading="lazy" style={{ width: "100px", height: "100px", borderRadius: "50px", marginTop: "0.3rem" }} />
                    </>
                )}
            </Typography>
            <Typography color={"white"} variant="h5" component="h5" gutterBottom><b>First Name: </b>
                {(edit) ? (
                    <>
                        <TextField
                            style={{ background: "transparent", color: "white" }}
                            placeholder="first name"
                            inputProps={{ style: { color: "white" } }}
                            type={"text"}
                            value={currentFirstName} onChange={(e) => setCurrentFirstName(e.target.value)}
                            variant="standard"
                        />
                    </>
                ) : (
                    <>
                        {first_name}
                    </>
                )}

            </Typography>
            <Typography color={"white"} variant="h5" component="h5" gutterBottom><b>Last Name: </b>
                {(edit) ? (
                    <>
                        <TextField
                            style={{ background: "transparent", color: "white" }}
                            placeholder="Last Name"
                            inputProps={{ style: { color: "white" } }}
                            type={"text"}
                            value={currentLastName} onChange={(e) => setCurrentLastName(e.target.value)}
                            variant="standard"
                        />
                    </>
                ) : (
                    <>
                        {last_name}
                    </>
                )}
            </Typography>

            <br />

            <Box display="flex" flexDir="row" style={{ width: "25%", margin: "0 auto" }} justifyContent="space-between">
                {(edit) ? (
                    <Button variant="contained" color="success" size={"large"} onClick={() => triggerUpdateToCloud(id)}>Update</Button>
                ) : (
                    <Button variant="contained" color="warning" size={"large"} onClick={() => setEdit(true)}>Edit</Button>
                )}

                <Button variant="contained" color="error" size={"large"} onClick={() => deleteStudent(id)}>Delete</Button>
            </Box>
        </Box>
    )
}
export default StudentList;