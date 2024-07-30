import styled from "styled-components";

export const IncomesStyled = styled.div`
    display: flex;
    overflow: auto;
    .income-content{
        display: flex;
        gap: 2rem;
        .income-stats{
            flex: 1;
        }
    }
`;

export const IncomeFormStyled = styled.form`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    input{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        resize: none;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }
    .input-control{
        input{
            width: 100%;
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
