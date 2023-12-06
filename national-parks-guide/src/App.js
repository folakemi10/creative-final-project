// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AppProvider } from './context/AppContext';
import NavBar from './components/NavBar';
import Home from './pages/Home';
import Profile from './pages/Profile';
import Details from './pages/Details';
import Register from './pages/Register';
import Login from './pages/Login';
import PrivateRoute from './components/PrivateRoute';
import { useAuth } from './context/AuthContext';

function App() {
  const auth = useAuth();
  const authenticated = auth.currentUser !== null;

  return (
    <Router>
      <div>
        <NavBar />
        <Routes>
          <Route path="/register" element={<Register />} />
          <Route path="/" element={<Login />} />
          <Route
            path="/home"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
         <Route path="/activity/:parkName/:activityName" element={<Details />} />

          <Route
            path="/Profile"
            element={
              <PrivateRoute>
                <Profile />
              </PrivateRoute>
            }
          />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
