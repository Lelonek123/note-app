import style from "./DeletePrompt.module.css";

export default function DeletePrompt(props) {
    return (
        <div className={style.fullscreen}>
            <div className={`card ${style.prompt}`}>
                <div className="card-header">
                    Do you really want to delete this note?
                </div>
                <div className={`card-body ${style.body}`}>
                    <button className={`btn btn-danger`} onClick={props.onYes}>
                        Yes
                    </button>
                    <button className={`btn btn-primary`} onClick={props.onNo}>
                        No
                    </button>
                </div>
            </div>
        </div>
    );
}
