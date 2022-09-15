import React from "react";
import style from "./notesBrowser.module.css";
import NoteCard from "./noteCard/noteCard.js";
import SearchBar from "../../../components/searchBar/searchBar.js";
import EditNotePanel from "./editNotePanel/editNotePanel.js";
import { Routes, Route } from 'react-router-dom';

const backendNotes = [
    {
        name: "Note2",
        content: `note 2 is containing some shit
                   like idk.`,
        tags: ["second", "note"],
    },
    {
        name: "Note1",
        content: `note 1 is containing some shit
                   like idk. Cards support a wide variety of content, including images, text, list groups, links, and more. Below are examples of what’s supported.`,
        tags: ["first", "note"],
    },
    {
        name: "Note3",
        content: `note 1 is containing some shit
                   like idk.`,
        tags: ["third", "note"],
    },
    {
        name: "List",
        content: `note 1 is containing some shit
                   like idk.`,
        tags: ["third", "note"],
    },
    {
        name: "List2",
        content: `note 1 is containing some shit
                   like idk.`,
        tags: ["third", "note"],
    },
];

export default function NotesBrowser() {
    const [loading, setLoading] = React.useState(true);
    const [notes, setNotes] = React.useState();

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
                note.name.toLowerCase().includes(term.toLowerCase())
            );
            setNotes(notes);
        }
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
                            <NoteCard {...note} key={note.name} />
                        ))
                    )}
                </div>
            </div>
        <Routes>
            <Route
                path="/edit/*" 
                element={
                    <EditNotePanel />
                }
            />
        </Routes>
        </div>
    );
}
