import React from 'react';
import styled from 'styled-components';

function Login({ handleLogin }) {
    return (
        <LoginDiv>
            <h1>LOGIN</h1>
            <input type="email" name="email" placeholder="type in email" />
            <input
                type="password"
                name="password"
                placeholder="type in password"
            />
<button onClick={handleLogin}>Login</button>
            <h3>Don't have an account?</h3>
            <button>Sign up</button>
        </LoginDiv>
    );
}

const LoginDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default Login;
