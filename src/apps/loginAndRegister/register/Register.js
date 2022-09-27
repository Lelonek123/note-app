import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, registerWithEmailAndPassword } from "../../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import style from "./Register.module.css";

export default function Login(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [password2, setPassword2] = React.useState("");
    const [user, loading, error] = useAuthState(auth);
    const [username, setUsername] = React.useState("");
    const navigate = useNavigate();

    const registerHandler = () => {
        if (password !== password2) {
            alert("Passwords must be the same");
        } else if (!username) {
            alert("Please enter a username");
        } else {
            registerWithEmailAndPassword(username, email, password);
        }
    };

    React.useEffect(() => {
        if (loading) return;
        if (user) navigate("/profile");
    }, [user, loading]);

    return (
        <div className={style.fullscreen}>
            <form className={style.formContainer}>
                <div className="form-outline mb-4">
                    <input
                        type="text"
                        id="username"
                        className="form-control"
                        placeholder="Username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                    <label className="form-label" htmlFor="username">
                        Username
                    </label>
                </div>
                <div className="form-outline mb-4">
                    <input
                        type="email"
                        id="email"
                        className="form-control"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <label className="form-label" htmlFor="email">
                        Email address
                    </label>
                </div>
                <div className="form-outline mb-4">
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <label className="form-label" htmlFor="password">
                        Password
                    </label>
                </div>
                <div className="form-outline mb-4">
                    <input
                        type="password"
                        id="password"
                        className="form-control"
                        placeholder="Password"
                        value={password2}
                        onChange={(e) => setPassword2(e.target.value)}
                    />
                    <label className="form-label" htmlFor="password">
                        Repeat Password
                    </label>
                </div>
                <button
                    type="button"
                    className="btn btn-primary btn-block mb-4"
                    onClick={registerHandler}
                >
                    Register
                </button>
                <div className="text-center">
                    <span style={{ marginRight: "10px" }}>
                        Already have an account?
                    </span>
                    <Link to="/login">LogIn</Link>
                </div>
            </form>
        </div>
    );
}
