import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import NoteApp from "./apps/noteApp/noteApp.js";
import Login from "./apps/loginAndRegister/login/Login.js";
import Register from "./apps/loginAndRegister/register/Register.js";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/*" element={<NoteApp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </Router>
    );
}

export default App;
