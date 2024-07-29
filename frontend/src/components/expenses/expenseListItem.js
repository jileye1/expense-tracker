import React from "react";
import { dollar, calendar, comment, trash } from "./../../utils/icons";
import StyledButton from "../button/styledButton";
import { ExpenseListItemStyled } from "./expenseStyles";
import { deleteExpense } from "./../../api/expenses";

function ExpenseListItem({
    id,
    title,
    amount,
    date,
    category,
    description,
    type,
    updateList,
    setUpdateList
}) {

    const handleDelete = () => {
        deleteExpense(id).then((response) => {
            console.log(response);
            setUpdateList(!updateList);
        });
    }

    return (
        <ExpenseListItemStyled>
            <div className="title-con">
                <h5>{title}</h5>
                <p>{dollar} {amount}</p>
            </div>
            <div className="inner-content">
                <div className="text">
                    <p>{calendar} {date}</p>
                    <p>{comment} {description}</p>
                </div>
                <div className="btn-con">
                    <StyledButton
                        icon={trash}
                        bPadding={'1rem'}
                        bRadius={'50%'}
                        bg={'var(--primary-color'}
                        color={'#fff'}
                        iColor={'#fff'}
                        hColor={'var(--color-green)'}
                        onClick={handleDelete}
                    />
                </div>
            </div>
        </ExpenseListItemStyled>
    )
}


export default ExpenseListItem;