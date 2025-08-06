import React, { useState } from "react";
import StyledButton from "../button/styledButton";
import { postCategory } from "../../api/categories";
import styled from "styled-components";

function CategoryInput({updateList, setUpdateList, setCreateCategoryEnabled}) {

    const [newCategory, setNewCategory] = useState({
        name: '',
        budget_per_year: '',
        budget_per_month: '',
        budget_per_week: '',
    })

    const [enableSave, setEnableSave] = useState("hidden");

    const { name, budget_per_year, budget_per_month, budget_per_week } = newCategory;

    const handleInput = name => e => {

        const updatedCategory = {...newCategory, [name]: e.target.value};
        setNewCategory(updatedCategory);

        if(updatedCategory.name && (updatedCategory.budget_per_year || updatedCategory.budget_per_month || updatedCategory.budget_per_week)) {
            setEnableSave("visible");
        } else {
            setEnableSave("hidden");
        }
    }

    const handleSave = () => {
        postCategory(newCategory).then((response) => {
            console.log(response.data);
            setUpdateList(!updateList);
        });
        setCreateCategoryEnabled(false);
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
                    name={'Save'}
                    bPadding={'.1rem .1rem'}
                    bRadius={'20px'}
                    bg={'var(--primary-color'}
                    color={'#fff'}
                    onClick={handleSave}
                    fontSize={"60%"}
                    isVisible={enableSave}
                />
                <StyledButton
                    name={'Cancel'}
                    bPadding={'.2rem .5rem'}
                    bRadius={'20px'}
                    bg={'var(--color-grey'}
                    color={'#fff'}
                    onClick={() => setCreateCategoryEnabled(false)}
                    fontSize={"60%"}
                />
            </div>
        </CategoryInputStyled>
    )
}

const CategoryInputStyled = styled.div`

    padding: 0.1rem;
    margin-bottom: 0.5rem;
    display: flex;
    align-items: center;
    gap: 0.3rem;
    width: 100%;
    color: #222260;
    align-content: space-between;
    height: 50px;

    input{
        width: 100%; 
        min-width: 0;
        background: white;
        border: 1px solid #27168847;
    }

    .name-con{
        color: var(--primary-color);
        font-size: 1.0rem;
        flex: 4;
    }
    .inner-content{
        display: flex;
        flex: 12;
        font-size: 1.0rem;
        justify-content: stretch;
        gap: 0.3rem;
        .budget{
            display: flex;
            align-items: center;
            padding-right: 1rem;
            color: var(--primary-color);
            opacity: 0.8;
            justify-content: start;
            flex: 1;
        }
    }
    .btn-con{
        gap: 0.2rem;
        display: flex;
        padding-left: 1rem;
        flex-direction: column;
        flex: 1;
        justify-content: space-between;
        justify-items: right;
        min-width: 0;
        button{
            justify-content: center;
            box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
            &:hover{
                background: var(--color-green) !important;
            }
        }
    }
`;

export default CategoryInput;