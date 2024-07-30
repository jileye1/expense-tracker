import React from "react";
import { TotalsStyled } from "./categoryStyles";
import { dollar } from "../../utils/icons";

function Totals({total_per_month, total_per_year, total_per_week}) {

    return (
        <TotalsStyled>
            <div className="name-con">Totals</div>
            <div className="inner-content">
                <div className="budget">{dollar} {total_per_year}</div>
                <div className="budget">{dollar} {total_per_month}</div>
                <div className="budget">{dollar} {total_per_week}</div>
            </div>
            <div className="btn-con"></div>
        </TotalsStyled>
    )
}


export default Totals;