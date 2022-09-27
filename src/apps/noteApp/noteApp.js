import React from "react";
import WrapperWithSideMenu from "../../components/wrapperWithSideMenu/wrapperWithSideMenu.js";
import NoteAppRoutes from "../routes.js";
import { BrowserRouter as Router } from "react-router-dom";
export default function NoteApp() {
    return (
        <WrapperWithSideMenu>
            <NoteAppRoutes />
        </WrapperWithSideMenu>
    );
}
