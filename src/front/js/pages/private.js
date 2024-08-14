import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { ProfileCard } from "../component/ProfileCard";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        const token = sessionStorage.getItem('token');
        if (!token) {
            navigate("/login");
        } else {
            actions.getPrivateData().catch((error) => {
                console.error("Failed to get private data", error);
                navigate("/login");
            });
        }
    }, []);

    return (
        <div className="container mt-5">
            {store.privateData ? (
                <div>
                    <ProfileCard />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};