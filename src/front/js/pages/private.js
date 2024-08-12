import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const Private = () => {
    const { store, actions } = useContext(Context);
    const navigate = useNavigate();

    useEffect(() => {
        if (!store.token) {
            navigate("/login");
        } else {
            actions.getPrivateData();
        }
    }, [store.token]);

    return store.token ? (
        <div className="container">
            <h2>Private Data</h2>
            <p>Your private data: {store.privateData}</p>
        </div>
    ) : null;
};