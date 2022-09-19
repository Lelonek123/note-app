import React from "react";
import style from "./editNotePanel.module.css";
import Tagbar from "./tag/Tagbar.js";

export default function EditNotePanel(props) {
    const [title, setTitle] = React.useState(props.note.title);
    const [content, setContent] = React.useState(props.note.content);
    const [tags, setTags] = React.useState([...props.note.tags]);

    const removeTag = (tag) => {
        setTags(tags.filter((t) => t != tag));
    };

    return (
        <div className={style.fullScreen}>
            <div className={`card ${style.container}`}>
                <div className={`card-header ${style.cardHeader}`}>
                    <Tagbar
                        tags={tags}
                        removeTag={removeTag}
                        setTags={setTags}
                    />
                </div>
                <div className={`card-body ${style.cardBody}`}>
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
                        className={`btn btn-primary ${style.saveButton}`}
                        onClick={() => {
                            props.dispatch({
                                type: "save-and-close",
                                note: {
                                    id: props.note.id,
                                    title: title,
                                    content: content,
                                    tags: tags,
                                },
                            });
                        }}
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
