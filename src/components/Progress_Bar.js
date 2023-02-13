import React, {useEffect, useState} from "react";

const Progress_Bar = React.memo((props) => {
    const [progress, updateProgress] = useState(0)
    const [timePassed,setTimePassed] = useState(0)
    const [endTime, setEndTime] = useState(new Date/1000 + props.time)
    
    useEffect(()=>{
        const loop = setInterval(()=>{
            props.applyRealTimeEffects()
            let currentTime = new Date/1000
            let adjustedTime = props.adjustTime(currentTime, endTime, setEndTime)
            let newProgress = adjustedTime/props.time*-100+100
            if (newProgress >= 100){
                props.completeWork()
                setEndTime(new Date/1000 + props.time)
            } 

            updateProgress(newProgress % 100)
            setTimePassed((adjustedTime - props.time)*-1)
        },15)
        return () => {
            clearInterval(loop);
        };
    },[progress])
    //bugs
    //need to fix delay and how the progress doesnt reach very last part of bar
    //transition shouldnt apply when it goes 100 -> 0
    const barStyle = {
        width: '80%',
        height: '10px',
        border: '1px solid #ddd',
        borderRadius: '15px',
        overflow: 'hidden',
    }
    const progressStyle = {
        width: progress+'%',
        height: '100%',
        backgroundColor: '#4caf50',
        transition: 'width 0.09s', 
        transitionDelay: '0m',
    }   
    if (progress == 0){ //to prevent transition when progress goes 100 -> 0
                        //this bug has reemerged after refactoring
                            //need to fix again.
        delete progressStyle['transition']
        delete progressStyle['transitionDelay']
    }
    return (
        <div style={{display:'flex'}}>
            <div style={barStyle}>
                <div style={progressStyle}></div>
            </div>
            {timePassed.toFixed(1)}/{props.time}
        </div>
    )
})

export default Progress_Bar;