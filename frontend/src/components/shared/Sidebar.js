// Sidebar.js
import React from 'react';
import styled from 'styled-components';


const NavbarContainer = styled.div`
    background-color: #2c2c2c;
    padding: 20px;
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const NavItem = styled.div`
    margin: 15px 0;
    display: flex;
    flex-direction: column;
    align-items: center;
    color: white;
    cursor: pointer;

    &:hover {
        opacity: 0.8;
    }
`;

const NavIcon = styled.div`
    font-size: 24px;
    margin-bottom: 5px;
`;

const NavLabel = styled.div`
    font-size: 14px;
`;


const Sidebar = ({ setActiveSection }) => {
    return (
        <NavbarContainer>
            <NavItem onClick={() => setActiveSection('chat')}>
                <NavIcon>💬</NavIcon>
                <NavLabel>Chat</NavLabel>
            </NavItem>

            <NavItem onClick={() => setActiveSection('friends')}>
                <NavIcon>👥</NavIcon>
                <NavLabel>Friends</NavLabel>
            </NavItem>

            <NavItem onClick={() => setActiveSection('settings')}>
                <NavIcon>⚙️</NavIcon>
                <NavLabel>Settings</NavLabel>
            </NavItem>

            <NavItem onClick={() => setActiveSection('profile')}>
                <NavIcon>👤</NavIcon>
                <NavLabel>Profile</NavLabel>
            </NavItem>
        </NavbarContainer>
    );
};


export default Sidebar;
