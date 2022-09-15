import React from "react";
import style from "./notesBrowser.module.css";
import NoteCard from "./noteCard/noteCard.js";
import SearchBar from "../../../components/searchBar/searchBar.js";
import EditNotePanel from "./editNotePanel/editNotePanel.js";
import { Routes, Route } from "react-router-dom";

const backendNotes = [
    {
        title: "Note2",
        content: `note 2 is containing some shit
                   like idk.`,
        tags: ["second", "note"],
    },
    {
        title: "Note1",
        content: `note 1 is containing some shit
                   like idk. Cards support a wide variety of content, including images, text, list groups, links, and more. Below are examples of what’s supported.`,
        tags: ["sumlongtag", "note"],
    },
    {
        title: "Note3",
        content: `note 1 is containing some shit
                   like idk.`,
        tags: ["third", "note"],
    },
    {
        title: "List",
        content: `note 1 is containing some shit
                   like idk.`,
        tags: ["third", "note"],
    },
    {
        title: "List2",
        content: `note 1 is containing some shit
                   like idk.`,
        tags: ["third", "note"],
    },
];

const editorReducer = (state, action) => {
    let newState = { ...state };

    switch (action.type) {
        case "open":
            newState.active = true;
            newState.note = action.note;
            break;
        case "close":
            newState.active = false;
            newState.note = {};
            break;
    }

    return newState;
};

export default function NotesBrowser() {
    const [loading, setLoading] = React.useState(true);
    const [notes, setNotes] = React.useState();
    const [editor, dispatchEditor] = React.useReducer(editorReducer, {
        active: false,
        note: {},
    });

    React.useEffect(() => {
        setNotes(backendNotes);
        setLoading(false);
    }, []);

    const SearchHandler = (term) => {
        if (term == "") {
            setNotes(backendNotes);
        } else if (term[0] == "#") {
            let notes = backendNotes.filter((note) =>
                note.tags.includes(term.substr(1).toLowerCase())
            );
            setNotes(notes);
        } else {
            let notes = backendNotes.filter((note) =>
                note.title.toLowerCase().includes(term.toLowerCase())
            );
            setNotes(notes);
        }
    };

    const editHandler = (noteName) => {
        const note = notes.find((note) => note.title === noteName);
        dispatchEditor({ type: "open", note: note });

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
                        notes.map((note) => (
                            <NoteCard
                                onEdit={editHandler}
                                {...note}
                                key={note.title}
                            />
                        ))
                    )}
                </div>
            </div>
            {editor.active ? (
                <EditNotePanel note={editor.note} onClose={dispatchEditor} />
            ) : null}
        </div>
    );
}
