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

        .list-header{
            font-size: 1.2rem;
            font-weight: 600;
            color: var(--primary-color);
            margin: 1.5rem 0 1rem 0;
            padding-bottom: 0.5rem;
            border-bottom: 2px solid rgba(255, 255, 255, 0.3);
        }

        .expenses-container{
            display: flex;
            flex-direction: column;
            gap: 1rem;
            margin-bottom: 5rem; // space for floating button
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
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    transition: all 0.2s ease;

    &:hover {
        transform: translateY(-2px);
        box-shadow: 0px 4px 20px rgba(0, 0, 0, 0.1);
    }

    .title-con{
        gap: 0.5rem;
        color: var(--primary-color);
        font-size: 1.0rem;
        font-weight: 600;
        flex: 4;
    }

    .inner-content{
        display: flex;
        flex: 12;
        font-size: 1.0rem;
        justify-content: stretch;

        .amount-con{
            display: flex;
            align-items: center;
            gap: 0.1rem;
            color: var(--primary-color);
            opacity: 0.8;
            justify-content: start;
            flex: 1.5;
            font-weight: 600;
        }

        .date-con{
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--primary-color);
            opacity: 0.8;
            justify-content: start;
            flex: 3;
        }

        .description-con{
            display: flex;
            align-items: center;
            gap: 0.5rem;
            color: var(--primary-color);
            opacity: 0.8;
            justify-content: start;
            flex: 5;
            overflow: hidden;
        }
    }

    .btn-con{
        display: flex;
        flex: 1;
        justify-content: flex-end;

        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-red) !important;
            }
        }
    }

    @media screen and (max-width: 768px) {
        flex-direction: column;
        align-items: flex-start;
        gap: 0.8rem;

        .inner-content{
            flex-direction: column;
            width: 100%;
            gap: 0.5rem;

            .amount-con, .date-con, .description-con{
                flex: none;
                width: 100%;
            }
        }

        .btn-con{
            width: 100%;
            justify-content: flex-end;
        }
    }

`;