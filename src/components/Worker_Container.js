import React, {useRef, useState} from "react";
import Worker from './Worker'

const Worker_Container = React.memo((props)  => {
    const workerProps = {...props}
    delete workerProps['workersToCreate']
    delete workerProps['setWorkersToCreate']

    var newWorkers = props.workersToCreate.map( w => {
        let thisWorkerProps = {...workerProps, name:w.name, time:w.time, reward: w.reward, expiry: w.expiry, creationTime: w.creationTime}
        return <Worker key={'worker'+ w.creationTime} {...thisWorkerProps} />
    })
    // console.log(newWorkers)

    return (
        <div>
            {/* {workers.current} */}
            {newWorkers}
        </div>
    )
})

export default Worker_Container;