import React, { useState } from "react";
import styled from "styled-components";
import StyledButton from "../button/styledButton";

function ExpenseFilter() {

    const [isFiltering, setIsFiltering] = useState(false);

    return (
        <ExpenseFilterStyled>
            <div className="filtering-options">
                <select>
                    <option value="Year" selected={!isFiltering} disabled>Year</option>
                    <option value="y">Y</option>
                </select>
                <select>
                    <option value="" selected={!isFiltering} disabled>Month</option>
                </select>
                <select>
                    <option value="" selected={!isFiltering} disabled>Category</option>
                </select>
            </div>
            <div className="clear-btn">
                <StyledButton
                    name={"Clear"}
                    isVisible={isFiltering}
                />
            </div>
        </ExpenseFilterStyled>

    )

}

const ExpenseFilterStyled = styled.div`
    display: flex;
    margin-bottom: 1rem;
    justify-content: space-between;
    .filtering-options{
        display: flex;
        gap: 2rem;
    }
    .clear-btn{
        margin: 1rem;
        display: flex;
        justify-content: flex-end;
    }
`;

export default ExpenseFilter;