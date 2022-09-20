import React from "react";

export function editorReducer(state, action) {
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
            const saveIndex = newState.notes.findIndex(
                (n) => n.id == state.note.id
            );
            if (saveIndex != -1) {
                newState.notes[saveIndex] = action.note;
            } else {
                newState.notes.push(action.note);
            }
            localStorage.setItem("notes", JSON.stringify(newState.notes));
            newState.note = {};
            newState.active = false;
            break;
        case "new-note":
            newState.active = true;
            newState.note = {
                id: generateID(),
                title: "",
                content: "",
                tags: [],
            };
            localStorage.setItem("notes", JSON.stringify(newState.notes));
            break;
        case "delete-note":
            const removeIndex = newState.notes.findIndex(
                (n) => n.id === action.id
            );
            if (removeIndex != -1) {
                newState.notes.splice(removeIndex, 1);
            }
            localStorage.setItem("notes", JSON.stringify(newState.notes));
            break;
        default:
            throw new Error("Invalid reducer action");
    }

    return newState;
}

export const editorReducerInit = () => {
    return {
        active: false,
        note: {},
        notes: [],
    };
};
