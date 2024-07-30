import React from "react";
import { HeadingsStyled } from "./categoryStyles";

function Headings() {

    return (
        <HeadingsStyled>
            <div className="name-con"></div>
            <div className="inner-content">
                <div className="budget">Per Year</div>
                <div className="budget">Per Month</div>
                <div className="budget">Per Week</div>
            </div>
            <div className="btn-con"></div>
        </HeadingsStyled>
    )
}


export default Headings;