export function calculateResources(clickResource,autoResource,resourceState,setResourceState,deductionBuffer,upgradeResource){
    let resource = resourceState + clickResource.current + autoResource.current + deductionBuffer.current
    if (resource != resourceState){
        const amountEarned = Math.floor(resource - resourceState)
        setResourceState(resource)
        upgradeResource.current = resource
        clickResource.current = 0 
        autoResource.current = 0
        deductionBuffer.current = 0
        return amountEarned
    } else {
        return 0
    }

}//if i do it like this, then i have to change how i check resources before purchase

export function turnEarth(amountEarned,earthFrame,setEarthFrame){
    if (amountEarned>0){
        setEarthFrame((earthFrame+amountEarned)%36)
    } //earth disappearing after purchase because negative amount earned
}

export function getAvailableUpgrades(availableUpgrades, setAvailableUpgrades,resourceState, milestones, setMilestones, upgradesTable){
    // used forloop instead of .filter twice or reduce because will run every 15 ms with other calls
    // also can break early this way
    var newUpgrades = []
    var milestonesLeft = [...milestones]
    for (let milestone of milestones){
        if (resourceState >= milestone){
            newUpgrades = [...newUpgrades, ...upgradesTable[milestone]]
            milestonesLeft.splice(0,1)
        } else {
            break
        }
        if(newUpgrades.length){
            setAvailableUpgrades([...availableUpgrades, ...newUpgrades])
            setMilestones(milestonesLeft)
        }
    }
}

export function purchaseUpgrades(upgradesToApply, setUpgradesToApply,workersToCreate, setWorkersToCreate, clickEffectsToApply, setClickEffectsToApply, workerEffectsToApply, setWorkerEffectsToApply, availableUpgrades, setAvailableUpgrades, upgradesPurchased, setUpgradesPurchased){
    const newUpgradesToApply = [...upgradesToApply]
    if(upgradesToApply.length){
        for(let upgrade of upgradesToApply){ //breaks only break switch block, not loop
            switch(upgrade.type){
                case 'clickEffect':
                    setClickEffectsToApply([...clickEffectsToApply, upgrade])
                    break
                case 'workerEffect':
                    setWorkerEffectsToApply([...workerEffectsToApply, upgrade])
                    break
                case 'worker':
                    setWorkersToCreate([...workersToCreate, upgrade])
                    break
            } 
            newUpgradesToApply.splice(0,1)
        }
        setUpgradesToApply(newUpgradesToApply)
    }
}

export function clickEffectsOnWorkers(clickToWorkerEffects,workerEffectsToApply,setWorkerEffectsToApply,workersToCreate, setWorkersToCreate,temporaryWorkerCount){
    if (clickToWorkerEffects.current.length){
        var procs = [...clickToWorkerEffects.current]
        var workers = procs.filter(obj => obj.type=='worker')
        var effects = procs.filter(obj => obj.type!='worker')

        if(workers.length){
            workers = workers.map(worker => {
                worker.creationTime = new Date/1000
                return worker
            })
            setWorkersToCreate([...workersToCreate,...workers]) 
        }
        if(effects.length){
            setWorkerEffectsToApply([...workerEffectsToApply,...clickToWorkerEffects.current])
        }
        clickToWorkerEffects.current = []
    }
}

export function removeFlaggedWorkers(workersToRemove, workersToCreate, setWorkersToCreate){
    if(workersToRemove.current.length){
        var newWorkersArr = workersToCreate.filter(worker => !workersToRemove.current.includes(worker.creationTime))
        setWorkersToCreate(newWorkersArr)
        workersToRemove.current = []
    }
}

export function removeFromAvailableUpgrades(upgradesPurchased, availableUpgrades, setAvailableUpgrades){
    if(upgradesPurchased.current.length){
        let newAvailableUpgrades = availableUpgrades.filter(u => !upgradesPurchased.current.includes(u.name))
        // console.log(newAvailableUpgrades)
        setAvailableUpgrades(newAvailableUpgrades)
    }
}

export function purchase(props){
    var name = props.upgrade_object.name
    var cost = props.upgrade_object.cost
    let isAvailable = props.availableUpgrades.filter(a => a.name == name).length

    if (isAvailable && cost <= props.upgradeResource.current){
        props.deductionBuffer.current -= cost 
        // bugs:
            //need to have code check if there are enough resources
            //need to check for tiers too
        let newAvailable = props.availableUpgrades.map(a => {
            if(a.name == name){
                a.remove = true 
            }
            return a
        })
        props.setUpgradesToApply([...props.upgradesToApply,props.upgrade_object])
        props.setAvailableUpgrades(newAvailable)
    }
}
/* 
click on upgrade -> put upgrade object in upgradesToApply
purchaseUpgrades in loop detects upgradesToApply not empty

purchaseUpgrades checks the upgrade type and then puts it in the relevant buffer
purchaseUpgrades removes from upgradesToApply and adds to upgradesPurchased

each buffer will be passed to a component, 
component will delete from that buffer and add to its own state
*/

