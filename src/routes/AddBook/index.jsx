import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import { FormControl, InputLabel, Input, FormHelperText } from '@mui/material';
import { useNavigate  } from "react-router-dom";

//Importing Components
import Header from '../../components/Header';
import Copyright from '../../components/Copyright';

const AddBook = () => {
    const navigate = useNavigate();

    const [book_name, setBookName] = useState('');
    const [book_author, setBookAuthor] = useState('');
    const [book_borrowed_by, setBookBorrowedBy] = useState('');
    const [book_borrowed_date, setBookBorrowedDate] = useState('');
    const [book_return_date, setBookReturnDate] = useState('');

    //For posting the book data to the server
    const addBookToCloud = async (event) => {
        // 👇️ prevent page refresh
        event.preventDefault();

        try {
            let url = 'http://localhost:8080/book';
            const config = {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    "book_name": book_name,
                    "author": book_author,
                    "borrowed_by": book_borrowed_by,
                    "borrowed_date": book_borrowed_date,
                    "return_date": book_return_date
                }),
            }
            const response = await fetch(url, config)
            //const json = await response.json()
            if (response.ok) {
                //return json
                alert("Book Added to Cloud");
                navigate('/book');
                //Reset the form
                setBookName('');
                setBookAuthor('');
                setBookBorrowedBy('');
                setBookBorrowedDate('');
                setBookReturnDate('');
                //Reset the form
                return response
            } else {
                //
                alert("Error Posting the Books Data to Cloud");
            }
        } catch (error) {
            //
            console.log("Error Posting the Books Data to Cloud ==> ", error);
        }
    }
    //For posting the book data to the server

    return (
        <>
            <Header />
            <Container maxWidth="lg">
                <Box sx={{ my: 4 }}>
                    <Typography variant="h4" component="h1" gutterBottom>
                        PERN STACK Application |  <Typography variant="inherit" color={"blue"} component="span" gutterBottom>Add Books here below</Typography>
                    </Typography>
                    <Box component="div" style={{ border: "1px solid gray", borderRadius: "10px", padding: "15px" }}>
                        <form onSubmit={addBookToCloud}>
                            <FormControl fullWidth={true}>
                                <Box component={'section'} mt={2}>
                                    <Typography id="bookname" fontSize={"25px"}>Please enter book name <Typography variant="inherit" color={"red"} fontSize={"20px"} component="span">*</Typography></Typography>
                                    <Input id="bookname" value={book_name} onChange={(e) => setBookName(e.target.value)} autoComplete='Starting Out With C++ ....' placeholder='Enter a book name here please eg: Starting Out With C++ From Control Structres ....' autoFocus={true} required={true} type={"text"} fullWidth={true} />
                                </Box>
                                <Box component={'section'} mt={2}>
                                    <Typography id="author" fontSize={"25px"}>Please enter author name <Typography variant="inherit" color={"red"} fontSize={"20px"} component="span">*</Typography></Typography>
                                    <Input id="author" value={book_author} onChange={(e) => setBookAuthor(e.target.value)} autoComplete='Tonny Gaddis' placeholder='Enter a author name here please eg: Tonny Gaddis' autoFocus={false} required={true} type={"text"} aria-describedby="name" fullWidth={true} />
                                </Box>
                                <Box component={'section'} mt={2}>
                                    <Typography id="borrowedBy" fontSize={"25px"}>Borrowed By: <Typography variant="inherit" color={"green"} fontSize={"20px"} component="span">(Optional)</Typography></Typography>
                                    <Input id="borrowedBy" value={book_borrowed_by} onChange={(e) => setBookBorrowedBy(e.target.value)} autoComplete='bilal' placeholder='Bilal Mohib ...' autoFocus={false} type={"text"} aria-describedby="name" fullWidth={true} />
                                </Box>
                                <Box component={'section'} mt={2}>
                                    <Typography id="name" fontSize={"25px"}>Borrow Date <Typography variant="inherit" color={"red"} fontSize={"20px"} component="span">*</Typography></Typography>
                                    <Input id="name" value={book_borrowed_date} onChange={(e) => setBookBorrowedDate(e.target.value)} autoComplete='2022-4-21' placeholder='YY-MM-DD eg: 2019-01-21' autoFocus={false} required={true} type={"text"} aria-describedby="name" fullWidth={true} />
                                </Box>
                                <Box component={'section'} mt={2}>
                                    <Typography id="name" fontSize={"25px"}>Return Date <Typography variant="inherit" color={"red"} fontSize={"20px"} component="span">*</Typography></Typography>
                                    <Input id="name" value={book_return_date} onChange={(e) => setBookReturnDate(e.target.value)} autoComplete='2022-4-21' placeholder='YY-MM-DD eg: 2022-07-30' autoFocus={false} required={true} type={"text"} aria-describedby="name" fullWidth={true} />
                                </Box>

                                <Box component={'section'} mt={2}>
                                    {(book_name !== "" && book_author !== "" && book_borrowed_date !== "" && book_return_date !== "") ? (
                                        <>
                                            <Typography variant="inherit" color={"green"} fontSize={"20px"} component="p" mb={2}>You are now ready to Add Book to the Store</Typography>
                                            <Button
                                                type="submit"
                                                variant="contained"
                                                color="primary"
                                            >
                                                Add Book
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
                                                Add Book
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
export default AddBook;