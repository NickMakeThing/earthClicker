import React, {useState, useEffect, useRef} from "react";

const Upgrades_Container = React.memo((props) => {
    const [height, setHeight] = useState(57)

    useEffect(()=>{
        
        const loop = setInterval(()=>{
            setHeight(height-3)
        },15)
        //can make animation more smooth by replacing 15 with a variable that grows along some curve
        // tried this^ it was bad. better to use propper react transition library
        
        if(height <= 0){
            clearInterval(loop)
            setTimeout(()=>props.upgradesPurchased.current.push(props.name), 1000)
            // visual error when this runs because rerenders
        }
        //would not work 95% of the time without setTimeout work around
        return () => {
            clearInterval(loop);
        };
    },[height])

    const style = {
        height:height,
        opacity:0,
        transition:'height 0.1s'
    }
    return (
        <div style={style}>
        </div>
)
})

export default Upgrades_Container;