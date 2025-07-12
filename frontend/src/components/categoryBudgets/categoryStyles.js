import styled from "styled-components";

export const CategoryIndexStyled = styled.div`
    display: flex;
    flex-direction: column;
    gap: 2rem;
    height: 100vh;
    margin: 0;
    padding: 0;
    .stats-content{
        justify-content: flex-end;
        display: flex;
        margin-bottom: 20px;
        .income-con{
            background: #FCF6F9;
            border: 2px solid #FFFFFF;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            padding: 1rem;
            border-radius: 20px;
            display: flex;
            justify-content: space-between;
            align-items: center;
            width: 25%;
        }
    }
    .add-category{
        margin-top: auto;
        margin-bottom: 100px;
        margin-left: auto;
        margin-right: 25px;
        button{
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`;

export const CategoryItemStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 1px;
    padding: 1rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    align-content: space-between;
    height: 50px;
    .name-con{
        gap: 0.5rem;
        color: var(--primary-color);
        font-size: 1.0rem;
        flex: 4;
    }
    .inner-content{
        display: flex;
        flex: 12;
        font-size: 1.0rem;
        justify-content: stretch;
        .budget{
            display: flex;
            align-items: center;
            gap: 0.1rem;
            color: var(--primary-color);
            opacity: 0.8;
            justify-content: start;
            flex: 1;
        }
    }
    .btn-con{
        display: flex;
        flex: 1;
        justify-content: flex-end;
        align-content: center;
    }
`;

export const HeadingsStyled = styled.div`
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    align-content: space-between;
    font-weight: bold;
    .name-con{
        gap: 0.5rem;
        color: var(--primary-color);
        font-size: 1.0rem;
        flex: 4;
    }
    .inner-content{
        display: flex;
        flex: 12;
        font-size: 1.0rem;
        justify-content: stretch;
        .budget{
            display: flex;
            align-items: center;
            gap: 0.1rem;
            color: var(--primary-color);
            opacity: 0.8;
            justify-content: start;
            flex: 1;
        }
    }
    .btn-con{
        display: flex;
        flex: 1;
        justify-content: flex-end;
    }
`;

export const TotalsStyled = styled.div`
    background: #ecd4fa;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 20px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    align-content: space-between;
    font-weight: bold;
    .name-con{
        gap: 0.5rem;
        color: var(--primary-color);
        font-size: 1.3rem;
        flex: 4;
    }
    .inner-content{
        display: flex;
        flex: 12;
        font-size: 1.0rem;
        justify-content: stretch;
        .budget{
            display: flex;
            align-items: center;
            gap: 0.1rem;
            color: var(--primary-color);
            opacity: 0.8;
            justify-content: start;
            flex: 1;
        }
    }
    .btn-con{
        display: flex;
        flex: 1;
        justify-content: flex-end;
    }
`;