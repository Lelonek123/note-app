import React from 'react';
import style from './sideMenu.module.css';
import showMenuIcon from './hamburgerMenu.svg';
import closeMenuIcon from './close.svg';
import { Link } from 'react-router-dom';

export default function SideMenu(props) {
    const [active, setActive] = React.useState(false)

    return (
        <div className={`${style.sidebar} ${active ? style.active : ""}`}>
            <div>
                <button
                    onClick={() => setActive(!active)}
                    className="btn btn-primary">
                    {
                        active ? (
                            <img className={style.menuButtonImg} src={closeMenuIcon} alt="Menu"></img>
                        ) : (
                            <img className={style.menuButtonImg} src={showMenuIcon} alt="Menu"></img>
                        )
                    }
                </button>
            </div>
            <hr style={{margin: "10px 3px"}}/>
            <Link to="/" className={`btn btn-primary btn-sm ${style.sidebarLink}`}>
                Home
            </Link>
            <Link to="/notes/" className={`btn btn-primary btn-sm ${style.sidebarLink}`}>
                Your Board
            </Link>
        </div>
    )
}
