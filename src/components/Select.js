import React from "react";

const Select = (props) => {
    let handleSelect = (event) => {
        props.selectFun(event.target.value)
    }

    return (
        <div>
            <select value={props.select} onChange={handleSelect}>
                <option value={"all"}>All</option>
                <option value={"descriptionAsc"}>Sort by description [+]</option>
                <option value={"descriptionDsc"}>Sort by description [-]</option>
                <option value={"categoryAsc"}>Sort by category [+]</option>
                <option value={"categoryDsc"}>Sort by category [-]</option>
            </select>
        </div>
    )
}

export default Select;