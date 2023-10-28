import styled from "styled-components";

function ForgettingPW() {
    return (
        <>
            <ForgettingPWDiv>
                <h1>Forgot Password?</h1>
                <input type="email" name="email" placeholder="type in email" />
                <button>Sumbit</button>
            </ForgettingPWDiv>
        </>
    );
}

const ForgettingPWDiv = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

export default ForgettingPW;
