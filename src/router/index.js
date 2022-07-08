import React from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Home from "../routes/Home/index.jsx";
import AddBook from '../routes/AddBook/index.jsx';
import AddStudent from '../routes/AddStudent/index.jsx';
import Book from '../routes/Book/index.jsx';
import Student from '../routes/Student/index.jsx';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/addbook" element={<AddBook />} />
                <Route path="/addstudent" element={<AddStudent />} />
                <Route path="/book" element={<Book />} />
                <Route path="/student" element={<Student />} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter;