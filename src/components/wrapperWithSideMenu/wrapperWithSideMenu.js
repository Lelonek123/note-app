import React from 'react';
import SideMenu from '../sideMenu/sideMenu.js';
import style from './wrapperWithSideMenu.module.css';

export default function WrapperWithSideMenu(props) {
    
    return (
        <div className={style.fullScreenContainer}>
            <SideMenu />
                <div className={style.content}>
                    {props.children}
                </div>
        </div>
    )
}
