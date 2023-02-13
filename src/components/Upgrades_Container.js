import React, {useState, useEffect, useRef} from "react";
import Upgrade from "./Upgrade";
import Shrink_And_Remove from "./Shrink_And_Remove";
import {containerStyle} from "./styles"

const Upgrades_Container = React.memo((props) => {
    //minor bug:
    //if buying many at once, leaves behind invisible divs
    //sometimes makes the animation play multiple times, or other visual errors
        // also visual error when purchasing an upgrade near the end of an already initiated transition
    //adding a key to shrinkandremove prevents leaving invisable divs
        // but this solution makes the replaying animations worse
    // possible solutions:
        // working solution was to handle state in the main loop and pass the shrink component a bufferRef
        // current implementation adjusts height as state in a loop in useeffect
        // can try changing back to css transition now
        // also starting to lag a bit probably because too many rerenders

    const upgrades = props.availableUpgrades.map(upgrade_object => {
        if(upgrade_object.remove){
            return <Shrink_And_Remove 
                key={'remove'+upgrade_object.name}
                upgradesPurchased={props.upgradesPurchased}
                name={upgrade_object.name} />
        } else {
            return <Upgrade key={upgrade_object.name} {...{...props, upgrade_object}}/>
        } 
    })

    return (
            <div style={containerStyle}>
                {upgrades}
            </div>
    )
})

export default Upgrades_Container;

