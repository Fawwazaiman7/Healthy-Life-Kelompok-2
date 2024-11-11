import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './Pages/Home';
import Makanan from './Pages/Makanan';
import Olahraga from './Pages/Olahraga';
import Kalkulator from './Pages/Kalkulator';
import GetStarted from './Pages/GetStarted';
import SignUp from './Pages/SignUp';
import Login from './Pages/Login';
import RecipeDetail from './Pages/RecipeDetail';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/makanan" element={<Makanan />} />
                <Route path="/olahraga" element={<Olahraga />} />
                <Route path="/kalkulator" element={<Kalkulator />} />
                <Route path="/getstarted" element={<GetStarted />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/login" element={<Login />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
            </Routes>
        </Router>
    );
};

export default App;