import React from 'react';

export default function SearchBar(props) {
    const [term, setTerm] = React.useState("");


    return (
        <>
            <input type="text"
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
                    props.onClickHandler(term)
                    setTerm("");
                }}
            >
                Search
            </button>
        </>
    )
}
