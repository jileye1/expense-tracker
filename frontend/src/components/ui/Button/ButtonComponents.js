import styled from "styled-components";

// Base button styles
const baseButtonStyles = `
    display: inline-flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-family: inherit;
    font-size: 1rem;
    font-weight: 500;
    cursor: pointer;
    transition: all 0.2s ease;
    text-decoration: none;
    position: relative;
    overflow: hidden;

    &:disabled {
        cursor: not-allowed;
        opacity: 0.6;
        transform: none !important;
    }

    &:not(:disabled):hover {
        transform: translateY(-1px);
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }

    &:not(:disabled):active {
        transform: translateY(0);
        box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    }
`;

// Primary button
export const PrimaryButton = styled.button`
    ${baseButtonStyles}
    background: var(--color-accent);
    color: white;
    box-shadow: 0 2px 8px rgba(200, 119, 247, 0.3);

    &:not(:disabled):hover {
        background: rgba(200, 119, 247, 0.9);
        box-shadow: 0 4px 16px rgba(200, 119, 247, 0.4);
    }
`;

// Secondary button
export const SecondaryButton = styled.button`
    ${baseButtonStyles}
    background: rgba(255, 255, 255, 0.9);
    color: var(--primary-color);
    border: 2px solid rgba(255, 255, 255, 0.8);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);

    &:not(:disabled):hover {
        background: white;
        border-color: var(--color-accent);
        color: var(--color-accent);
    }
`;

// Danger button
export const DangerButton = styled.button`
    ${baseButtonStyles}
    background: var(--color-red);
    color: white;
    box-shadow: 0 2px 8px rgba(255, 0, 0, 0.3);

    &:not(:disabled):hover {
        background: rgba(255, 0, 0, 0.9);
        box-shadow: 0 4px 16px rgba(255, 0, 0, 0.4);
    }
`;

// Success button
export const SuccessButton = styled.button`
    ${baseButtonStyles}
    background: var(--color-green);
    color: white;
    box-shadow: 0 2px 8px rgba(66, 173, 0, 0.3);

    &:not(:disabled):hover {
        background: rgba(66, 173, 0, 0.9);
        box-shadow: 0 4px 16px rgba(66, 173, 0, 0.4);
    }
`;

// Ghost button
export const GhostButton = styled.button`
    ${baseButtonStyles}
    background: transparent;
    color: var(--primary-color);
    border: 2px solid transparent;

    &:not(:disabled):hover {
        background: rgba(34, 34, 96, 0.05);
        border-color: rgba(34, 34, 96, 0.1);
    }
`;

// Outline button
export const OutlineButton = styled.button`
    ${baseButtonStyles}
    background: transparent;
    color: var(--color-accent);
    border: 2px solid var(--color-accent);

    &:not(:disabled):hover {
        background: var(--color-accent);
        color: white;
    }
`;

// Icon button
export const IconButton = styled.button`
    display: inline-flex;
    align-items: center;
    justify-content: center;
    padding: 0.5rem;
    border: none;
    border-radius: 50%;
    background: transparent;
    color: var(--primary-color);
    cursor: pointer;
    transition: all 0.2s ease;
    width: 36px;
    height: 36px;

    &:hover:not(:disabled) {
        background: rgba(34, 34, 96, 0.1);
        transform: scale(1.05);
    }

    &:active:not(:disabled) {
        transform: scale(0.95);
    }

    &:disabled {
        cursor: not-allowed;
        opacity: 0.5;
    }

    /* Variants */
    &.primary {
        background: var(--color-accent);
        color: white;

        &:hover:not(:disabled) {
            background: rgba(200, 119, 247, 0.9);
        }
    }

    &.danger {
        color: var(--color-red);

        &:hover:not(:disabled) {
            background: rgba(255, 0, 0, 0.1);
        }
    }

    &.success {
        color: var(--color-green);

        &:hover:not(:disabled) {
            background: rgba(66, 173, 0, 0.1);
        }
    }
`;

// Floating action button
export const FloatingButton = styled.button`
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 56px;
    height: 56px;
    border-radius: 50%;
    border: none;
    background: var(--color-accent);
    color: white;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 4px 20px rgba(200, 119, 247, 0.4);
    transition: all 0.2s ease;
    z-index: 1000;

    &:hover:not(:disabled) {
        transform: scale(1.1);
        box-shadow: 0 6px 24px rgba(200, 119, 247, 0.5);
    }

    &:active:not(:disabled) {
        transform: scale(1.05);
    }

    svg, i {
        font-size: 1.5rem;
    }

    @media screen and (max-width: 768px) {
        bottom: 1.5rem;
        right: 1.5rem;
        width: 48px;
        height: 48px;

        svg, i {
            font-size: 1.25rem;
        }
    }
`;

// Button with loading state
export const LoadingButton = styled.button`
    ${baseButtonStyles}
    background: ${props => props.loading ? 'var(--color-grey)' : props.variant === 'danger' ? 'var(--color-red)' : 'var(--color-accent)'};
    color: white;
    box-shadow: 0 2px 8px ${props => props.loading ? 'rgba(170, 170, 170, 0.3)' : props.variant === 'danger' ? 'rgba(255, 0, 0, 0.3)' : 'rgba(200, 119, 247, 0.3)'};

    .loading-spinner {
        width: 16px;
        height: 16px;
        border: 2px solid rgba(255, 255, 255, 0.3);
        border-top: 2px solid white;
        border-radius: 50%;
        animation: spin 1s linear infinite;
    }

    @keyframes spin {
        0% { transform: rotate(0deg); }
        100% { transform: rotate(360deg); }
    }
`;

// Button size variants (can be applied to any button)
export const buttonSizes = {
    small: `
        padding: 0.5rem 1rem;
        font-size: 0.875rem;
    `,
    medium: `
        padding: 0.75rem 1.5rem;
        font-size: 1rem;
    `,
    large: `
        padding: 1rem 2rem;
        font-size: 1.125rem;
    `
};