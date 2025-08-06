import React, { useEffect, useState } from "react";
import { InnerLayout } from "../../styles/Layouts";
import { CategoryIndexStyled } from "./categoryStyles";
import { getCategories } from "../../api/categories";
import CategoryItem from "./categoryItem";
import Headings from "./headings";
import Totals from "./totals";
import StyledButton from "../button/styledButton";
import { plus } from "../../utils/icons";
import CategoryInput from "./categoryInput";

function Categories() {

    const [categories, setCategories] = useState([]);
    const [updateList, setUpdateList] = useState(false);
    const [createCategoryEnabled, setCreateCategoryEnabled] = useState(false);

    useEffect(() => {
        getCategories().then((response) => {
            console.log(response.data);
            setCategories(response.data);
        });
    }, [updateList]);

    const getTotalFor = (section) => {
        let totalBudget = 0;
        categories.forEach((category) => {
            totalBudget = totalBudget + category[section];
        })
        return totalBudget;
    }

    return (
        <CategoryIndexStyled>
            <InnerLayout>
                <h1>Budget</h1>
                <div className="stats-content">
                    <div className="income-con">% Income</div>
                </div>
                <div className="budget-content">
                    <Headings />
                    <Totals
                        total_per_year={getTotalFor("budget_per_year")}
                        total_per_month={getTotalFor("budget_per_month")}
                        total_per_week={getTotalFor("budget_per_week")}
                    />
                    <div className="budget-table">
                        {categories.map((category) => {
                            const { _id, name, budget_per_year, budget_per_month, budget_per_week } = category;
                            return <CategoryItem
                                key={_id}
                                id={_id}
                                name={name}
                                budget_per_year={budget_per_year}
                                budget_per_month={budget_per_month}
                                budget_per_week={budget_per_week}
                                updateList={updateList}
                                setUpdateList={setUpdateList}
                            />
                        })}
                    </div>
                </div>
                <div>
                    {createCategoryEnabled ? <CategoryInput 
                        updateList={updateList} 
                        setUpdateList={setUpdateList} 
                        setCreateCategoryEnabled={setCreateCategoryEnabled} /> : null}
                </div>
            </InnerLayout>
            <div className="add-category">
                {!createCategoryEnabled ? <StyledButton
                    name={'Category'}
                    icon={plus}
                    bPadding={'.8rem 1.6rem'}
                    bRadius={'30px'}
                    bg={'#c877f7'}
                    color={'#fff'}
                    onClick={() => setCreateCategoryEnabled(true)} /> : null}
            </div>
        </CategoryIndexStyled>
    )
}

export default Categories;