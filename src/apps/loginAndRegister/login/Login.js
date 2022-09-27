import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logInWithEmailAndPassword } from "../../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import style from "./Login.module.css";

export default function Login(props) {
    const [email, setEmail] = React.useState("");
    const [password, setPassword] = React.useState("");
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    const loginHandler = () => {
        logInWithEmailAndPassword(email, password);
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
                <div className="row mb-4">
                    <div className="col d-flex justify-content-center">
                        <div className="form-check">
                            <input
                                className="form-check-input"
                                type="checkbox"
                                value=""
                                id="remember"
                                checked
                                readOnly
                            />
                            <label
                                className="form-check-label"
                                htmlFor="remember"
                            >
                                {" "}
                                Remember me{" "}
                            </label>
                        </div>
                    </div>
                    <div className="col">
                        <Link to="/reset">Forgot password?</Link>
                    </div>
                </div>
                <button
                    type="button"
                    className="btn btn-primary btn-block mb-4"
                    onClick={loginHandler}
                >
                    Sign in
                </button>
                <div className="text-center">
                    <span style={{ marginRight: "10px" }}>Not a member?</span>
                    <Link to="/register">Register</Link>
                </div>
            </form>
        </div>
    );
}
