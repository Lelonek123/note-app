import React from "react";
import style from "./LandingPage.module.css";
import NoteCard from "../../noteCard/noteCard.js";
import EditNotePanel from "../../editNotePanel/editNotePanel.js";
import logo from "./logo.png";
import { Link } from "react-router-dom";

const exampleNote = {
    id: "example",
    title: "Example Note",
    content: "Click to edit...",
    tags: ["Tag"],
    lastEditedTimestamp: Date.now(),
};

export default function LandingPage(props) {
    // TODO: register and save, description
    const [state, dispatch] = React.useReducer(
        editorReducer,
        {},
        editorReducerInit
    );

    React.useEffect(() => {
        // JSON parse
    }, []);

    return (
        <>
            <div className={`${style.curvedBackground}`}>
                <div className={`${style.whiteStrip}`}></div>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1440 320">
                    <path
                        fill="#ebebeb"
                        fillOpacity="1"
                        d="M0,256L48,234.7C96,213,192,171,288,165.3C384,160,480,192,576,202.7C672,213,768,203,864,186.7C960,171,1056,149,1152,122.7C1248,96,1344,64,1392,48L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
                    ></path>
                </svg>
            </div>
            <div className={`${style.mainContainer}`}>
                <div className={`${style.innerContainer}`}>
                    <div className={`${style.demoContainer}`}>
                        <div className={`${style.logoContainer}`}>
                            <img
                                src={logo}
                                alt="Logo"
                                style={{ width: "175px", height: "175px" }}
                            />
                        </div>
                        <p className={`${style.appTitle}`}>NoteApp</p>
                        <div className={`${style.cardContainer}`}>
                            <NoteCard
                                onEdit={() =>
                                    dispatch({ type: "open", note: state.note })
                                }
                                onDelete={() => {
                                    dispatch({
                                        type: "save",
                                        note: exampleNote,
                                    });
                                }}
                                {...state.note}
                                editor={state.active}
                                deleteButtonActive={true}
                            />
                        </div>
                    </div>
                    <div className={`${style.loginButtonsContainer}`}>
                        <Link
                            className={`btn btn-light ${style.button}`}
                            to="/register"
                        >
                            Register and save
                        </Link>
                        <p>or</p>
                        <Link
                            className={`btn btn-light ${style.button}`}
                            to="/login"
                        >
                            LogIn
                        </Link>
                    </div>
                    <div className={`${style.descriptionSection}`}>
                        <p>
                            {`This is a simple note taking app. Click the demo
                            card above to try it out. You can create
                            online account, save your notes in the cloud and acces
                            them from different devices. It was build using
                            React - frontend JS freamwork, styling was done in 
                            vanilla CSS and Bootstrap. Backend is powered by
                            Firebase.`}
                        </p>
                    </div>
                </div>
            </div>
            {state.active ? (
                <EditNotePanel note={state.note} dispatch={dispatch} />
            ) : null}
        </>
    );
}

function editorReducer(state, action) {
    let newState = { ...state };

    switch (action.type) {
        case "open":
            newState.active = true;
            newState.note = action.note;
            break;
        case "close":
            newState.active = false;
            break;
        case "save":
            newState.note = action.note;
            window.sessionStorage.setItem(
                "note",
                JSON.stringify(newState.note)
            );
            break;
        default:
            throw new Error("Invalid reducer action");
    }
    return newState;
}

const editorReducerInit = () => {
    const note = JSON.parse(window.sessionStorage.getItem("note"));
    if (note !== null) {
        return {
            active: false,
            note: note,
        };
    }
    return {
        active: false,
        note: exampleNote,
    };
};
