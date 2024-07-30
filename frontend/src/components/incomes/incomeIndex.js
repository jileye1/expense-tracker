import React, { useEffect, useState } from "react";
import { InnerLayout } from "../../styles/Layouts";
import { getIncomes } from "../../api/incomes";
import { IncomesStyled } from "./incomeStyles";
import IncomeForm from "./incomeForm";

function Income() {

    const [incomes, setIncomes] = useState([]);
    const [updatePage, setUpdatePage] = useState(false);

    useEffect(() => {
        getIncomes().then((response) => {
            console.log(response.data);
            setIncomes(response.data);
        });
    }, [updatePage]);

    return (
        <IncomesStyled>
            <InnerLayout>
                <h1>Income</h1>
                <div className="income-content">
                    <div className="form-container">
                        <IncomeForm updatePage={updatePage} setUpdatePage={setUpdatePage}/>
                    </div>
                    <div className="income-stats">

                    </div>
                </div>
            </InnerLayout>
        </IncomesStyled>
    )
}

export default Income;