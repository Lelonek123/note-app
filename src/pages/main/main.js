import React from 'react';
import WrapperWithSideMenu from '../../components/wrapperWithSideMenu/wrapperWithSideMenu.js';
import { Routes, Route } from 'react-router-dom';
import NotesBrowser from './notesBrowser/notesBrowser.js'

export default function MainPage() {
    return (
        <WrapperWithSideMenu>
            <Routes>
                <Route 
                    path="/"
                    element={
                        <p>home</p>
                    }/>
                <Route 
                    path="notes/"
                    element={
                        <NotesBrowser />
                    }/>
            </Routes>
        </ WrapperWithSideMenu>
    )
}
