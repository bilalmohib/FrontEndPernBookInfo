import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';

//Importing Components
import Header from '../../components/Header';
import Copyright from '../../components/Copyright';

const Home = () => {
    const [merchants, setMerchants] = useState([]);

    useEffect(() => {
        console.log("The Merchants Full Data is: " + merchants);
    });

    useEffect(() => {
        getMerchant();
    }, [merchants]);

    function getMerchant() {
        fetch('http://localhost:3001/')
            .then(response => {
                return response.text();
            })
            .then(data => {
                setMerchants(data);
            });
    }

    function createMerchant() {
        let name = prompt('Enter merchant name');
        let email = prompt('Enter merchant email');
        fetch('http://localhost:3001/merchants', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ name, email }),
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getMerchant();
            });
    }

    function deleteMerchant() {
        let id = prompt('Enter merchant id');
        fetch(`http://localhost:3001/merchants/1`, {
            method: 'DELETE',
        })
            .then(response => {
                return response.text();
            })
            .then(data => {
                alert(data);
                getMerchant();
            });
    }

    return (
        <>
            <Header />
            <img src="/cover.jpg" alt="Cover" width={"100%"} height={"300px"} />
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        PERN STACK Application |  <Typography variant="inherit" color={"orange"} component="span" gutterBottom>Select The Data You want to View/Edit</Typography>
                    </Typography>

                    <Box component={"section"} display={"flex"} flexDirection={"row"} justifyContent={"space-evenly"}>
                        <Link style={{ textDecoration: "none" }} to="/book">
                            <Button variant="contained" color="warning" size={"large"}>View/Edit Book's Data</Button>
                        </Link>
                        <Link style={{ textDecoration: "none" }} to="/student">
                            <Button variant="contained" color="secondary" size={"large"}>View/Edit Student's Data</Button>
                        </Link>
                    </Box>

                    <br />
                    <hr />
                    <br />

                    <Typography variant="h4" component="h1" gutterBottom>
                        PERN STACK Application | <Typography variant="inherit" color={"darkgreen"} component="span" gutterBottom>Select The Data You want to ADD</Typography>
                    </Typography>

                    <Box component={"section"} display={"flex"} flexDirection={"row"} justifyContent={"space-evenly"}>
                        <Link style={{ textDecoration: "none" }} to="/addbook">
                            <Button variant="contained" color="info" size={"large"}>ADD Book's Data</Button>
                        </Link>
                        <Link style={{ textDecoration: "none" }} to="/addstudent">
                            <Button variant="contained" color="success" size={"large"}>ADD Student's Data</Button>
                        </Link>
                    </Box>

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
export default Home;