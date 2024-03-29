import React from "react";
import style from "./Notes.module.css";
import NoteCard from "./noteCard/noteCard.js";
import SearchBar from "../../../components/searchBar/searchBar.js";
import EditNotePanel from "./editNotePanel/editNotePanel.js";
import {
    editorReducer,
    editorReducerInit,
} from "./editorReducer/editorReducer.js";
import { db, auth } from "../../../firebase.js";
import {
    getDoc,
    doc,
    where,
    query,
    collection,
    getDocs,
} from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

export default function NotesBrowser(props) {
    const [loadingNotes, setLoadingNotes] = React.useState(true);
    const [user, loading, error] = useAuthState(auth);
    const [state, dispatch] = React.useReducer(
        editorReducer,
        {},
        editorReducerInit
    );
    const navigate = useNavigate();

    const fetchNotes = async () => {
        try {
            const docRef = doc(db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            const firestoreObject = docSnap.data();
            dispatch({ type: "set-notes", notes: firestoreObject.notes });
            setLoadingNotes(false);
        } catch (err) {
            console.log(err);
        }
    };

    React.useLayoutEffect(() => {
        if (!user) {
            navigate("/login");
            return;
        }
        dispatch({ type: "set-user", uid: user.uid });
        if (state.notes === null) {
            fetchNotes();
        }
    }, []);

    const SearchHandler = (term) => {
        if (term == "") {
            dispatch({
                type: "filter-notes",
                notes: state.notes,
            });
        } else if (term[0] == "#") {
            let notes = state.notes.filter((note) =>
                note.tags.includes(
                    term.substr(1).toLowerCase().replaceAll(" ", "_")
                )
            );
            dispatch({ type: "filter-notes", notes: notes });
        } else {
            let notes = state.notes.filter((note) =>
                note.title.toLowerCase().includes(term.toLowerCase())
            );
            dispatch({ type: "filter-notes", notes: notes });
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
            {loadingNotes ? (
                <div
                    className={`spinner-border text-secondary ${style.spinner}`}
                    role="status"
                ></div>
            ) : (
                <div className={`${style.notesContainer}`}>
                    {state.filteredNotes.map((note) => (
                        <NoteCard
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
                            deleteButtonActive={true}
                        />
                    ))}
                </div>
            )}
            {state.active ? (
                <EditNotePanel note={state.note} dispatch={dispatch} />
            ) : null}
        </div>
    );
}
