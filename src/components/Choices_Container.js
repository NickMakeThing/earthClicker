import React, {useState} from "react";
import Choice from "./Choice"
import {containerStyle} from "./styles"

const Choice_Container = React.memo((props) => {
    /*
    what will choices cost?
    what do they require to become available and/or visible?
    see if changing the slight blueish hue from upgradeStyle looks good as a greenish hue for choices
    */
    const createChoiceRowDiv = choiceArray => {
        var divKey = ''
        var choiceComponents = choiceArray.map(choiceObject => {
            divKey += choiceObject.name
            return <Choice key={choiceObject.name} {...{...props, choiceObject}}/>
        })
        return <div key={divKey}>
            {choiceComponents}
        </div>
    }
    const choices = props.availableChoices.map(choiceArray => {
        // if(choiceArray.remove){
        //     return <Shrink_And_Remove 
        //         key={'remove'}//need to figure out unique identifier for this
        //         upgradesPurchased={props.upgradesPurchased}
        //         name={choiceArray.name} />
        // } else {
        return createChoiceRowDiv(choiceArray) //<Upgrade key={choice_object.name} {...{...props, choice_object}}/>
        // } 
    })
    //need to figure out list key ids
    //need to figure out how to do transition animation
    return (
        <div style={containerStyle}>
            {choices}
        </div>
    )
})
export default Choice_Container;

