// File: src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Import Halaman
import Home from './Pages/Home/Home';
import Makanan from './Pages/Makanan/Makanan';
import Olahraga from './Pages/Olahraga/Olahraga';
import SignUp from './Pages/Sign Up/SignUp';
import GetStarted from './Pages/GetStarted/GetStarted';
import Login from './Pages/Login/Login';
import RecipeDetail from './Pages/RecipeDetail/RecipeDetail';
import ArticleDetail from './Pages/ArticleDetail/ArticleDetail';
import HomeLogin from './Pages/Home/HomeLogin';
import Profile from './Pages/Profile/Profile';
import AdminFood from './components/AdminFood'; // Halaman admin makanan
import AdminManagement from './components/AdminManagement/AdminManagement';
import About from './Pages/About/About'; // Jika file bernama About.jsx
import ExerciseAndFoodTracker from './Pages/ExerciseAndFoodTracker/ExerciseAndFoodTracker';
import Riwayat from './Pages/Riwayat/Riwayat'; // Impor Riwayat dari file Riwayat.jsx
import KalkulatorAKG from './Pages/Kalkulator/KalkulatorAKG'; // Import Kalkulator AKG

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/makanan" element={<Makanan />} />
                <Route path="/olahraga" element={<Olahraga />} />
                <Route path="/sign-up" element={<SignUp />} />
                <Route path="/getstarted" element={<GetStarted />} />
                <Route path="/login" element={<Login />} />
                <Route path="/recipe/:id" element={<RecipeDetail />} />
                <Route path="/article/:id" element={<ArticleDetail />} />
                <Route path="/homelogin" element={<HomeLogin />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin-food" element={<AdminFood />} />
                <Route path="/admin-management" element={<AdminManagement />} />
                <Route path="/exerciseandfoodtracker" element={<ExerciseAndFoodTracker />} />
                <Route path="/riwayat" element={<Riwayat />} /> {/* Rute untuk Riwayat */}
                <Route path="/about" element={<About />} /> {/* Rute untuk About */}
                <Route path="/kalkulator" element={<KalkulatorAKG />} /> {/* Rute untuk Kalkulator AKG */}
            </Routes>
        </Router>
    );
};

export default App;
