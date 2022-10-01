import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notes from "./noteApp/components/Notes.js";
import Dashboard from "./noteApp/components/dashboard/Dashboard.js";
import Home from "./noteApp/components/home/Home.js";

export default function NoteAppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<Home />} />
            <Route path="notes/*" element={<Notes />} />
            <Route path="profile/*" element={<Dashboard />} />
        </Routes>
    );
}
