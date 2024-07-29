import React from "react";
import styled from "styled-components";
import { InnerLayout } from "../styles/Layouts";

function Budget() {
    return (
        <BudgetStyled>
            <InnerLayout>
                Income
            </InnerLayout>
        </BudgetStyled>
    )
}

const BudgetStyled = styled.div``;

export default Budget;