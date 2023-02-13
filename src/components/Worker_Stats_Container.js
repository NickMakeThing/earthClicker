import React, {useState} from "react";
import {containerStyle} from "./styles"
import Tabs from "./Tabs"
import Worker_Container from "./Worker_Container"
import Stat_Container from "./Stat_Container"
// difference between import and require?

const Worker_Stats_Container = React.memo((props) => {

    // const style = {...containerStyle, alignItems:'center'}
    // delete style.maxWidth
    // delete style.border
    const style = {...containerStyle, width:'100%', height: '50%'} //height 100%? 
    delete style['maxWidth']
    delete style['border']
    // console.log('worker/stat rerender \n', props)
    return (
        <div style={style}>
            <Tabs />
            <Worker_Container {...props}/>
            <Stat_Container />
        </div>
    )
})
export default Worker_Stats_Container
