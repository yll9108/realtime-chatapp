import styled from "styled-components";

function SignUp() {
    return (
        <>
            <SignUpDiv>
                <h1>Sign up</h1>
                <input
                    type="userName"
                    name="userName"
                    placeholder="type in userName"
                />
                <input type="email" name="email" placeholder="type in email" />
                <input
                    type="password"
                    name="password"
                    placeholder="type in password"
                />

                <button>Sign Up</button>
            </SignUpDiv>
        </>
    );
}

const SignUpDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default SignUp;
