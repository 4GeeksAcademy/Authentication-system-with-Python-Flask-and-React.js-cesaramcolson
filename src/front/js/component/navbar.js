import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

export const Navbar = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    const handleLogout = async () => {
        await actions.logout();
        navigate("/login");
    };

    return (
        <nav className="navbar navbar-light bg-light">
            <div className="container">
                <Link to="/">
                    <span className="navbar-brand mb-0 h1">Home Page</span>
                </Link>
                {store.token ? (
                    <>
                        <button onClick={handleLogout} className="btn btn-outline-secondary">Logout</button>
                    </>
                ) : (
                    <Link to="/login" className="btn btn-outline-primary">Login</Link>
                )}
            </div>
        </nav>
    );
};