import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, logout } from "../../../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";
import style from "./Dashboard.module.css";

export default function Dashboard(props) {
    const [user, loading, error] = useAuthState(auth);
    const navigate = useNavigate();

    React.useEffect(() => {
        if (loading) return;
        if (!user) navigate("/login");
    }, [user, loading]);

    return (
        <>
            {user ? (
                <div className={style.content}>
                    <div className={`${style.info}`}>
                        <div className={`${style.username} ${style.row}`}>
                            <div className={`${style.key}`}>Username</div>
                            <div className={`${style.value}`}>lelon</div>
                        </div>
                        <div className={`${style.username} ${style.row}`}>
                            <div className={`${style.key}`}>Email</div>
                            <div className={`${style.value}`}>lelon@wp.pl</div>
                        </div>
                        <form className={`${style.passwordForm} ${style.row}`}>
                            <p>Update password</p>
                            <label htmlFor="oldPassword">Old password</label>
                            <input type="password" id="oldPassword"></input>
                            <label htmlFor="oldPassword">New password</label>

                            <input type="password" id="newPassword"></input>
                            <label htmlFor="oldPassword">
                                Confirm new password
                            </label>

                            <input
                                type="password"
                                id="newPasswordConfirm"
                            ></input>
                            <button className={`btn btn-primary`}>
                                Update
                            </button>
                        </form>
                        <div className={`${style.row}`}>
                            <button
                                className={`${style.logoutButton} btn btn-danger`}
                                onClick={() => {
                                    logout();
                                    navigate("/");
                                }}
                            >
                                LogOut
                            </button>
                        </div>
                    </div>
                </div>
            ) : (
                <div className={`${style.spinnerContainer}`}>
                    <div
                        className="spinner-border text-secondary"
                        role="status"
                    >
                        <span className="sr-only"></span>
                    </div>
                </div>
            )}
        </>
    );
}
