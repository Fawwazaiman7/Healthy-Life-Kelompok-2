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
import ArticleDetail from './Pages/ArticleDetail';
import HomeLogin from './Pages/HomeLogin';
import Profile from './Pages/Profile';
import AdminFood from './Pages/AdminFood'; // Import halaman admin makanan
import AdminManagement from "./Pages/AdminManagement";
import 'bootstrap/dist/css/bootstrap.min.css';
import DoExercise from './Pages/DoExercise';
import FoodTracker from './Pages/FoodTracker';
import ExerciseAndFoodTracker from './Pages/ExerciseAndFoodTracker';

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
                <Route path="/article/:id" element={<ArticleDetail />} />
                <Route path="/homelogin" element={<HomeLogin />} />
                <Route path="/profile" element={<Profile />} />
                <Route path="/admin-food" element={<AdminFood />} /> 
                <Route path="/admin-management" element={<AdminManagement />} />
                <Route path="/doexercise" element={<DoExercise />} />
                <Route path="/foodtracker" element={<FoodTracker />} />
                <Route path="/exerciseandfoodtracker" element={<ExerciseAndFoodTracker />} />
            </Routes>
        </Router>
    );
};

export default App;
