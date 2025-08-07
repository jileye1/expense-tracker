import styled from "styled-components";

// Base form container
export const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
`;

// Input control wrapper
export const InputControl = styled.div`
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    position: relative;

    .input-label {
        font-size: 0.9rem;
        font-weight: 600;
        color: var(--primary-color);
        margin-bottom: 0.25rem;
    }

    .input-hint {
        font-size: 0.8rem;
        color: rgba(34, 34, 96, 0.6);
        margin-top: 0.25rem;
    }

    .input-error {
        font-size: 0.8rem;
        color: var(--color-red);
        margin-top: 0.25rem;
        display: flex;
        align-items: center;
        gap: 0.25rem;
    }

    // Special hint for new categories, etc.
    .success-hint {
        margin-top: 0.5rem;
        padding: 0.5rem 0.75rem;
        background: rgba(66, 173, 0, 0.1);
        border: 1px solid rgba(66, 173, 0, 0.2);
        border-radius: 6px;
        font-size: 0.85rem;
        color: var(--color-green);
    }
`;

// Base input styles
const baseInputStyles = `
    width: 100%;
    border: 2px solid rgba(255, 255, 255, 0.8);
    border-radius: 8px;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    font-family: inherit;
    background: white;
    color: rgba(34, 34, 96, 0.9);
    transition: all 0.2s ease;
    outline: none;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);

    &::placeholder {
        color: rgba(34, 34, 96, 0.4);
    }

    &:focus {
        border-color: var(--color-accent);
        box-shadow: 0 0 0 3px rgba(200, 119, 247, 0.1);
    }

    &:disabled {
        background-color: #f3f4f6;
        border-color: rgba(34, 34, 96, 0.1);
        cursor: not-allowed;
        color: rgba(34, 34, 96, 0.5);
    }

    &.error {
        border-color: var(--color-red);
        box-shadow: 0 0 0 3px rgba(255, 0, 0, 0.1);
    }
`;

// Text input
export const Input = styled.input`
    ${baseInputStyles}

    &[type="number"] {
        -moz-appearance: textfield;
        
        &::-webkit-outer-spin-button,
        &::-webkit-inner-spin-button {
            -webkit-appearance: none;
            margin: 0;
        }
    }
`;

// Textarea
export const Textarea = styled.textarea`
    ${baseInputStyles}
    resize: vertical;
    min-height: 80px;
    font-family: inherit;
`;

// Select wrapper for custom styling
export const SelectWrapper = styled.div`
    position: relative;
    width: 100%;

    select {
        ${baseInputStyles}
        appearance: none;
        background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%236b7280' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
        background-position: right 0.75rem center;
        background-repeat: no-repeat;
        background-size: 1rem;
        padding-right: 2.5rem;
        cursor: pointer;

        &:focus {
            background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' fill='none' viewBox='0 0 20 20'%3e%3cpath stroke='%23c877f7' stroke-linecap='round' stroke-linejoin='round' stroke-width='1.5' d='m6 8 4 4 4-4'/%3e%3c/svg%3e");
        }
    }
`;

// Button group for form actions
export const ButtonGroup = styled.div`
    display: flex;
    gap: 1rem;
    justify-content: flex-end;
    margin-top: 1rem;
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

    @media screen and (max-width: 480px) {
        flex-direction: column-reverse;
        
        button {
            width: 100%;
        }
    }
`;

// React-Select custom styles (exportable object)
export const reactSelectStyles = {
    control: (provided, state) => ({
        ...provided,
        border: '2px solid rgba(255, 255, 255, 0.8)',
        borderRadius: '8px',
        padding: '0.125rem 0.25rem',
        fontSize: '1rem',
        minHeight: '48px',
        background: 'white',
        boxShadow: state.isFocused 
            ? '0 0 0 3px rgba(200, 119, 247, 0.1)' 
            : '0px 1px 15px rgba(0, 0, 0, 0.06)',
        borderColor: state.isFocused ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.8)',
        '&:hover': {
            borderColor: state.isFocused ? 'var(--color-accent)' : 'rgba(255, 255, 255, 0.8)'
        },
        transition: 'all 0.2s ease'
    }),
    placeholder: (provided) => ({
        ...provided,
        color: 'rgba(34, 34, 96, 0.4)'
    }),
    singleValue: (provided) => ({
        ...provided,
        color: 'rgba(34, 34, 96, 0.9)'
    }),
    input: (provided) => ({
        ...provided,
        color: 'rgba(34, 34, 96, 0.9)'
    }),
    menu: (provided) => ({
        ...provided,
        borderRadius: '8px',
        boxShadow: '0px 4px 20px rgba(0, 0, 0, 0.1)',
        border: '1px solid rgba(200, 119, 247, 0.2)',
        zIndex: 1000
    }),
    menuList: (provided) => ({
        ...provided,
        padding: 0
    }),
    option: (provided, state) => ({
        ...provided,
        backgroundColor: state.isSelected 
            ? 'var(--color-accent)' 
            : state.isFocused 
                ? 'rgba(200, 119, 247, 0.1)' 
                : 'white',
        color: state.isSelected ? 'white' : 'rgba(34, 34, 96, 0.9)',
        padding: '0.75rem 1rem',
        cursor: 'pointer',
        '&:hover': {
            backgroundColor: state.isSelected 
                ? 'var(--color-accent)' 
                : 'rgba(200, 119, 247, 0.1)'
        }
    }),
    loadingIndicator: (provided) => ({
        ...provided,
        color: 'var(--color-accent)'
    }),
    clearIndicator: (provided) => ({
        ...provided,
        color: 'rgba(34, 34, 96, 0.4)',
        '&:hover': {
            color: 'rgba(34, 34, 96, 0.6)'
        }
    }),
    dropdownIndicator: (provided) => ({
        ...provided,
        color: 'rgba(34, 34, 96, 0.4)',
        '&:hover': {
            color: 'rgba(34, 34, 96, 0.6)'
        }
    })
};

// DatePicker wrapper styles
export const DatePickerWrapper = styled.div`
    .react-datepicker-wrapper {
        width: 100%;
        
        input {
            ${baseInputStyles}
        }
    }

    .react-datepicker__tab-loop {
        z-index: 1001;
    }
`;