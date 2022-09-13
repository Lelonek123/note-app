import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MainPage from './pages/main/main.js';

function App() {
const routes = (
    <Routes>
        <Route path='/*' element={
            <MainPage />
        } />                
    </Routes>
)

    return (
        <Router>
            {routes}
        </Router>
    )
}

export default App;
