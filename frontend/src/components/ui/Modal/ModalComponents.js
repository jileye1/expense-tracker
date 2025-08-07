import styled, { keyframes } from "styled-components";

// Animations
const fadeIn = keyframes`
    from {
        opacity: 0;
    }
    to {
        opacity: 1;
    }
`;

const slideUp = keyframes`
    from {
        opacity: 0;
        transform: translateY(20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

const slideDown = keyframes`
    from {
        opacity: 0;
        transform: translateY(-20px);
    }
    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

// Modal overlay/backdrop
export const ModalOverlay = styled.div`
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    backdrop-filter: blur(4px);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 2000;
    animation: ${fadeIn} 0.2s ease-out;

`;

// Base modal content
export const ModalContent = styled.div`
    background: rgba(252, 246, 249, 0.95);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 20px;
    padding: 2rem;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0px 20px 60px rgba(0, 0, 0, 0.2);
    position: relative;
    animation: ${slideUp} 0.3s ease-out;

    /* Size variants */
    &.small {
        max-width: 400px;
    }

    &.medium {
        max-width: 500px;
    }

    &.large {
        max-width: 700px;
    }

    &.extra-large {
        max-width: 900px;
    }

    &.full-width {
        max-width: 95%;
    }


    /* Animation variants */
    /* &.slide-up {
        animation: {slideUp} 0.3s ease-out;
    }

    &.slide-down {
        animation: {slideDown} 0.3s ease-out;
    }

    &.fade {
        animation: {fadeIn} 0.3s ease-out;
    } */

    /* Responsive */
    @media screen and (max-width: 768px) {
        width: 95%;
        padding: 1.5rem;
        margin: 1rem;
        border-radius: 16px;
    }

    @media screen and (max-width: 480px) {
        width: 95%;
        padding: 1rem;
        margin: 0.5rem;
        border-radius: 12px;
        max-height: 95vh;
    }

    /* Scrollbar styling */
    &::-webkit-scrollbar {
        width: 6px;
    }

    &::-webkit-scrollbar-track {
        background: rgba(255, 255, 255, 0.1);
        border-radius: 3px;
    }

    &::-webkit-scrollbar-thumb {
        background: var(--color-accent);
        border-radius: 3px;
        
        &:hover {
            background: rgba(200, 119, 247, 0.8);
        }
    }
`;

// Modal header
export const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid rgba(255, 255, 255, 0.3);
    
    h1, h2, h3 {
        color: var(--primary-color);
        margin: 0;
        font-size: 1.5rem;
        font-weight: 600;
    }

    h3 {
        font-size: 1.3rem;
    }

    .subtitle {
        color: rgba(34, 34, 96, 0.6);
        font-size: 0.9rem;
        margin-top: 0.25rem;
    }

    &.no-border {
        border-bottom: none;
        padding-bottom: 0;
    }
`;

// Modal body
export const ModalBody = styled.div`
    flex: 1;
    
    &.scrollable {
        max-height: 60vh;
        overflow-y: auto;
        padding-right: 0.5rem;
        margin-right: -0.5rem;
    }
`;

// Modal footer
export const ModalFooter = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 2rem;
    padding-top: 1rem;
    border-top: 1px solid rgba(255, 255, 255, 0.3);

    &.center {
        justify-content: center;
    }

    &.start {
        justify-content: flex-start;
    }

    &.space-between {
        justify-content: space-between;
    }

    &.no-border {
        border-top: none;
        padding-top: 0;
    }

    @media screen and (max-width: 480px) {
        flex-direction: column-reverse;
        
        button {
            width: 100%;
        }
    }
`;

// Close button
export const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s ease;
    color: var(--primary-color);
    /* width: 36px;
    height: 36px;
    flex-shrink: 0; */

    &:hover {
        background: rgba(34, 34, 96, 0.1);
        transform: scale(1.05);
    }

    &:active {
        transform: scale(0.95);
    }

    svg, i {
        font-size: 1.2rem;
    }

    /* Position variants */
    /* &.absolute {
        position: absolute;
        top: 1rem;
        right: 1rem;
        z-index: 1;
    } */
`;

// Confirmation modal styles
// export const ConfirmationContent = styled.div`
//     text-align: center;
//     padding: 1rem 0;

//     .icon {
//         font-size: 3rem;
//         margin-bottom: 1rem;
        
//         &.warning {
//             color: #f59e0b;
//         }
        
//         &.danger {
//             color: var(--color-red);
//         }
        
//         &.success {
//             color: var(--color-green);
//         }
        
//         &.info {
//             color: var(--color-accent);
//         }
//     }

//     h3 {
//         margin-bottom: 0.5rem;
//         color: var(--primary-color);
//     }

//     p {
//         color: rgba(34, 34, 96, 0.7);
//         margin-bottom: 1.5rem;
//         line-height: 1.5;
//     }
// `;

// Loading content
// export const LoadingContent = styled.div`
//     display: flex;
//     flex-direction: column;
//     align-items: center;
//     justify-content: center;
//     padding: 2rem;
//     text-align: center;

//     .spinner {
//         width: 40px;
//         height: 40px;
//         border: 3px solid rgba(200, 119, 247, 0.2);
//         border-top: 3px solid var(--color-accent);
//         border-radius: 50%;
//         animation: spin 1s linear infinite;
//         margin-bottom: 1rem;
//     }

//     p {
//         color: rgba(34, 34, 96, 0.7);
//         margin: 0;
//     }

//     @keyframes spin {
//         0% { transform: rotate(0deg); }
//         100% { transform: rotate(360deg); }
//     }
// `;