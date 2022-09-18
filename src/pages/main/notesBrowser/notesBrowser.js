import React from "react";
import style from "./notesBrowser.module.css";
import NoteCard from "./noteCard/noteCard.js";
import SearchBar from "../../../components/searchBar/searchBar.js";
import EditNotePanel from "./editNotePanel/editNotePanel.js";
import { Routes, Route } from "react-router-dom";

const editorReducer = (state, action) => {
    let newState = { ...state };

    switch (action.type) {
        case "set-notes":
            newState.notes = action.notes;
            break;
        case "open":
            newState.active = true;
            newState.note = action.note;
            break;
        case "close":
            newState.active = false;
            newState.note = {};
            break;
        case "save-and-close":
            newState.notes[
                newState.notes.findIndex((n) => n.title == state.note.title)
            ] = action.note;
            localStorage.setItem("notes", JSON.stringify(newState.notes));
            newState.note = {};
            newState.active = false;
            break;
    }

    return newState;
};

export default function NotesBrowser() {
    const [loading, setLoading] = React.useState(true);
    const [state, dispatch] = React.useReducer(editorReducer, {
        active: false,
        note: {},
        notes: [],
    });

    React.useEffect(() => {
        dispatch({
            type: "set-notes",
            notes: JSON.parse(localStorage.getItem("notes")),
        });
        setLoading(false);
    }, []);

    const SearchHandler = (term) => {
        if (term == "") {
            dispatch({
                type: "set-notes",
                notes: JSON.parse(localStorage.getItem("notes")),
            });
        } else if (term[0] == "#") {
            let notes = JSON.parse(localStorage.getItem("notes")).filter(
                (note) => note.tags.includes(term.substr(1).toLowerCase())
            );
            dispatch({ type: "set-notes", notes: notes });
        } else {
            let notes = JSON.parse(localStorage.getItem("notes")).filter(
                (note) => note.title.toLowerCase().includes(term.toLowerCase())
            );
            dispatch({ type: "set-notes", notes: notes });
        }
    };

    const editHandler = (note) => {
        dispatch({ type: "open", note: note });

        // for (let i = 0; i < notes.length; i++) {
        //     if (notes[i].title === noteName) {
        //         setEditor({
        //             active: true,
        //             note: notes[i]
        //         })
        //     }
        // }
    };

    return (
        <div className={`${style.wrapper}`}>
            <header>
                <SearchBar onClickHandler={SearchHandler} />
            </header>
            <div className={`${style.notesContainer}`}>
                <div className={`row justify-content-around`}>
                    {loading ? (
                        <p>Loading</p>
                    ) : (
                        state.notes.map((note) => (
                            <NoteCard
                                onEdit={() => editHandler(note)}
                                {...note}
                                key={note.title}
                            />
                        ))
                    )}
                </div>
            </div>
            {state.active ? (
                <EditNotePanel note={state.note} dispatch={dispatch} />
            ) : null}
        </div>
    );
}
