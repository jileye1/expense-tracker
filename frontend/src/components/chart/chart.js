import React, { useEffect, useState } from "react";
import { Chart as ChartJs, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, ArcElement } from 'chart.js';
import { Line } from 'react-chartjs-2';
import styled from "styled-components";
import { getIncomes } from "../../api/incomes";
import { getExpenses } from "../../api/expenses";
import { dateFormat } from "../../utils/dateFormat";

ChartJs.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ArcElement,
)

function Chart() {

    const [incomes, setIncomes] = useState([]);
    const [expenses, setExpenses] = useState([]);

    useEffect(() => {
        getIncomes().then((response) => {
            setIncomes(response.data);
        })
        getExpenses().then((response) => {
            setExpenses(response.data);
        })
    }, []);

    const data = {
        labels: expenses.toReversed().map((expense) => {
            const {date} = expense;
            return dateFormat(date);
        }),
        datasets: [
            {
                label: "Income",
                data: [
                    ...incomes.map((income) => {
                        const {amount} = income;
                        return amount;
                    })
                ],
                backgroundColor: "green"
            },
            {
                label: "Expenses",
                data: [
                    ...expenses.map((expense) => {
                        const {amount} = expense;
                        return amount;
                    })
                ],
                backgroundColor: "red"
            }
        ]
    }

    return (
        <ChartStyled>
            <Line data={data}/>
        </ChartStyled>
    )
}

const ChartStyled = styled.div`
    background: #FCF6F9;
    border: 2px solid #FFFFFF;
    box-shadow: 0px 1px 15px rgba(0, 0, 0, 0.06);
    padding: 1rem;
    border-radius: 20px;
    height: 100%;
`;

export default Chart;