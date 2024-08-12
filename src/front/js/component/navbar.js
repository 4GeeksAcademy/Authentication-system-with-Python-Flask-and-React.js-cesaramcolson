import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);

    const handleLogout = () => {
        actions.logout();
        window.location.href = "/";
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <Link className="navbar-brand" to="/">Home</Link>
            <div className="collapse navbar-collapse">
                <ul className="navbar-nav mr-auto">
                    {store.token ? (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/private">Profile</Link>
                            </li>
                            <li className="nav-item">
                                <button className="btn btn-secondary" onClick={handleLogout}>Logout</button>
                            </li>
                        </>
                    ) : (
                        <>
                            <li className="nav-item">
                                <Link className="nav-link" to="/login">Login</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/signup">Signup</Link>
                            </li>
                        </>
                    )}
                </ul>
            </div>
        </nav>
    );
};