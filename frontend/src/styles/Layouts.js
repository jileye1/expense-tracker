import styled from "styled-components";

export const MainLayout = styled.div`
    padding: 2rem;
    height: 100%;
    display: flex;
    gap: 2rem;

    @media screen and (max-width: 900px) {
        padding: 1.5rem;
        gap: 1.5rem;
    }

    @media screen and (max-width: 768px) {
        // flex-direction: column;
        padding: 1rem;
        gap: 1rem;
        // height: auto;
        // min-height: 100vh;
    }
`;

export const InnerLayout = styled.div`
    padding: 2rem 1.5rem;
    width: 100%;

    @media screen and (max-width: 768px) {
        padding: 1rem;
    }
`;