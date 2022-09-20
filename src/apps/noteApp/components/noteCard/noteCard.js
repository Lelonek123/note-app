import React from "react";
import style from "./noteCard.module.css";

export default function NoteCard(props) {
    return (
        <div className={`card`} id={style.card}>
            <div className={`card-header ${style.cardHeader}`}>
                <button
                    className="btn btn-sm btn-primary"
                    style={{ marginRight: "10px" }}
                    onClick={() => props.onEdit()}
                >
                    Edit
                </button>
                <div className={style.tags}>
                    {props.tags.length != 0 ? `#${props.tags.join(" #")}` : ""}
                </div>
                <button
                    className={`btn btn-sm btn-danger ${style.deleteButton}`}
                    onClick={() => props.onDelete(props.id)}
                >
                    Delete
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
    );
}
