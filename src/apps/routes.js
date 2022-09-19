import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Notes from "./noteApp/components/Notes.js";

export default function NoteAppRoutes() {
    return (
        <Routes>
            <Route path="/" element={<p>home</p>} />
            <Route path="notes/*" element={<Notes />} />
        </Routes>
    );
}
