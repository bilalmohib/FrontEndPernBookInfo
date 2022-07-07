import React from 'react';

import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";

import Home from "../routes/Home/index.jsx";
import Expenses from "../routes/Expenses/index.jsx";
import Invoices from '../routes/Invoices/index.jsx';
import AddBook from '../routes/AddBook/index.jsx';

const AppRouter = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/expenses" element={<Expenses />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/addbook" element={<AddBook />} />
            </Routes>
        </BrowserRouter>
    )
}
export default AppRouter;