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
