import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'; 

function Profile({ userProfile }) {
    const { updateUser } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(false);
    const [profile, setProfile] = useState(userProfile);

    useEffect(() => {
        setProfile(userProfile);
    }, [userProfile]);

    const handleInputChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };

    const saveChanges = async () => {
        try {
            const response = await axios.put('http://localhost:8080/api/users/updateProfile', profile);
            console.log(response.data);
            setEditMode(false);

            updateUser(response.data); // Update the user data in AuthContext and localStorage
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    if (!profile) return <div>No profile data available.</div>;

    return (
        <div>
            <h2>Profile</h2>
            {editMode ? (
                <form onSubmit={e => { e.preventDefault(); saveChanges(); }}>
                    <div>
                        <label>Name:</label>
                        <input name="userName" value={profile.userName} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>About:</label>
                        <textarea name="about" value={profile.about} onChange={handleInputChange} />
                    </div>
                    <div>
                        <label>Email:</label>
                        <input name="email" type="email" value={profile.email} onChange={handleInputChange} />
                    </div>
                    <button type="submit">Save Changes</button>
                    <button type="button" onClick={() => setEditMode(false)}>Cancel</button>
                </form>
            ) : (
                <>
                    <div><label>Name:</label> {profile.userName}</div>
                    <div><label>About:</label> {profile.about}</div>
                    <div><label>Email:</label> {profile.email}</div>
                    <button onClick={() => setEditMode(true)}>Edit</button>
                </>
            )}
        </div>
    );
}

export default Profile;