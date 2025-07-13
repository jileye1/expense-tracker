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

    const formatCompactDate = (dateString) => {
        const expenseDate = new Date(dateString);
        const options = { day: 'numeric', month: 'short' };
        return expenseDate.toLocaleDateString('en-US', options);
    };

    return (
        <ExpenseListItemStyled>
            <div className="expense-title">{title}</div>
            <div className="expense-amount">
                <span className="currency">$</span>{amount}
            </div>
            <div className="expense-date">{formatCompactDate(date)}</div>
            <div className="expense-category">{category}</div>
            <div className="expense-description">
                {description && description.length > 0 ? (
                    description.length > 35 ? description.substring(0, 32) + "..." : description
                ) : (
                    <span className="no-description">—</span>
                )}
            </div>

            <div className="expense-actions">
                <StyledButton
                    icon={trash}
                    bPadding={'0.5rem'}
                    bRadius={'8px'}
                    bg={'rgba(244, 67, 54, 0.1)'}
                    color={'##F44336'}
                    onClick={handleDelete}
                    height={"auto"}
                    fontSize={"0.9rem"}
                />
            </div>
        </ExpenseListItemStyled>
    )
}


export default ExpenseListItem;