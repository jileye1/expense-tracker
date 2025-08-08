import styled from "styled-components";

export const MainLayout = styled.div`
    padding: 2rem;
    height: 100vh;
    display: flex;
    gap: 2rem;
    overflow: hidden;

    @media screen and (max-width: 900px) {
        padding: 1.5rem;
        gap: 1.5rem;
    }

    @media screen and (max-width: 768px) {
        padding: 1rem;
        gap: 1rem;
    }
`;

export const InnerLayout = styled.div`
    padding: 2rem 3rem;
    width: 100%;

    @media screen and (max-width: 768px) {
        padding: 1rem;
    }
`;