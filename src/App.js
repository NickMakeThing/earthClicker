import React, {useState, useEffect, useRef} from "react";
import {containerStyle} from "./components/styles"
import {upgradesTable, choiceTable} from "./components/Upgrades_Table"
import {getAvailableUpgrades, purchaseUpgrades, turnEarth, calculateResources,clickEffectsOnWorkers, removeFlaggedWorkers, removeFromAvailableUpgrades} from "./Loop_Functions"
import Upgrades_Container from "./components/Upgrades_Container";
import Clickable_Container from "./components/Clickable_Container";
import Worker_Stats_Container from "./components/Worker_Stats_Container";
import Choices_Container from "./components/Choices_Container";
//there may be concurrency errors in this design
    //seems like the click:worker race condition is fixed
    //clicker:worker race condition
        //simultaneous manual:auto clicks resulted in only one of them producing resources
        //fix was to break up resources into multiple variables and accumulate them during the loop
    //worker:worker race condition
        //tested this with two autoclickers, apparently it is not a problem.
        //if problem comes up: accumulate worker rewards in worker container without rerendering workers somehow 

const App = () => {
    const clickResource = useRef(0)
    const autoResource = useRef(0)
    const upgradeResource = useRef(0)
    const deductionBuffer = useRef(0)
    const [resourceState,setResourceState] = useState(0)
    //separated resource sources to prevent race conditions & rerenders
    //most of them are refs to reduce unnecessary rerenders
    //resource state is the total resource that show on the screen
    
    const [milestones, setMilestones] = useState(Object.keys(upgradesTable))
    const [availableUpgrades, setAvailableUpgrades] = useState([])
    const [availableChoices, setAvailableChoices] = useState([])
    const [intervalUpdate, setIntervalUpdate] = useState(0)
    const [earthFrame, setEarthFrame] = useState(0); 
    const upgradesPurchased = useRef([])
    const clickToWorkerEffects = useRef([]) 

    //upgrade buffers
    const [upgradesToApply, setUpgradesToApply] = useState([])
    const [workersToCreate, setWorkersToCreate] = useState([])
    const workersToRemove = useRef([])
    const [clickEffectsToApply, setClickEffectsToApply] = useState([])
    const [workerEffectsToApply, setWorkerEffectsToApply] = useState([])


    useEffect(()=>{
        const loop = setInterval(()=>{
            //calculateResources also updates resourceState
            const amountEarned = calculateResources(clickResource,autoResource,resourceState,setResourceState,deductionBuffer,upgradeResource)
            turnEarth(amountEarned,earthFrame,setEarthFrame)
            getAvailableUpgrades(availableUpgrades, setAvailableUpgrades, resourceState, milestones, setMilestones, upgradesTable)
            purchaseUpgrades(upgradesToApply, setUpgradesToApply, workersToCreate, setWorkersToCreate, clickEffectsToApply, setClickEffectsToApply, workerEffectsToApply, setWorkerEffectsToApply, availableUpgrades, setAvailableUpgrades)
            clickEffectsOnWorkers(clickToWorkerEffects,workerEffectsToApply,setWorkerEffectsToApply,workersToCreate, setWorkersToCreate)
            removeFlaggedWorkers(workersToRemove, workersToCreate, setWorkersToCreate)
            removeFromAvailableUpgrades(upgradesPurchased, availableUpgrades, setAvailableUpgrades)
            setIntervalUpdate((intervalUpdate+1)%5)
        },15)
        return () => {
            clearInterval(loop);
        };
    },[intervalUpdate])
    // without intervalUpdate, the interval loop would use the initial state forever
    // return statement prevents memory leaks/multiple & intervals, but resulting timing may not be as accurate due to renders/processing inbetween
    // setTimeout may be a better alternative

    var style = {
        display:'flex',
        flexDirection:'row',
        height:'98vh'
    }
    var middleContainerStyle = {...containerStyle}
    delete middleContainerStyle.border
    
    return (
        <div style={style}>
            <Upgrades_Container {...{upgradesPurchased, deductionBuffer, upgradeResource , availableUpgrades, setAvailableUpgrades, upgradesToApply ,setUpgradesToApply}}/>
            <div style={{...middleContainerStyle,borderBottom:'1px inset white',borderTop:'1px inset white',flexDirection:'column'}}>
                <Clickable_Container {...{clickToWorkerEffects, resourceState,clickResource,earthFrame,clickEffectsToApply, setClickEffectsToApply}}/>
                <Worker_Stats_Container {...{workerEffectsToApply, setWorkerEffectsToApply, autoResource, workersToCreate,setWorkersToCreate, setWorkerEffectsToApply, workersToRemove}}/>        
            </div>
            <Choices_Container {...{availableChoices, setAvailableChoices}}/>
        </div>
    )
}

export default App

/*
todo:
    clickbotting detection/punishment
        need to find the upper limit of how fast humans can click 
        3 warnings, time period or click amount between them
        after last warning, make clicks deduct resources and leave a message until they stop 
        after this, make this happen every time they try again. 
    tune costs/effects
    make choice component
    add stars to background
        do i want it everywhere, or just in the click container?
    improve worker UI
    add hover, onclickhold, lackofresources style appearance for availableUpgrades, etc
        also fix laggy transitions for availableUpgrades
        also create onhover discription modals 
    put resources in tab title
    make earth move based on reasources earned per second instead
        also add visual or animation for each click
    bugs:
        minor: worker transition makes it animate from 100->0 and doesnt reach the end of the bar
    write code for other upgrades
    choices: design functionality and write code 
    work on stats component
    work on worker_stats tabs
        by default workers should be selected
    add resource p/s under earth
    make worker time not collapse to integer when it reaches whole number e.g. 3.0
    make elements undragable/unselectable: upgrades, earth image, resources, etc
    give effectBuffer vallues priorities and order the queue by priority so they are executed in that order
    ask matt if can do bulk state updates in single rerender without putting them in same state object
    make sure upgrades dont apply multiple times on fast clicks
        doesn't seem to be an issue so far

potential changes:
    checkmark that makes decimal value visable
        or make it visable by default and disappear above a number of resources

    should workers instead be on the right where choices are
        can not bother with choices as its way more work
        choices can be an afterthought after everything is done, including proper design/styling
*/