import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField } from "@mui/material";
import { Link } from 'react-router-dom';

//Importing Components
import Header from '../../components/Header';
import StudentList from '../../components/Student/StudentList';
import Copyright from '../../components/Copyright';

const Student = () => {
    const [student, setStudent] = useState([]);
    const [status, setStatus] = useState(false);

    useEffect(() => {
        console.log("The All Students Data is ==> ", student);
    });

    useEffect(() => {
        getStudents();
    }, []);

    function getStudents() {
        fetch('http://localhost:8080/student')
            .then(response => {
                return response.text();
            })
            .then(data => {
                let parsedData = JSON.parse(data);
                console.log("The Parsed Student Data is ==> ", parsedData);
                setStudent(parsedData);
                setStatus(true);
            }).catch(err => {
                console.log("Error While Fetching Student Table Data ==>", err);
            });
    }

    return (
        <>
            <Header />
            <img src="/cover.jpg" alt="Cover" width={"100%"} height={"300px"} />
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        PERN STACK Application |  <Typography variant="inherit" color={"lightgreen"} component="span" gutterBottom>View/Edit or Delete the Students Data here</Typography>
                    </Typography>

                    {(status) ? (
                        <>
                            {
                                student.map((v, i) => {
                                    return (
                                        <Box key={i}>
                                            <StudentList
                                                id={v.id}
                                                //passing prop values to be displayed
                                                first_name={v.first_name}
                                                last_name={v.last_name}
                                                profile_picture={v.profile_picture}
                                                //passing student data to update it when an update is triggered
                                                student={student}
                                                setStudent={setStudent}
                                            />
                                        </Box>
                                    )
                                })
                            }
                        </>
                    ) : (
                        <Box alignItems={"center"} textAlign={"center"} component={"div"}>
                            <br />
                            <Typography variant="h5" component="h5" textAlign={"center"} gutterBottom>....Data is being Loaded Please wait</Typography>
                            <br />
                            <CircularProgress size={"5rem"} />
                        </Box>
                    )}

                    <br />
                    <br />

                </Box>
            </Container>
            <hr />
            <br />
            <Copyright />
            <br />
        </>
    );
}
export default Student;