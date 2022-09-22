import style from "./YesNoPrompt.module.css";

export default function YesNoPrompt(props) {
    return (
        <div className={style.fullscreen}>
            <div className={`card ${style.prompt}`}>
                <div className="card-header">{props.message}</div>
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
