import React from "react";
import style from "./noteCard.module.css";

export default function NoteCard(props) {
    return (
        <div className={`card`} id={style.card}>
            <div className={`card-header`}>
                <button
                    className="btn btn-sm btn-primary"
                    style={{ marginRight: "20px" }}
                    onClick={() => props.onEdit()}
                >
                    Edit
                </button>
                <span>
                    {props.tags.length != 0 ? `#${props.tags.join(" #")}` : ""}
                </span>
            </div>
            <div className={`card-body`}>
                <div className={`card-title`} id={style.cardTitle}>
                    {props.title}
                </div>
                <hr style={{ margin: "0" }} />
                <div className={`card-text`}>{props.content}</div>
            </div>
        </div>
    );
}