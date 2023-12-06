// PrivateRoute.js
import React from 'react';
import { Route, Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const PrivateRoute = ({ children }) => {
    const auth = useAuth();
    const isAuthenticated = auth.currentUser !== null;

    if (isAuthenticated) {
        return children;
    }

    return <Navigate to="/" />;
};

export default PrivateRoute;
