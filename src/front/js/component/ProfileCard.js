import React, { useContext, useState } from "react";
import { Context } from "../store/appContext";
import { useNavigate } from "react-router-dom";

export const ProfileCard = () => {
    const { store, actions } = useContext(Context);
    const [editing, setEditing] = useState(false);
    const [username, setUsername] = useState(store.privateData.username);
    const [email, setEmail] = useState(store.privateData.email);
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleUpdate = async () => {
        const response = await actions.updateUser(username, email, password);
        if (response) {
            setEditing(false);
            alert("Profile updated successfully!");
        } else {
            alert("Update failed!");
        }
    };

    const handleDelete = async () => {
        const response = await actions.deleteUser();
        if (response) {
            alert("User deleted successfully!");
            actions.logout();
            navigate("/");
        } else {
            alert("Delete failed!");
        }
    };

    return (
        <div className="card">
            <div className="card-body">
                {editing ? (
                    <>
                        <input
                            type="text"
                            className="form-control mb-2"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                        />
                        <input
                            type="email"
                            className="form-control mb-2"
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <input
                            type="password"
                            className="form-control mb-2"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <button className="btn btn-primary" onClick={handleUpdate}>
                            Save Changes
                        </button>
                        <button
                            className="btn btn-secondary ms-2"
                            onClick={() => setEditing(false)}
                        >
                            Cancel
                        </button>
                    </>
                ) : (
                    <>
                        <h5 className="card-title">{store.privateData.username}</h5>
                        <p className="card-text">{store.privateData.email}</p>
                        <button
                            className="btn btn-warning"
                            onClick={() => setEditing(true)}
                        >
                            Edit
                        </button>
                        <button className="btn btn-danger ms-2" onClick={handleDelete}>
                            Delete Account
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};