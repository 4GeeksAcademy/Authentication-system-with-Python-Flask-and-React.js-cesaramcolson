import React, { useContext, useEffect } from "react";
import { Context } from "../store/appContext";
import { ProfileCard } from "../component/ProfileCard";

export const Private = () => {
    const { store, actions } = useContext(Context);

    useEffect(() => {
        actions.getPrivateData();
    }, []);

    return (
        <div className="container mt-5">
            {store.privateData ? <ProfileCard /> : <p>Loading...</p>}
        </div>
    );
};