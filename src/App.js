// File: src/App.js

import React from 'react';

// Import komponen Router dan Route dari react-router-dom
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import styling global bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

// Import semua halaman (pastikan path dan casing folder sesuai struktur proyek)
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
import AdminFood from './components/AdminFood';
import AdminManagement from './components/AdminManagement/AdminManagement';
import About from './Pages/About/About';
import ExerciseAndFoodTracker from './Pages/ExerciseAndFoodTracker/ExerciseAndFoodTracker';
import Riwayat from './Pages/Riwayat/Riwayat';
import KalkulatorAKG from './Pages/Kalkulator/KalkulatorAKG';

// Komponen utama App
const App = () => {
  return (
    // Router membungkus seluruh aplikasi, dengan basename untuk subfolder GitHub Pages
    <Router basename="/Healthy-Life-Kelompok-2">
      {/* Routes menampung semua Route halaman */}
      <Routes>
        {/* Daftar route dengan path URL dan komponen yang akan dirender */}
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
        <Route path="/riwayat" element={<Riwayat />} />
        <Route path="/about" element={<About />} />
        <Route path="/kalkulator" element={<KalkulatorAKG />} />
      </Routes>
    </Router>
  );
};

export default App;
