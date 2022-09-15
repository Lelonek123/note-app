import React from "react";

export default function NoteCard(props) {
    return (
        // <div style={{width: "100px", height: "100px", backgroundColor: "white"}}></div>
        <div
            className={`card`}
            // grid, auto-fill minmax
            style={{
                width: "350px",
                height: "200px",
                overflow: "hidden",
                padding: "0",
                margin: "0 10px 20px 10px",
            }}
        >
            <div className={`card-header`}>
                <button
                    className="btn btn-sm btn-primary"
                    style={{ marginRight: "20px" }}
                    onClick={() => props.onEdit(props.title)}
                >
                    Edit
                </button>
                <span>{`#${props.tags.join(" #")}`}</span>
            </div>
            <div className={`card-body`}>
                <div className={`card-title`} style={{ fontSize: "1.2rem" }}>
                    {props.title}
                </div>
                <hr style={{ margin: "0" }} />
                <div className={`card-text`}>{props.content}</div>
            </div>
        </div>
    );
}
