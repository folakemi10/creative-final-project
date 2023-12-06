import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth} from '../context/AuthContext';


const NavBar = () => {
    const { currentUser, logout } = useAuth();
    
    console.log('User:',  currentUser);
    const handleLogout = async () => {
        try {
            await logout();
            console.error('logout');
        } catch (error) {
            console.error('Error logging out:', error.message);
        }
    };

    return (
        <nav className="navbar">
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav ml-auto">
                    { currentUser ? (
                        <>
                            <li className="nav-item">
                                <Link to="/profile" className="nav-link">
                                    Profile
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/home" className="nav-link">
                                    Home
                                </Link>
                            </li>
                            <li className="nav-item">
                                <button onClick={handleLogout} className="btn btn-link nav-link">
                                    Logout
                                </button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link to="/" className="nav-link">
                                    Register
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/login" className="nav-link">
                                    Login
                                </Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};

export default NavBar;
