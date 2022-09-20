import React from "react";
import style from "./Notes.module.css";
import NoteCard from "./noteCard/noteCard.js";
import SearchBar from "../../../components/searchBar/searchBar.js";
import EditNotePanel from "./editNotePanel/editNotePanel.js";
import {
    editorReducer,
    editorReducerInit,
} from "./editorReducer/editorReducer.js";

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
                                onDelete={(id) =>
                                    dispatch({ type: "delete-note", id: id })
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
