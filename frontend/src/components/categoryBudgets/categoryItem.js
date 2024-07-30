import React from "react";
import { dollar, trash } from "./../../utils/icons";
import StyledButton from "../button/styledButton";
import { deleteCategory } from "../../api/categories";
import { CategoryItemStyled } from "./categoryStyles";

function CategoryItem({
    id,
    name,
    budget_per_year,
    budget_per_month,
    budget_per_week,
    updateList,
    setUpdateList
}) {

    const handleDelete = () => {
        deleteCategory(id).then((response) => {
            console.log(response);
            setUpdateList(!updateList);
        });
    }

    return (
        <CategoryItemStyled>
            <div className="name-con">{name}</div>
            <div className="inner-content">
                <div className="budget">{dollar} {budget_per_year}</div>
                <div className="budget">{dollar} {budget_per_month}</div>
                <div className="budget">{dollar} {budget_per_week}</div>
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
                    onClick={handleDelete}
                    height={"60%"}
                    fontSize={"60%"}
                />
            </div>
        </CategoryItemStyled>
    )
}


export default CategoryItem;