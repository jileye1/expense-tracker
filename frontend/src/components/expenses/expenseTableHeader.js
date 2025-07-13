import React from "react";
import styled from "styled-components";

function ExpenseTableHeader() {
    return (
        <TableHeaderStyled>
            <div className="header-title">Expense</div>
            <div className="header-amount">Amount</div>
            <div className="header-date">Date</div>
            <div className="header-category">Category</div>
            <div className="header-description">Description</div>
            <div className="header-actions">Actions</div>
        </TableHeaderStyled>
    );
}

const TableHeaderStyled = styled.div`
    display: grid;
    grid-template-columns: 2fr 1fr 0.8fr 1.2fr 2fr 0.6fr;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    background: rgba(34, 34, 96, 0.04);
    border-radius: 8px;
    font-weight: 600;
    font-size: 0.85rem;
    color: rgba(34, 34, 96, 0.8);
    text-transform: uppercase;
    letter-spacing: 0.5px;
    margin-bottom: 0.5rem;

    .header-amount {
        text-align: left;
    }

    .header-date {
        text-align: left;
    }

    .header-actions {
        text-align: center;
    }

    @media screen and (max-width: 1024px) {
        grid-template-columns: 2fr 1fr 0.7fr 1fr 1.5fr 0.6fr;
        gap: 0.8rem;
        padding: 0.6rem 0.8rem;
        font-size: 0.8rem;
    }

    @media screen and (max-width: 768px) {
        display: none; // Hide header on mobile since layout changes
    }
`;

export default ExpenseTableHeader;