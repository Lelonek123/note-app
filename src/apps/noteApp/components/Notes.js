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
                (note) =>
                    note.tags.includes(
                        term.substr(1).toLowerCase().replaceAll(" ", "_")
                    )
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
                <SearchBar
                    onClickHandler={SearchHandler}
                    className={style.searchBar}
                />
                <button
                    className={`btn btn-primary ${style.addNote}`}
                    onClick={() => dispatch({ type: "new-note" })}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="16"
                        height="16"
                        fill="currentColor"
                        className="bi bi-plus-square"
                        viewBox="0 0 16 16"
                    >
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z" />
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                    </svg>
                </button>
            </header>
            <div className={`${style.notesContainer}`}>
                {loading ? (
                    <p>Loading</p>
                ) : (
                    state.notes.map((note) => (
                        <NoteCard
                            className={`col-2 col-sm-3 col-md-4 col-xl-5`}
                            onEdit={() =>
                                dispatch({ type: "open", note: note })
                            }
                            onDelete={(id) =>
                                dispatch({
                                    type: "delete-note",
                                    id: id,
                                })
                            }
                            {...note}
                            key={note.id}
                            editor={state.active}
                        />
                    ))
                )}
            </div>
            {state.active ? (
                <EditNotePanel note={state.note} dispatch={dispatch} />
            ) : null}
        </div>
    );
}
