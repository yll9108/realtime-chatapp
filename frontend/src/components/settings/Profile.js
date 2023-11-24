import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext'; 
import styled from 'styled-components';

function Profile({ userProfile }) {
    const { updateUser } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(false);
    const [profile, setProfile] = useState(userProfile);
    const [selectedImage, setSelectedImage] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(userProfile.profilePictureUrl); 
    useEffect(() => {
        setProfile(userProfile);
        setProfileImageUrl(userProfile.profilePictureUrl); 
    }, [userProfile]);

    const handleInputChange = (e) => {
        setProfile({ ...profile, [e.target.name]: e.target.value });
    };
    const handleImageChange = (e) => {
        if (e.target.files && e.target.files[0]) {
            const file = e.target.files[0];
            setSelectedImage(file);
            setProfileImageUrl(URL.createObjectURL(file)); 
        }
    };
    const saveChanges = async () => {
        const formData = new FormData();
        if (selectedImage) {
            formData.append('profilePicture', selectedImage);
        }
        formData.append('profileData', JSON.stringify(profile));
    
        try {
            const response = await axios.put('http://localhost:8080/api/users/updateProfile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            console.log(response.data);
            setEditMode(false);
    
            updateUser(response.data); 
        } catch (error) {
            console.error('Error updating profile:', error.response ? error.response.data : error);
        }
    };
    
    if (!profile) return <div>No profile data available.</div>;

    return (
        <div>
            <h2>Profile</h2>
            {editMode ? (
                <form onSubmit={e => { e.preventDefault(); saveChanges(); }}>
                     <div>
            <StyledFileInput type="file" onChange={handleImageChange} />
            {selectedImage && <ImagePreview src={profileImageUrl} alt="Profile Preview" />}
        </div>
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
                      {profile.profilePicture && (
            <ProfileImage src={`http://localhost:8080/${profile.profilePicture}`} alt="Profile" />
        )}<div><label>Name:</label> {profile.userName}</div>
                    <div><label>About:</label> {profile.about}</div>
                    <div><label>Email:</label> {profile.email}</div>
                    <button onClick={() => setEditMode(true)}>Edit</button>
                </>
            )}
        </div>
    );
}
const StyledFileInput = styled.input`
  display: block;
  margin: 20px 0;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 4px;
  cursor: pointer;

  &:hover {
    background-color: #f4f4f4;
  }
`;

const ImagePreview = styled.img`
  width: 100px;  
  height: 100px;  
  border-radius: 50%; 
  object-fit: cover;  
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;
const ProfileImage = styled.img`
  width: 100px; 
  height: 100px; 
  border-radius: 50%; 
  object-fit: cover; 
  border: 2px solid #ffffff; 
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1); 
`;
export default Profile;
