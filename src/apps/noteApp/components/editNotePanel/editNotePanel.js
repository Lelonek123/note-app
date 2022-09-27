import React from "react";
import useOutsideClick from "../../hooks/useOutsideClick.js";
import style from "./editNotePanel.module.css";
import Tagbar from "./tag/Tagbar.js";

export default function EditNotePanel(props) {
    const [title, setTitle] = React.useState(props.note.title);
    const [content, setContent] = React.useState(props.note.content);
    const [tags, setTags] = React.useState([...props.note.tags]);
    const [active, setActive] = React.useState(false);
    const ref = React.useRef();

    useOutsideClick(ref, () => {
        if (active) {
            props.dispatch({
                type: "save",
                note: {
                    id: props.note.id,
                    title: title,
                    content: content,
                    tags: tags,
                    lastEditedTimestamp: Date.now(),
                },
            });
            setActive(false);
            setTimeout(() => props.dispatch({ type: "close" }), 300);
        }
    });

    React.useEffect(() => {
        setActive(true);
    }, []);

    const removeTag = (tag) => {
        setTags(tags.filter((t) => t != tag));
    };

    const saveShortcutHandler = (e) => {
        // ctrl+s detection
        if (e.ctrlKey && e.key === "s") {
            e.preventDefault();
            props.dispatch({
                type: "save",
                note: {
                    id: props.note.id,
                    title: title,
                    content: content,
                    tags: tags,
                    lastEditedTimestamp: Date.now(),
                },
            });
        }
    };

    return (
        <div className={`${style.fullScreen} ${active ? style.active : ""}`}>
            <div
                ref={ref}
                className={`card ${style.container} ${
                    active ? style.active : ""
                }`}
                onKeyDown={(e) => saveShortcutHandler(e)}
            >
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
                                type: "save",
                                note: {
                                    id: props.note.id,
                                    title: title,
                                    content: content,
                                    tags: tags,
                                    lastEditedTimestamp: Date.now(),
                                },
                            });
                            setActive(false);
                            setTimeout(
                                () => props.dispatch({ type: "close" }),
                                200
                            );
                        }}
                    >
                        Save
                    </button>
                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            setActive(false);
                            setTimeout(
                                () => props.dispatch({ type: "close" }),
                                300
                            );
                        }}
                    >
                        Discard
                    </button>
                </div>
            </div>
        </div>
    );
}
