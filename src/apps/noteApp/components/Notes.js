import React from "react";
import style from "./Notes.module.css";
import NoteCard from "./noteCard/noteCard.js";
import SearchBar from "../../../components/searchBar/searchBar.js";
import EditNotePanel from "./editNotePanel/editNotePanel.js";

const editorReducer = (state, action) => {
    let newState = { ...state };
    const generateID = () => {
        return (
            Math.random().toString(36).substr(2) +
            Math.random().toString(36).substr(2)
        );
    };

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
            const index = newState.notes.findIndex(
                (n) => n.id == state.note.id
            );
            if (index != -1) {
                newState.notes[index] = action.note;
            } else {
                newState.notes.push(action.note);
            }
            localStorage.setItem("notes", JSON.stringify(newState.notes));
            newState.note = {};
            newState.active = false;
            break;
        case "new-note":
            console.log("new note");
            newState.active = true;
            newState.note = {
                id: generateID(),
                title: "",
                content: "",
                tags: [],
            };
            localStorage.setItem("notes", JSON.stringify(newState.notes));
            break;
    }

    return newState;
};

const editorReducerInit = () => {
    return {
        active: false,
        note: {},
        notes: [],
    };
};

export default function NotesBrowser() {
    const [loading, setLoading] = React.useState(true);
    const [state, dispatch] = React.useReducer(
        editorReducer,
        {},
        editorReducerInit
    );

    React.useEffect(() => {
        let notes = localStorage.getItem("notes");
        if (notes === null) {
            localStorage.setItem("notes", JSON.stringify([]));
        }
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

    return (
        <div className={`${style.wrapper}`}>
            <header>
                <SearchBar onClickHandler={SearchHandler} />
                <button
                    className={`btn btn-primary`}
                    onClick={() => dispatch({ type: "new-note" })}
                >
                    New Note
                </button>
            </header>
            <div className={`${style.notesContainer}`}>
                <div className={`row justify-content-around`}>
                    {loading ? (
                        <p>Loading</p>
                    ) : (
                        state.notes.map((note) => (
                            <NoteCard
                                onEdit={() =>
                                    dispatch({ type: "open", note: note })
                                }
                                {...note}
                                key={note.id}
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
