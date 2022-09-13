import React from 'react';
import WrapperWithSideMenu from '../../components/wrapperWithSideMenu/wrapperWithSideMenu.js';
import { Routes, Route } from 'react-router-dom';

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
                        <p>browse</p>
                    }/>
            </Routes>
        </ WrapperWithSideMenu>
    )
}
