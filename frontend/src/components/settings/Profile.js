import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { Button, Form } from "react-bootstrap"; // Import Form from react-bootstrap
import styled from "styled-components";
import { Container, Stack, Row, Col } from "react-bootstrap";

function Profile({ userProfile }) {
    const { updateUser } = useContext(AuthContext);
    const [editMode, setEditMode] = useState(false);
    const [profile, setProfile] = useState(userProfile);
    const [selectedImage, setSelectedImage] = useState(null);
    const [profileImageUrl, setProfileImageUrl] = useState(
        userProfile.profilePictureUrl
    );

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
            formData.append("profilePicture", selectedImage);
        }
        formData.append("profileData", JSON.stringify(profile));

        try {
            const response = await axios.put(
                "http://localhost:8080/api/users/updateProfile",
                formData,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                }
            );
            console.log(response.data);
            setEditMode(false);
            updateUser(response.data);
        } catch (error) {
            console.error(
                "Error updating profile:",
                error.response ? error.response.data : error
            );
        }
    };

    if (!profile) return <div>No profile data available.</div>;

    return (
        <Container>
            <Row className="justify-content-center">
                <Stack className="single-user">
                    <Col className="mx-auto">
                        {/* <Col xs={6}> */}
                        <h2>Profile</h2>
                        {editMode ? (
                            <Form
                                onSubmit={(e) => {
                                    e.preventDefault();
                                    saveChanges();
                                }}
                            >
                                <div>
                                    <StyledFileInput
                                        type="file"
                                        onChange={handleImageChange}
                                    />
                                    {selectedImage && (
                                        <ImagePreview
                                            src={profileImageUrl}
                                            alt="Profile Preview"
                                        />
                                    )}
                                </div>
                                <Form.Group className="mb-3">
                                    <Form.Label>Name:</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="userName"
                                        value={profile.userName}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>About:</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        name="about"
                                        value={profile.about}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3">
                                    <Form.Label>Email:</Form.Label>
                                    <Form.Control
                                        type="email"
                                        name="email"
                                        value={profile.email}
                                        onChange={handleInputChange}
                                    />
                                </Form.Group>
                                <Stack>
                                    <Button type="submit">Save Changes</Button>
                                    <Button
                                        type="button"
                                        onClick={() => setEditMode(false)}
                                        className="mt-3"
                                    >
                                        Cancel
                                    </Button>
                                </Stack>
                            </Form>
                        ) : (
                            <>
                                {profile.profilePicture && (
                                    <ProfileImage
                                        src={`http://localhost:8080/${profile.profilePicture}`}
                                        alt="Profile"
                                    />
                                )}
                                <div>
                                    <label>Name:</label> {profile.userName}
                                </div>
                                <div>
                                    <label>About:</label> {profile.about}
                                </div>
                                <div>
                                    <label>Email:</label> {profile.email}
                                </div>
                                <Button onClick={() => setEditMode(true)}>
                                    Edit
                                </Button>
                            </>
                        )}
                    </Col>
                </Stack>
            </Row>
        </Container>
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
        color: black;
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
