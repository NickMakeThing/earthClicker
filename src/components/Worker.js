import Progress_Bar from './Progress_Bar'
import React, {useState, useRef} from "react";

const Worker = React.memo((props) => {
    // should make thing that signifies if worker is temporary and/or how much long until expiry
    // should bring progress loop up to worker and pass it down values.
    // make it a thin red? bar that sits under progress

    //might have to use context to fix this and get giddyup working
    //might have to go back to using ref for workereffectlist
    const [timeAdjustment,setTimeAdjustment] = useState(0)

    console.log('rerender: worker')

    //will need to modify applyEffects in a few ways:
    //need to clean up/shorten
    //need to make use of hashmap like effectArgsMap in clickable_container instead of lots of if statements
    const applyEffects = (effectsList, trigger) => {
        var hasEffects = effectsList.length
        var toRemove = [] 
        if (hasEffects){
            for(let obj of effectsList){
                if(obj.workerName == props.name && obj.trigger == trigger){
                    if (obj.modifier == 'resource') { 
                        props.autoResource.current = obj.effect(props.autoResource.current)
                    } else if(obj.modifier == 'time'){ 
                        obj.effect(props.time,setTimeAdjustment,timeAdjustment) 
                    }   
                    if(obj.consumable){
                        toRemove.push(effectsList.indexOf(obj))    
                    }
                    if(toRemove.length){
                        var newList = effectsList.filter(obj => !toRemove.includes(effectsList.indexOf(obj)) )
                        props.setWorkerEffectsToApply(newList) 
                    }
                }
            }
        }
    }
    /*
    bugs:
        title: 
        description: 
        possible causes:
        fix: 
    */
    const completeWork = () =>{
        props.autoResource.current = props.reward(props.autoResource.current)
        applyEffects(props.workerEffectsToApply, 'completion')
    }
    const applyRealTimeEffects = () =>{
        applyEffects(props.workerEffectsToApply, 'realTime')
    }
    const adjustTime = (currentTime, endTime, setEndTime) => {
        var time = endTime - currentTime
        if (timeAdjustment != 0){
            time = time + timeAdjustment
            setEndTime(endTime+timeAdjustment)
            setTimeAdjustment(0) //rerender 3
        }
        if(props.expiry){
            selfDestruct(currentTime)
        }
        return time
    }

    const selfDestruct = (currentTime) => {
        var expiry = props.expiry
        var timePassed = currentTime - props.creationTime
        if(timePassed > expiry){
            props.workersToRemove.current = [...props.workersToRemove.current, props.creationTime]
        }
    }
    return (
        <div style={{borderBottom:'1px solid white'}}>
            <div>{props.name}</div>
            <Progress_Bar time={props.time} {...{adjustTime, completeWork, applyRealTimeEffects}}/>
        </div>
    )
})

export default Worker;

