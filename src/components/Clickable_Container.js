import React, {useState, useEffect, useRef} from "react";
import EarthImages from './EarthImages/EarthImages.js'
import {containerStyle} from "./styles"

const Clickable_Container = React.memo((props) => { 
    const earth_image = EarthImages[props.earthFrame]
    const [showDecimal, setShowDecimal] = useState(false)
    const reward = useRef(1)
    const giddyUpCounter = useRef(0)
    const effectArgsMap = {
        'Manual Click':[reward],
        'Giddy Up': [giddyUpCounter,props.clickToWorkerEffects],
        'Lucky Manual Clicks': [props.clickToWorkerEffects],
        'Spawn': [props.clickToWorkerEffects]
    }

    function click(){
        let effectsExist = props.clickEffectsToApply.length
        var toRemove = []
        if(effectsExist){
            for(let effectObj of props.clickEffectsToApply){
                let args = effectArgsMap[effectObj.name]
                effectObj.effect(...args)
                if (effectObj.disposable){
                    toRemove.push(effectObj.name)
                }
            }
            if(toRemove.length){
                let newEffectsList = [...props.clickEffectsToApply].filter(effect => !toRemove.includes(effect.name))
                props.setClickEffectsToApply(newEffectsList)
            }
            
        }
        props.clickResource.current += reward.current
    }

    // if handling application of click upgrades gets too messy, move to using hashmap
    // need to remove black background of the image
    // or can add shadow or background around the image that blends the black into surrounding colour
    const imgStyle = {cursor:'pointer', overflow:'hidden'}
    const style = {...containerStyle, alignItems:'center', borderBottom:'1px inset white', height:'50%', backgroundColor:'black', color:'white', justifyContent:'center'}
    delete style.maxWidth
    delete style.border
    
    if (!showDecimal && props.resourceState%1 != 0){
        setShowDecimal(true) //only runs once when decimal is seen.
    }
    const resource = showDecimal ? props.resourceState.toFixed(1) : props.resourceState
    return (
        <div style={style}>
            <img src={earth_image} onClick={click} style={imgStyle} />
            {resource}
        </div>
    )
})
export default Clickable_Container;