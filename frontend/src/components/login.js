import styled from "styled-components";
export function Login() {
    return (
        <>
            <LoginDiv>
                <h1>LOGIN</h1>
                <input type="email" name="email" placeholder="type in email" />
                <input
                    type="password"
                    name="password"
                    placeholder="type in password"
                />
                <button>Login</button>
                <h3>Don't have account?</h3>
                <button>Sign up</button>
            </LoginDiv>
        </>
    );
}

// styled components (just for now)
const LoginDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;
