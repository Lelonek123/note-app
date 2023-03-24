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
                <>
                    <button
                        onClick={() => {
                            logout();
                            navigate("/");
                        }}
                    >
                        LogOut
                    </button>
                </>
            ) : null}
        </>
    );
}
