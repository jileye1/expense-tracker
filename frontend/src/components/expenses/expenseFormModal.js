import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import { postExpense } from "../../api/expenses";
import { getCategories } from "../../api/categories";
import StyledButton from "../button/styledButton";
import { plus, close } from "../../utils/icons";

function ExpenseFormModal({ isOpen, onClose, updateList, setUpdateList }) {
    const [newExpense, setNewExpense] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    });

    const [categories, setCategories] = useState([]);
    const [loadingCategories, setLoadingCategories] = useState(false);

    const { title, amount, date, category, description } = newExpense;

    // Fetch categories when modal opens
    useEffect(() => {
        if (isOpen) {
            setLoadingCategories(true);
            getCategories()
                .then(response => {
                    console.log('Categories fetched:', response.data);
                    setCategories(response.data || []);     
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                    setCategories([]);
                })
                .finally(() => setLoadingCategories(false));
        }
    }, [isOpen]);

    // Close modal on escape key
    useEffect(() => {
        const handleEscape = (e) => {
            if (e.key === 'Escape') {
                onClose();
            }
        };

        if (isOpen) {
            document.addEventListener('keydown', handleEscape);
            document.body.style.overflow = 'hidden'; // Prevent background scroll
        }

        return () => {
            document.removeEventListener('keydown', handleEscape);
            document.body.style.overflow = 'unset';
        };
    }, [isOpen, onClose]);

    const handleInput = name => e => {
        setNewExpense({...newExpense, [name]: e.target.value});
    };

    const handleSubmit = e => {
        e.preventDefault();
        postExpense(newExpense).then((response) => {
            console.log(response);
            setUpdateList(!updateList);
            onClose(); // Close modal after successful submission
        });
        setNewExpense({
            title: '',
            amount: '',
            date: '',
            category: '',
            description: '',
        });
    };

    const handleBackdropClick = (e) => {
        if (e.target === e.currentTarget) {
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <ModalOverlay onClick={handleBackdropClick}>
            <ModalContent onClick={(e) => e.stopPropagation()}>
                <ModalHeader>
                    <h2>Add New Expense</h2>
                    <CloseButton onClick={onClose}>
                        {close}
                    </CloseButton>
                </ModalHeader>
                
                <ExpenseFormStyled onSubmit={handleSubmit}>
                    <div className="input-control">
                        <input 
                            type='text'
                            value={title}
                            name={'title'}
                            placeholder="Expense title"
                            onChange={handleInput('title')}
                            required
                        />
                    </div>
                    <div className="input-control">
                        <input 
                            type='number'
                            value={amount}
                            name={'amount'}
                            placeholder="Amount"
                            onChange={handleInput('amount')}
                            step="0.01"
                            required
                        />
                    </div>
                    <div className="input-control">
                        <DatePicker 
                            id='date'
                            placeholderText="Select date"
                            selected={date}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date) => {
                                setNewExpense({...newExpense, date: date})
                            }} 
                            required
                        />
                    </div>
                    <div className="selects input-control">
                        <select 
                            required 
                            value={category} 
                            name="category" 
                            id="category"
                            onChange={handleInput('category')}
                            disabled={loadingCategories}
                        >
                            <option value="" disabled>
                                {loadingCategories ? 'Loading categories...' : 'Select a category'}
                            </option>
                            {categories.map((cat) => (
                                <option key={cat.id} value={cat.name}>
                                    {cat.name}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div className="input-control">
                        <textarea 
                            name="description"
                            value={description}
                            placeholder="Add a description (optional)"
                            id="description"
                            cols="30"
                            rows="3"
                            onChange={handleInput('description')}
                        />
                    </div>
                    <div className="button-group">
                        <StyledButton
                            name={'Cancel'}
                            onClick={onClose}
                            bg={'var(--color-grey)'}
                            bPadding={'.8rem 2rem'}
                            bRadius={'8px'}
                            color={'#fff'}
                            type="button"
                        />
                        <StyledButton
                            name={'Save'}
                            bPadding={'.8rem 2rem'}
                            bRadius={'8px'}
                            bg={'var(--color-accent)'}
                            color={'#fff'}
                            type="submit"
                        />
                    </div>
                </ExpenseFormStyled>
            </ModalContent>
        </ModalOverlay>
    );
}

const ModalOverlay = styled.div`
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
    animation: fadeIn 0.2s ease-out;

    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
`;

const ModalContent = styled.div`
    background: rgba(252, 246, 249, 0.95);
    border: 3px solid #FFFFFF;
    backdrop-filter: blur(4.5px);
    border-radius: 20px;
    padding: 2rem;
    max-width: 500px;
    width: 90%;
    max-height: 90vh;
    overflow-y: auto;
    box-shadow: 0px 20px 60px rgba(0, 0, 0, 0.2);
    animation: slideUp 0.3s ease-out;

    @keyframes slideUp {
        from {
            opacity: 0;
            transform: translateY(20px);
        }
        to {
            opacity: 1;
            transform: translateY(0);
        }
    }

    @media screen and (max-width: 768px) {
        width: 95%;
        padding: 1.5rem;
        margin: 1rem;
    }
`;

const ModalHeader = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 2rem;
    
    h2 {
        color: var(--primary-color);
        margin: 0;
        font-size: 1.5rem;
    }
`;

const CloseButton = styled.button`
    background: none;
    border: none;
    cursor: pointer;
    padding: 0.5rem;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: background-color 0.2s ease;

    &:hover {
        background: rgba(34, 34, 96, 0.1);
    }

    i, svg {
        font-size: 1.2rem;
        color: var(--primary-color);
    }
`;

const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 1.5rem;

    .input-control {
        input, textarea, select {
            width: 100%;
            border: 2px solid rgba(255, 255, 255, 0.8);
            border-radius: 8px;
            padding: 0.75rem 1rem;
            font-size: 1rem;
            transition: border-color 0.2s ease;

            &:focus {
                border-color: var(--color-accent);
                outline: none;
            }
        }

        .react-datepicker-wrapper {
            width: 100%;
            
            input {
                width: 100%;
            }
        }
    }

    .selects {
        select {
            color: rgba(34, 34, 96, 0.6);
            
            &:focus, &:valid {
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .button-group {
        display: flex;
        gap: 1rem;
        justify-content: flex-end;
        margin-top: 1rem;

        @media screen and (max-width: 480px) {
            flex-direction: column-reverse;
        }
    }
`;

export default ExpenseFormModal;