import React, { useState, useEffect } from 'react';
import Container from '@mui/material/Container';
import { Button } from '@mui/material';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import CircularProgress from '@mui/material/CircularProgress';
import { TextField } from "@mui/material";
import { Link } from 'react-router-dom';

const BookList = (props) => {
    const { id, book_name, author, borrowed_by, borrowed_date, return_date, book, setBook } = props;

    // id={v.id}
    // book_name={v.book_name}
    // author={v.author}
    // borrowed_by={v.borrowed_by}
    // borrowed_date={v.borrowed_date}
    // return_date={v.return_date}
    // book={book}
    // setBook={setBook}

    const [edit, setEdit] = useState(false);

    //For Editing Book Data
    const [currentBookName, setCurrentBookName] = useState(book_name);
    const [currentBookAuthor, setCurrentBookAuthor] = useState(author);
    const [currentBookBorrowedBy, setCurrentBookBorrowedBy] = useState(borrowed_by);
    const [currentBookBorrowedDate, setCurrentBookBorrowedDate] = useState(borrowed_date);
    const [currentBookReturnDate, setCurrentBookReturnDate] = useState(return_date);

    //Methods
    const triggerUpdateToCloud = (uniqueId) => {
        if (currentBookName !== "" && currentBookAuthor !== "" && currentBookBorrowedBy !== "" && currentBookBorrowedDate !== "" && currentBookReturnDate !== "") {
            fetch(`http://localhost:8080/book/${uniqueId}`, {
                method: "PUT",
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    book_name: currentBookName,
                    author: currentBookAuthor,
                    borrowed_by: currentBookBorrowedBy,
                    borrowed_date: currentBookBorrowedDate,
                    return_date: currentBookReturnDate
                })
            }).then(response => {
                return response.text();
            }
            ).then(data => {
                alert(`Book Data Updated Successfully with ID: ${uniqueId}`);
                console.log(data);
                let tempList = []
                for (let i = 0; i < book.length; i++) {
                    let tempObj = book[i];
                    if (book[i].id === uniqueId) {
                        tempObj = { ...tempObj, book_name: currentBookName, author: currentBookAuthor, borrowed_by: currentBookBorrowedBy, borrowed_date: currentBookBorrowedDate, return_date: currentBookReturnDate }
                    }
                    tempList.push(tempObj);
                }
                setEdit(false);
                setBook(tempList);
            }).catch(err => {
                alert("Error Updating the data");
                console.log("Error Updating the data", err);
            });
        }
        else {
            alert("Please enter some value to update");
        }
    }

    const deleteBook = async uniqueId => {
        if (window.confirm(`Are you sure you want to delete this book with id=${uniqueId}?`)) {
            await fetch(`http://localhost:8080/book/${uniqueId}`, {
                method: 'DELETE'
            }).then(response => {
                return response.text();
            }).then(data => {
                alert("Book Deleted Successfully With Id: " + uniqueId);
                setBook(book.filter(b => b.id !== uniqueId));
            }).catch(err => {
                alert("Error Deleting the book");
                console.log("Error Deleting the book", err);
            });
        }
    }

    return (
        <Box component={"div"} boxShadow={"rgba(99, 99, 99, 0.2) 0px 2px 8px 0px;"} style={{ background: "linear-gradient(to right, #000046, #1CB5E0)" }} borderRadius={2} padding={"1.5rem"} mt={"2rem"}>
            <Typography color={"white"} variant="h5" component="h5" gutterBottom><b>Book Id: </b>{id}</Typography>

            <Typography color={"white"} variant="h5" component="h5" gutterBottom><b>Book Name: </b>
                {(edit) ? (
                    <>
                        <TextField
                            style={{ background: "transparent", color: "white" }}
                            placeholder="book name"
                            inputProps={{ style: { color: "white" } }}
                            type={"text"}
                            value={currentBookName} onChange={(e) => setCurrentBookName(e.target.value)}
                            variant="standard"
                        />
                    </>
                ) : (
                    <>
                        {book_name}
                    </>
                )}

            </Typography>
            <Typography color={"white"} variant="h5" component="h5" gutterBottom><b>Book Author: </b>
                {(edit) ? (
                    <>
                        <TextField
                            style={{ background: "transparent", color: "white" }}
                            placeholder="book Author"
                            inputProps={{ style: { color: "white" } }}
                            type={"text"}
                            value={currentBookAuthor} onChange={(e) => setCurrentBookAuthor(e.target.value)}
                            variant="standard"
                        />
                    </>
                ) : (
                    <>
                        {author}
                    </>
                )}
            </Typography>
            <Typography color={"white"} variant="h5" component="h5" gutterBottom><b>Book borrowed by: </b>
                {(edit) ? (
                    <>
                        <TextField
                            style={{ background: "transparent", color: "white" }}
                            placeholder="book borrowed by"
                            inputProps={{ style: { color: "white" } }}
                            type={"text"}
                            value={currentBookBorrowedBy} onChange={(e) => setCurrentBookBorrowedBy(e.target.value)}
                            variant="standard"
                        />
                    </>
                ) : (
                    <>
                        {borrowed_by}
                    </>
                )}

            </Typography>
            <Typography color={"white"} variant="h5" component="h5" gutterBottom><b>Borrowed date: </b>
                {(edit) ? (
                    <>
                        <TextField
                            style={{ background: "transparent", color: "white" }}
                            placeholder="borrowed date"
                            inputProps={{ style: { color: "white" } }}
                            type={"text"}
                            value={currentBookBorrowedDate} onChange={(e) => setCurrentBookBorrowedDate(e.target.value)}
                            variant="standard"
                        />
                    </>
                ) : (
                    <>
                        {borrowed_date}
                    </>
                )}
            </Typography>
            <Typography color={"white"} variant="h5" component="h5" gutterBottom><b>Return date: </b>
                {(edit) ? (
                    <>
                        <TextField
                            style={{ background: "transparent", color: "white" }}
                            placeholder="book return date"
                            inputProps={{ style: { color: "white" } }}
                            type={"text"}
                            value={currentBookReturnDate} onChange={(e) => setCurrentBookReturnDate(e.target.value)}
                            variant="standard"
                        />
                    </>
                ) : (
                    <>
                        {return_date}
                    </>
                )}
            </Typography>

            <Box display="flex" flexDir="row" justifyContent="space-evenly">
                {(edit) ? (
                    <Button variant="contained" color="success" size={"large"} onClick={() => triggerUpdateToCloud(id)}>Update</Button>
                ) : (
                    <Button variant="contained" color="warning" size={"large"} onClick={() => setEdit(true)}>Edit</Button>
                )}

                <Button variant="contained" color="error" size={"large"} onClick={() => deleteBook(id)}>Delete</Button>
            </Box>
        </Box>
    )
}
export default BookList;