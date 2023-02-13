import React, {useState} from "react";

const Tabs = React.memo(() => {
    const style = {
        display:'flex',
        justifyContent:'space-evenly',
        borderBottom:'1px inset white', 
        whiteSpace:'nowrap'
    }
    const tabStyle = {}
    return (
        <div style={style}>
            <div>workers</div>
            <span style={{borderLeft:'1px inset white'}}></span>
            <div>stats</div>
        </div>
    )
})

export default Tabs;