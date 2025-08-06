import styled from "styled-components";

export const ExpensesStyled = styled.div`
    display: flex;
    overflow: auto;
    height: 100%;


    .expense-content{
        width: 100%;

        .expenses-list{
            width: 100%;
            max-width: 800px; //limit width for readability
            margin: 0 auto; // center the content
        }

        .list-header-container{
            display: flex;
            justify-content: space-between;
            align-items: center;
            margin: 1.5rem 0 1rem 0;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid rgba(255, 255, 255, 0.3);
            
            @media screen and (max-width: 768px) {
                flex-direction: column;
                align-items: flex-start;
                gap: 0.5rem;
            }
        }

        .list-header{
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--primary-color);
        }

        .list-total{
            font-size: 1.1rem;
            font-weight: 500;
            color: rgba(34, 34, 96, 0.7);
            
            .total-amount{
                font-weight: 700;
                color: var(--primary-color);
                font-size: 1.2rem;
            }
            
            @media screen and (max-width: 768px) {
                align-self: flex-end;
            }
        }

        .expenses-container{
            display: flex;
            flex-direction: column;
            gap: 0.25rem;
            margin-bottom: 5rem; // space for floating button

            // Empty state
            &.empty::before {
                content: "No expenses yet. Click the + button to add your first expense!";
                display: block;
                text-align: center;
                color: rgba(34, 34, 96, 0.5);
                font-style: italic;
                padding: 3rem 1rem;
                background: rgba(255, 255, 255, 0.3);
                border: 2px dashed rgba(34, 34, 96, 0.2);
                border-radius: 12px;
                margin: 2rem 0;
            }
        }
    }

    .filtering-options{
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }
`;


export const ExpenseFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    .input-control{
        input{
            width: 100%;
        }
    }

    .selects{
        display: flex;
        justify-content: flex-end;
        select{
            color: rgba(34, 34, 96, 0.4);
            &:focus, &:active{
                color: rgba(34, 34, 96, 1);
            }
        }
    }

    .submit-btn{
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`;

export const ExpenseListItemStyled = styled.div`
    background: #FFFFFF;
    border: 1px solid rgba(34, 34, 96, 0.08);
    box-shadow: 0px 2px 12px rgba(0, 0, 0, 0.06);
    border-radius: 6px;
    padding: 0.5rem 0.75rem;
    display: grid;
    grid-template-columns: 2fr 1fr 0.8fr 1.2fr 2fr 0.6fr;;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    transition: all 0.2s ease;
    font-size: 0.85rem;

    &.clickable {
        cursor: pointer;

        &:hover {
            background: rgba(252, 246, 249, 0.5);
            border-color: rgba(200, 119, 247, 0.3);
            box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
            transform: translateY(-1px);
        }

        &:active {
            transform: translateY(0);
            box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
        }
    }

    &:hover:not(.clickable) {
        background: rgba(252, 246, 249, 0.3);
        border-color: rgba(34, 34, 96, 0.12);
        box-shadow: 0px 2px 8px rgba(0, 0, 0, 0.04);
    }

    .expense-title{
        font-weight: 600;
        color: var(--primary-color);
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        font-size: 0.9rem;
    }

    .expense-category{
        background: rgba(197, 118, 237, 0.6);
        color: rgba(34, 34, 96, 0.7);
        font-size: 0.75rem;
        font-weight: 500;
        padding: 0.15rem 0.5rem;
        border-radius: 10px;
        text-transform: capitalize;
        text-align: center;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
        max-width: 100%;
    }

    .expense-amount{
        font-weight: 700;
        color: var(--primary-color);
        text-align: left;
        font-size: 0.9rem;

        .currency{
            font-weight: 500;
            color: rgba(34, 34, 96, 0.6);
            margin-right: 0.1rem;
        }
    }

    .expense-date{
        color: rgba(34, 34, 96, 0.7);
        font-size: 0.8rem;
        text-align: left;
        font-weight: 500;
    }

    .expense-description{
        color: rgba(34, 34, 96, 0.6);
        font-size: 0.8rem;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;

        .no-description{
            color: rgba(34, 34, 96, 0.6);
            font-style: italic;
        }
    }

    .expense-actions{
        display: flex;
        justify-content: flex-end;

        button{
            transition: all 0.2s ease;

            &:hover{
                background: rgba(244, 67, 54, 0.15) !important;
                transform: scale(1.05);
            }
        }
    }

    @media screen and (max-width: 1024px) {
        grid-template-columns: 2fr 1fr 0.7fr 1fr 1.5fr 0.6fr;
        gap: 0.6rem;
        padding: 0.45rem 0.6rem;
        font-size: 0.8rem;

        .expense-title{
            font-size: 0.9rem;
        }
        .expense-category{
            font-size: 0.75rem;
            padding: 0.15rem 0.5rem;
        }
        .expense-amount{
            font-size: 0.9rem;
        }
    }

    @media screen and (max-width: 768px) {
        display: flex;
        flex-direction: column;
        gap: 0.3rem;
        padding: 0.75rem;
        position: relative;

        .expense-title {
            font-size: 0.95rem;
            font-weight: 600;
            padding-right: 2.5rem; /* Make space for action button */
        }

        .expense-amount {
            position: absolute;
            top: 0.75rem;
            right: 2.5rem;
            font-size: 0.9rem;
            font-weight: 700;
        }

        .expense-date {
            font-size: 0.8rem;
            color: rgba(34, 34, 96, 0.6);
        } 
            
        .expense-category {
            align-self: flex-start;
            max-width: fit-content;
            font-size: 0.7rem;
            padding: 0.1rem 0.5rem;
        }

        .expense-description {
            font-size: 0.8rem;
            color: rgba(34, 34, 96, 0.6);
            margin-top: 0.1rem;
        }

        .expense-actions {
            position: absolute;
            top: 0.75rem;
            right: 0.75rem;
            
            button {
                padding: 0.2rem 0.2rem !important;
                font-size: 0.75rem !important;
            }
        }
    }

    @media screen and (max-width: 480px) {
        padding: 0.6rem;

        .expense-title {
            font-size: 0.9rem;
            padding-right: 2rem; /* Adjust for smaller screens */
        }

        .expense-amount {
            right: 2rem;
            font-size: 0.85rem;
        }

        .expense-actions {
            right: 0.6rem;
            top: 0.6rem;
        }
    }

`;