import React, {useState, useEffect} from "react";
import {upgradeStyle} from "./styles"
import {purchase} from "../Loop_Functions"

const Upgrade = React.memo((props) => {
    const [opacity, setOpacity] = useState(0)
    const style = {...upgradeStyle, opacity: opacity}

    useEffect(()=>{
        setTimeout(()=>{setOpacity(1)},50)
        //would not work 95% of the time without setTimeout work around
    },[])

    const purchaseUpgrade = () => {
        purchase(props)
    }

    return (
        <div style={style} onClick={purchaseUpgrade}>
            <div>{props.upgrade_object.name}</div>
            <div style = {{display:'flex', gap:10, justifyContent:'center', fontSize:'65%'}}>
                <div>tier {props.upgrade_object.tier}</div>
                <div>cost {props.upgrade_object.cost}</div>
            </div>
            {/* <div>{props.upgrade_object.description}</div> <-- show this in mouse over
                will have to make new description modal component
            */}
        </div>
    )
})

//todo: 
    // add mouse over modal for description

export default Upgrade;