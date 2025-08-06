import React, { useState, useEffect } from "react";
import styled from "styled-components";
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import CreatableSelect from 'react-select/creatable';
import { postExpense, updateExpense } from "../../api/expenses";
import { getCategories } from "../../api/categories";
import StyledButton from "../button/styledButton";
import { close } from "../../utils/icons";

function ExpenseFormModal({ isOpen, onClose, expense = null, updateList, setUpdateList }) {

    const isEditMode = Boolean(expense);
    const [formData, setFormData] = useState({
        title: '',
        amount: '',
        date: '',
        category: '',
        description: '',
    });

    const [categories, setCategories] = useState([]);
    const [selectCategoryOptions, setSelectCategoryOptions] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [loadingCategories, setLoadingCategories] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const { title, amount, date, category, description } = formData;

    // Set form data when modal opens
    useEffect(() => {
        if (isOpen) {
            if (isEditMode && expense) {
                setFormData({
                    title: expense.title || '',
                    amount: expense.amount || '',
                    date: new Date(expense.date) || '',
                    category: expense.category.name || '',
                    description: expense.description || '',
                });
                if(expense.category) {
                    setSelectedCategory({ value: expense.category.name, label: expense.category.name });
                }
            } else {
                setFormData({
                    title: '',
                    amount: '',
                    date: '',
                    category: '',
                    description: '',
                });
                setSelectedCategory(null);
            }
        }
    }, [isOpen, isEditMode, expense]);

    // Fetch categories when modal opens
    useEffect(() => {
        if (isOpen) {
            setLoadingCategories(true);
            getCategories()
                .then(response => {
                    console.log('Categories fetched:', response.data);
                    const responseCategories = response.data || [];
                    setCategories(responseCategories);  
                    
                    // transform categories for react-select format
                    const options = responseCategories.map(cat => ({
                        value: cat.name,
                        label: cat.name
                    }));
                    setSelectCategoryOptions(options);
                })
                .catch(error => {
                    console.error('Error fetching categories:', error);
                    setCategories([]);
                    setSelectCategoryOptions([]);
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
        setFormData({...formData, [name]: e.target.value});
    };

    const handleCategoryChange = (selectedOption) => {
        setSelectedCategory(selectedOption);
        setFormData({
            ...formData,
            category: selectedOption ? selectedOption.value : ''
        });
    };

    const isNewCategory = (categoryName) => {
        return !selectCategoryOptions.some(option =>
            option.value.toLowerCase() == categoryName.toLowerCase()
        );
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        try {
            let response;

            if (isEditMode) {
                // Update existing expense
                response = await updateExpense(expense.id, formData);
                console.log('Expense updated:', response.data);
            } else {
                // use regular endpoint
                response = await postExpense(formData);
                console.log(response);
                console.log('Expense created:', response.data);
            }

            setUpdateList(!updateList); // Trigger re-fetch of expenses
            onClose(); // Close modal after submission

            // Reset form data
            if (!isEditMode) {
                setFormData({
                    title: '',
                    amount: '',
                    date: '',
                    category: '',
                    description: '',
                });
                setSelectedCategory(null);
            }
        } catch (error) {
            console.error(`Error ${isEditMode ? 'updating' : 'creating'} expense`, error);
            alert('Failed to save expense. Please try again.');
        } finally {
            setIsSubmitting(false);
        }
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
                    <h2>{isEditMode ? 'Edit Expense' : 'Add New Expense'}</h2>
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
                            disabled={isSubmitting}
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
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="input-control">
                        <DatePicker 
                            id='date'
                            placeholderText="Select date"
                            selected={date}
                            dateFormat="dd/MM/yyyy"
                            onChange={(date) => {
                                setFormData({...formData, date: date})
                            }} 
                            required
                            disabled={isSubmitting}
                        />
                    </div>
                    <div className="selects input-control">
                        <CreatableSelect 
                            value={selectedCategory}
                            onChange={handleCategoryChange}
                            options={selectCategoryOptions}
                            placeholder={loadingCategories ? 'Loading categories' : 'Select or create category'}
                            isDisabled={loadingCategories || isSubmitting}
                            isLoading={loadingCategories}
                            isClearable
                            formatCreateLabel={(inputValue) => `Create "${inputValue}"`}
                            noOptionsMessage={() => "No categories found"}
                        />
                        {selectedCategory && isNewCategory(selectedCategory.value) && (
                            <div className="new-category-hint">
                                <span>New category "{selectedCategory.value}" will be created</span>
                            </div>
                        )}
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
                            disabled={isSubmitting}
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
                            disabled={isSubmitting}
                        />
                        <StyledButton
                            name={
                                isSubmitting
                                    ? (isEditMode ? 'Saving...' : 'Adding...')
                                    : (isEditMode ? 'Save Changes' : 'Add Expense')
                            }
                            bPadding={'.8rem 2rem'}
                            bRadius={'8px'}
                            bg={isSubmitting ? 'var(--color-grey)' : 'var(--color-accent)'}
                            color={'#fff'}
                            type="submit"
                            disabled={isSubmitting}
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

        .new-category-hint {
            margin-top: 0.5rem;
            padding: 0.5rem 0.75rem;
            background: rgba(66, 173, 0, 0.1);
            border: 1px solid rgba(66, 173, 0, 0.2);
            border-radius: 6px;
            font-size: 0.85rem;
            color: var(--color-green);
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