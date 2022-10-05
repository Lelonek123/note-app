import React from "react";
import style from "./sideMenu.module.css";
import showMenuIcon from "./hamburgerMenu.svg";
import closeMenuIcon from "./close.svg";
import { Link } from "react-router-dom";
import { db, auth } from "../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

export default function SideMenu(props) {
    const [active, setActive] = React.useState(false);
    const [user, loading, error] = useAuthState(auth);

    return (
        <div className={`${style.sidebar} ${active ? style.active : ""}`}>
            <div className={style.sidebarHeader}>
                <button
                    onClick={() => setActive(!active)}
                    className="btn btn-primary"
                >
                    {active ? (
                        <img
                            className={style.menuButtonImg}
                            src={closeMenuIcon}
                            alt="Menu"
                        ></img>
                    ) : (
                        <img
                            className={style.menuButtonImg}
                            src={showMenuIcon}
                            alt="Menu"
                        ></img>
                    )}
                </button>
                {active ? (
                    <div className={style.headerTitle}>NoteApp</div>
                ) : null}
            </div>
            <div className={style.sidebarContent}>
                <Link to="/" className={`btn btn-primary ${style.sidebarLink}`}>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-house"
                        viewBox="0 0 16 16"
                    >
                        <path
                            fillRule="evenodd"
                            d="M2 13.5V7h1v6.5a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5V7h1v6.5a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 13.5zm11-11V6l-2-2V2.5a.5.5 0 0 1 .5-.5h1a.5.5 0 0 1 .5.5z"
                        />
                        <path
                            fillRule="evenodd"
                            d="M7.293 1.5a1 1 0 0 1 1.414 0l6.647 6.646a.5.5 0 0 1-.708.708L8 2.207 1.354 8.854a.5.5 0 1 1-.708-.708L7.293 1.5z"
                        />
                    </svg>
                    <div className={style.buttonText}>
                        {active ? "Home" : ""}
                    </div>
                </Link>
                {user ? (
                    <Link
                        to="/notes/"
                        className={`btn btn-primary btn-sm ${style.sidebarLink}`}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-stickies"
                            viewBox="0 0 16 16"
                        >
                            <path d="M1.5 0A1.5 1.5 0 0 0 0 1.5V13a1 1 0 0 0 1 1V1.5a.5.5 0 0 1 .5-.5H14a1 1 0 0 0-1-1H1.5z" />
                            <path d="M3.5 2A1.5 1.5 0 0 0 2 3.5v11A1.5 1.5 0 0 0 3.5 16h6.086a1.5 1.5 0 0 0 1.06-.44l4.915-4.914A1.5 1.5 0 0 0 16 9.586V3.5A1.5 1.5 0 0 0 14.5 2h-11zM3 3.5a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 .5.5V9h-4.5A1.5 1.5 0 0 0 9 10.5V15H3.5a.5.5 0 0 1-.5-.5v-11zm7 11.293V10.5a.5.5 0 0 1 .5-.5h4.293L10 14.793z" />
                        </svg>
                        <div className={style.buttonText}>
                            {active ? "Your Board" : ""}
                        </div>
                    </Link>
                ) : null}
            </div>
            <hr style={{ margin: "10px 0" }} />
            <div className={style.sidebarFooter}>
                <Link
                    to="/profile"
                    className={`btn btn-primary btn-sm ${style.sidebarLink}`}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-person-square"
                        viewBox="0 0 16 16"
                    >
                        <path d="M11 6a3 3 0 1 1-6 0 3 3 0 0 1 6 0z" />
                        <path d="M2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2zm12 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1v-1c0-1-1-4-6-4s-6 3-6 4v1a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12z" />
                    </svg>
                    <div className={style.buttonText}>
                        {active ? "Login" : ""}
                    </div>
                </Link>
            </div>
        </div>
    );
}
