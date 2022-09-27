import React from "react";
import style from "./searchBar.module.css";

export default function SearchBar(props) {
    const [term, setTerm] = React.useState("");

    return (
        <div className={style.wrapper}>
            <input
                type="text"
                placeholder="Search..."
                value={term}
                onChange={(e) => {
                    setTerm(e.target.value);
                }}
                onKeyDown={(e) => {
                    if (e.key == "Enter") {
                        props.onClickHandler(term);
                        setTerm("");
                    }
                }}
            />
            <button
                type="button"
                className="btn btn-primary"
                onClick={() => {
                    props.onClickHandler(term);
                    setTerm("");
                }}
            >
                Search
            </button>
        </div>
    );
}
