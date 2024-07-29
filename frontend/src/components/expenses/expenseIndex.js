import React, { useEffect, useState } from "react";
import { InnerLayout } from "../../styles/Layouts";
import ExpenseForm from "./expenseForm";
import { ExpensesStyled } from "./expenseStyles";
import { getExpenses } from "./../../api/expenses";
import ExpenseListItem from "./expenseListItem";

function Expenses() {

    const [expenses, setExpenses] = useState([]);
    const [updateList, setUpdateList] = useState(false);

    useEffect(() => {
        getExpenses().then((response) => {
            console.log(response.data);
            setExpenses(response.data);
        });
    }, [updateList]);

    return (
        <ExpensesStyled>
            <InnerLayout>
                <h1>Expenses</h1>
                <div className="expense-content">
                    <div className="form-container">
                        <ExpenseForm updateList={updateList} setUpdateList={setUpdateList}/>
                    </div>
                    <div className="expenses">
                        {expenses.map((expense) => {
                            const {_id, title, amount, date, category, description} = expense;
                            return <ExpenseListItem
                                key={_id}
                                id={_id}
                                title={title}
                                description={description}
                                amount={amount}
                                date={date}
                                category={category}    
                            />
                        })}
                    </div>
                </div>
            </InnerLayout>
        </ExpensesStyled>
    )
}

export default Expenses;