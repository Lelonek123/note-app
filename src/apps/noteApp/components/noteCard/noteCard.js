import React from "react";
import style from "./noteCard.module.css";
import YesNoPrompt from "../yesNoPrompt/YesNoPrompt.js";

export default function NoteCard(props) {
    const [deletePromptActive, setDeletePromptActive] = React.useState(false);

    return (
        <>
            <div
                className={`card`}
                id={style.card}
                onClick={() => props.onEdit()}
            >
                <div className={`card-header ${style.cardHeader}`}>
                    <div className={style.tags}>
                        {props.tags.length != 0
                            ? `#${props.tags.join(" #")}`
                            : ""}
                    </div>
                    <button
                        className={`btn btn-sm btn-danger ${style.deleteButton}`}
                        onClick={(e) => {
                            e.stopPropagation();
                            setDeletePromptActive(true);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-x-lg"
                            viewBox="0 0 16 16"
                        >
                            <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8 2.146 2.854Z" />
                        </svg>
                    </button>
                </div>
                <div className={`card-body`}>
                    <div className={`card-title`} id={style.cardTitle}>
                        {props.title}
                    </div>
                    <hr style={{ margin: "0" }} />
                    <div className={`card-text`}>{props.content}</div>
                </div>
            </div>
            {deletePromptActive ? (
                <YesNoPrompt
                    message="Are you sure you want to delete this note?"
                    onYes={(e) => {
                        e.stopPropagation();
                        props.onDelete(props.id);
                        setDeletePromptActive(false);
                    }}
                    onNo={(e) => {
                        e.stopPropagation();
                        setDeletePromptActive(false);
                    }}
                />
            ) : null}
        </>
    );
}
