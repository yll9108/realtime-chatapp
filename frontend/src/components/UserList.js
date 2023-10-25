import React from 'react';
import styled from 'styled-components';

const UserListContainer = styled.div`
    width: 30%;
    background-color: #f0f0f0;
`;

const User = styled.div`
    display: flex;
    align-items: center;
    padding: 10px;
`;

const UserAvatar = styled.div`
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: purple; // Placeholder for user avatars
    margin-right: 10px;
`;

const UserList = () => {
    return (
        <UserListContainer>
            <User>
                <UserAvatar />
                <div className="user-info">
                    <h4>John</h4>
                </div>
            </User>
         
        </UserListContainer>
    );
};

export default UserList;
