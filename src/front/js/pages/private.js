import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { ProfileCard } from "../component/ProfileCard";

export const Private = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        if (store.token) {
            actions.getPrivateData();
        }
    }, [store.token]);

    return (
        <div className="container mt-5">
            {store.privateData ? (
                <div>
                    <h2>Private Data</h2>
                    <p>{store.privateData}</p>
                    <ProfileCard />
                </div>
            ) : (
                <p>Loading...</p>
            )}
        </div>
    );
};