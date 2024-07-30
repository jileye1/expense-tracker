import React from "react";
import { dollar, calendar, comment, trash } from "./../../utils/icons";
import StyledButton from "../button/styledButton";
import { ExpenseListItemStyled } from "./expenseStyles";
import { deleteExpense } from "./../../api/expenses";
import { dateFormat } from "../../utils/dateFormat";

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
            <div className="title-con">{title}</div>
            <div className="inner-content">
                <div className="amount-con">{dollar} {amount}</div>
                <div className="date-con">{calendar} {dateFormat(date)}</div>
                <div className="description-con">{comment} {description}</div>
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
        </ExpenseListItemStyled>
    )
}


export default ExpenseListItem;