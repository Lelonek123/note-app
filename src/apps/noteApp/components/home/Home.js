import React from "react";
import style from "./Home.module.css";
import HomePage from "./homePage/HomePage.js";
import LandingPage from "./landingPage/LandingPage.js";
import { db, auth } from "../../../../firebase.js";
import { useAuthState } from "react-firebase-hooks/auth";

export default function Home(props) {
    const [user, loading, error] = useAuthState(auth);

    return <>{user ? <HomePage /> : <LandingPage />}</>;
}
