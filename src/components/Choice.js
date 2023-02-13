import React, {useState} from "react";
import {upgradeStyle} from "./styles"
import {purchase} from "../Loop_Functions"

const Choice = React.memo((props)  => {
    const purchaseChoice = () => {
        purchase(props)
    }    
    //add modal on hover for description
    return (
        <div style={upgradeStyle}>
            {props.choiceObject.name}
        </div>
    )
})

export default Choice;