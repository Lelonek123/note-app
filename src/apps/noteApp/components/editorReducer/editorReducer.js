import React from "react";
import { db, auth } from "../../../../firebase.js";
import {
    getDoc,
    doc,
    where,
    query,
    collection,
    getDocs,
    updateDoc,
} from "firebase/firestore";

export function editorReducer(state, action) {
    let newState = { ...state };
    const generateID = () => {
        return (
            Math.random().toString(36).substr(2) +
            Math.random().toString(36).substr(2)
        );
    };

    const updateNotes = async (newNotes) => {
        try {
            const docRef = doc(db, "users", newState.uid);
            await updateDoc(docRef, {
                notes: newNotes,
            });
        } catch (err) {
            console.log(err);
        }
    };

    switch (action.type) {
        case "set-notes":
            newState.notes = action.notes;
            newState.filteredNotes = action.notes;
            break;
        case "filter-notes":
            newState.filteredNotes = action.notes;
            break;
        case "open":
            newState.active = true;
            newState.note = action.note;
            break;
        case "close":
            newState.active = false;
            newState.note = {};
            break;
        case "save":
            const saveIndex = newState.notes.findIndex(
                (n) => n.id == state.note.id
            );
            if (saveIndex != -1) {
                newState.notes[saveIndex] = action.note;
            } else {
                newState.notes.push(action.note);
            }
            updateNotes(newState.notes);
            break;
        case "new-note":
            newState.active = true;
            newState.note = {
                id: generateID(),
                title: "",
                content: "",
                tags: [],
                lastEditedTimestamp: Date.now(),
            };
            break;
        case "delete-note":
            const removeIndex = newState.notes.findIndex(
                (n) => n.id === action.id
            );
            if (removeIndex != -1) {
                newState.notes.splice(removeIndex, 1);
            }
            updateNotes(newState.notes);
            break;
        case "set-user":
            newState.uid = action.uid;
            break;
        default:
            throw new Error("Invalid reducer action");
    }

    return newState;
}

export const editorReducerInit = () => {
    return {
        active: false,
        uid: "",
        note: {},
        notes: null,
        filteredNotes: [],
    };
};
