import React from 'react';
import styled from 'styled-components';

const Avatar = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    background-color: purple;
    margin-right: 15px;
    display: inline-block;
`;

function Friends({ friendsData }) {
    return (
        <div>
            <h2>Friends List</h2>
            <ul>
                {Object.keys(friendsData).map(friendName => (
                    <li key={friendName} style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
<Avatar color={friendsData[friendName].color} />                        {friendName}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default Friends;

