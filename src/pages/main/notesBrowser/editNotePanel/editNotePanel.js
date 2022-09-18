import React from "react";
import style from "./editNotePanel.module.css";

export default function EditNotePanel(props) {
    const [title, setTitle] = React.useState(props.note.title);
    const [content, setContent] = React.useState(props.note.content);
    const [tags, setTags] = React.useState(props.note.tags);
    const [addTagActive, setAddTagActive] = React.useState(false);

    const removeTag = (tag) => {
        setTags(tags.filter((t) => t != tag));
    };

    const addTagHandler = (e) => {
        if (e.key == "Enter") {
            let newTags = tags;
            newTags.push(e.target.value);
            setTags(newTags);
            setAddTagActive(false);
        } else if (e.key == "Escape") {
            setAddTagActive(false);
        }
    };

    return (
        <div className={style.fullScreen}>
            <div className={`card ${style.container}`}>
                <div
                    className="card-header"
                    style={{ display: "flex", flexDirection: "row" }}
                >
                    {tags.map((tag) => (
                        <div className={style.tag} key={tag}>
                            {tag}
                            <div
                                className={`${style.removeTagButton}`}
                                title="Remove tag"
                                onClick={() => {
                                    removeTag(tag);
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="16"
                                    height="16"
                                    fill="currentColor"
                                    className="bi bi-x-circle-fill"
                                    viewBox="0 0 16 16"
                                >
                                    <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z" />
                                </svg>
                            </div>
                        </div>
                    ))}
                    <div
                        className={style.addTagButton}
                        title="Add tag"
                        onClick={() => {
                            setAddTagActive(true);
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            fill="currentColor"
                            className="bi bi-plus-circle"
                            viewBox="0 0 16 16"
                        >
                            <path d="M8 15A7 7 0 1 1 8 1a7 7 0 0 1 0 14zm0 1A8 8 0 1 0 8 0a8 8 0 0 0 0 16z" />
                            <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z" />
                        </svg>
                    </div>
                    {addTagActive ? (
                        <div className={style.tagInput}>
                            <input
                                ref={(input) => input && input.focus()}
                                type="text"
                                placeholder="Tag..."
                                onKeyDown={(e) => addTagHandler(e)}
                            ></input>
                        </div>
                    ) : null}
                </div>
                <div
                    className="card-body"
                    style={{ display: "flex", flexDirection: "column" }}
                >
                    <div className="card-title">
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className={style.titleInput}
                            placeholder="Title..."
                        />
                    </div>
                    <hr />
                    <div className="card-description" style={{ flexGrow: 1 }}>
                        <textarea
                            type="text"
                            value={content}
                            onChange={(e) => setContent(e.target.value)}
                            className={style.contentInput}
                            placeholder="Content..."
                        />
                    </div>
                </div>
                <div className="card-footer">
                    <button
                        className="btn btn-primary"
                        onClick={() => {
                            console.log("save");
                            props.dispatch({
                                type: "save-and-close",
                                note: {
                                    id: props.key,
                                    title: title,
                                    content: content,
                                    tags: tags,
                                },
                            });
                        }}
                        style={{ marginRight: "10px" }}
                    >
                        Save
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => props.dispatch({ type: "close" })}
                    >
                        Discard
                    </button>
                </div>
            </div>
        </div>
    );
}
