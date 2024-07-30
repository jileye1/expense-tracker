import React, { useState } from "react";
import StyledButton from "../button/styledButton";
import { postCategory } from "../../api/categories";
import { trash } from "../../utils/icons";
import styled from "styled-components";

function CategoryInput({updateList, setUpdateList}) {

    const [newCategory, setNewCategory] = useState({
        name: '',
        budget_per_year: '',
        budget_per_month: '',
        budget_per_week: '',
    })

    const { name, budget_per_year, budget_per_month, budget_per_week } = newCategory;

    const handleInput = name => e => {
        setNewCategory({...newCategory, [name]: e.target.value});
    }

    const handleSave = () => {
        postCategory(newCategory).then((response) => {
            console.log(response);
            setUpdateList(!updateList);
        });
    }

    return (
        <CategoryInputStyled>
            <div className="name-con">
                <input 
                    type='text'
                    value={name}
                    name={'name'}
                    placeholder="Name"
                    onChange={handleInput('name')}
                />
            </div>
            <div className="inner-content">
                <input className="budget"
                    type='text'
                    value={budget_per_year}
                    name={'budget_per_year'}
                    placeholder="per year"
                    onChange={handleInput('budget_per_year')}
                />
                <input className="budget"
                    type='text'
                    value={budget_per_month}
                    name={'budget_per_month'}
                    placeholder="per month"
                    onChange={handleInput('budget_per_month')}
                />
                <input className="budget"
                    type='text'
                    value={budget_per_week}
                    name={'budget_per_week'}
                    placeholder="per week"
                    onChange={handleInput('budget_per_week')}
                />
            </div>
            <div className="btn-con">
                <StyledButton
                    icon={trash}
                    bPadding={'0.4rem'}
                    bRadius={'50%'}
                    bg={'var(--primary-color'}
                    color={'#fff'}
                    iColor={'#fff'}
                    hColor={'var(--color-green)'}
                    onClick={handleSave}
                    height={"60%"}
                    fontSize={"60%"}
                />
            </div>
        </CategoryInputStyled>
    )
}

const CategoryInputStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    border-radius: 1px;
    padding: 1rem;
    margin-bottom: 1rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    width: 100%;
    color: #222260;
    align-content: space-between;

    input{
        font-family: inherit;
        font-size: inherit;
        outline: none;
        border: none;
        padding: .5rem 1rem;
        border-radius: 5px;
        border: 2px solid #fff;
        background: transparent;
        box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
        color: rgba(34, 34, 96, 0.9);
        &::placeholder{
            color: rgba(34, 34, 96, 0.4);
        }
    }

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

export default CategoryInput;