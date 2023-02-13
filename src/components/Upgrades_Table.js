    /*
    STRUCTURE:
    upgradesTable = {
        minumum_for_upgrades_to_appear_on_arr:[
            {
                name:string,
                required_resource_amount:number,

            },
            {
                ...
            }
        ],
        minumum_for_upgrades_to_appear_on_arr:[
            {
                ...
            }
        ],
        ...
    }
    */


/* 
upgrade ideas
    put the better and cooler upgrades at the end of each group
        make most expensive out of each group/higher cost distance than what the others have between them
        make it so player has something they want to work towards in each upgrade thing
    click opportunity events like lucky cookies in cookie clicker
        things fly past the earth that can be clicked on
    need more upgrades for more choice ideas
    should order upgrades like carrot on a stick:
        where carrot is ability to automate things
        give player a dopamine hit of being able to automate even more with each batch of upgrades

    on some rng event, create short time period that boosts manual click rewards by shitloads
        doesnt effect bonus from 'support' upgrade
    weather: 
        provides random bonuses to other workers every so often, e.g:
            increased speed
            increased reward 
            increased proc rates
            chance to just give shit loads of resources (over time?)
            maybe very rare chance of insane click bonuses too.
            maybe each one has a downside too
                this could be opportunity to bring in on demand abilities
                where some would be more or less effective during certain weather
            provides unique visual for each one
    Reasonable Clicker:
        increases reasources earned by manual clicks by (5?)% of resources earned per second by workers 
    can make upgrades available based on choices
    give each proc some kind of visual
    chance on worker tick, enhance clicks
    can make unbought upgrades increase in price the more upgrades you buy
    (auto or manual?)
        chance on click get % more (like a crit)
        chance on click create a temporary extra really fast autoclicker that clicks some number of times
            does this stack for duration or multiple?
            talent can make it stack in some way(s)
        chance on click to increase proc rate of something
    cooldown/abilities
    chance on autoclick
    worker that gives you more if youre closer to 0 resources+ gives more the higher ur highest record of resources held
    worker that gives more depending on ur clicks per second
    worker that gives you random amount in some range
    ?should workers/procs have animations?

other ideas that creat opportunities for upgrades
    events like ice ages
    evolution

adjustments
    should probably move giddy up to the next block of available upgrades
        reasoning: because its twice as expensive as luckyclicks, but no where near as good
        if only showing manual and lucky, then it excites user to get that 250 and giddyup kinda messes with this a bit.
        alternatively: could have lucky and giddy switch places.
    some upgrades and choices need better names
*/    

/*
choice ideas:, unlocks at different resource thresholds. each costs resources to pick one.
    should there be the option to respec?
        cost would be the record amount of resources youve earned, 
            effectively making it so you would have to use all your resources, but also makes it so it cant be cheesed
    
    need to balance these options
    unallocated ideas:
        Ascendance choices
        Utility Monster
        Mystery Box/Hidden Variable/Experimental Tester/Adhoc Tester
            provides a hidden enhancement/effect/bonus, but doesnt tell you what it is
            its up to the player to figure out what it is
        
    unstable rng enhancements, e.g.:
        unstable spawns: enhanced, but chance to create bad spawn, which drains resources
            this can synergize with evolution by making even better evolved spawns from good spawns
        unstable lucky manual: gives way more but also now chance to takeaway a decent amount of resources
    Auto Manual Clicks:
        autoclick can now proc manual click effects, but at 50% of the effectiveness.
    Fanatical Clicker:
        increases all rewards from manual clicks by 500%. 
        Are you sure this is a good idea?


    Weather
        described in upgrades
    Evolution
        spawn ticks have x% chance to create better spawns, (better based on some other number?)
    Eclipse
        an effect that oscilates between two states: (
            1. x% decrease in worker gains, x*4% increase in manual click gains
            2. x% increase in worker gains, x*4% decrease in manual click gains
            not exactly sure how it will work:
                make it so it is in 2. state most of the time (75%?)
                make it 50/50 time on each state
                make it so most of the time not either state, then have shorter time period where one of the states comes in
            give strong visuals to indicate that it is in some state
            should itmake a noise when an eclipse is happening?
            more beneficial and predictable than weather, but requires efffort/organization from the player to take full advantage of
                if not taken advantage of properly, should be slightly less beneficial
            
    Mad Clicker:
        When clicking at a rate of 5 clicks per second, manual click bonus is increased by another 100% and workers work 5x faster. 
        What is wrong with you?
    Spawn Colony: 
        Spawn ticks have a chance to reduce the time before the next auto click by x%
        OR Teamwork: reduces time before the next tick of every other spawn. 
    Reluctant Ruler:
        ... something that doesnt involve clicking 
        Workers are now 50% faster and earn twice as much
        (should clicking reduces the effects?)
        
    Hard Times/Delayed Gratification/Justify the means: clicks now use up resources, but stack a temporary buff to workers
        buffs to manual clicks increase both reasources drained and effectiveness of the buff
        should create profit over time
    Mathematician
        have the description a really complicated mathematical formula or expression
        or just technical with a lot of variables, etc
        make it very hard to understand
        make this one more beneficial than the others
        not just a flat out bonus: 
            make it difficult to understand how to use, 
            but if you know how to use it, the reward is large
            should feel like being rewarded for cracking a code
            should the formula change for each person with a large variety??
                e.g there can be some rng to what the formula and benefit is.
                this will prevent people from sharing the answer
    something that creates spawns without clicking
        maybe name based on how life might may have emerged from physics n shiet
        each main loop iteration has a tiny chance of creating a spawn       
*/
export const choiceTable = {
    1000:[
        {
            name: 'Auto Manual Clicks', //Autonomy 
            description: 'The Auto Click worker\'s ticks are now enhanced by manual click effects, but the effects are 50% less effective.',  //lesser spawns?
            type: 'workerEffect',
            effect: ()=>{} //need to get all click effects here
        },
        {
            name: 'Instability',
            description: 'Spawn and Lucky Manual Click upgrades are now twice as effective, but there is a 25% chance the effects will backfire and trigger a version that drains resources.',
            type: 'clickEffect',
            effect: ()=>{} //need to get all click effects here
        },
        {   
            name: 'Fanatical Clicker',
            description:'Increases resources earned from manual clicks by 500%. Are you sure this is a good idea?',
            type: 'clickEffect',
            effect: ()=>{resource => { return resource*5 }}
        }
    ],
    2500:[
        {
            name:'Weather',
            description:'Provides a random bonus to other workers with each tick.',
            type: 'worker',
            reward: ()=>{}
        },
        {
            name:'Evolution',
            description:'Spawn worker ticks have a 10% chance to another spawn worker. Spawn workers that are produced by this effect have a chance to be better than the worker they came from.',
            type: 'workerEffect',
            effect: ()=>{}
        },
        {
            name:'Eclipse',
            description:'Every 30 minutes a lunar or solar eclipse will occur for 30 seconds. During a lunar eclipse, workers yield 10x more resources and clicking yields 75% less. During a solar eclipse, clicking yield 10x more resources and workers yields 75% less',
            type:'not sure how to handle this one yet.',
        }
    ],
    // 3000:[
    //     {

    //     },
    //     {

    //     },
    //     {

    //     }
    // ],
    // 4000:[
    //     {

    //     },
    //     {

    //     },
    //     {

    //     }
    // ]
}
//types: clickEffect, workerEffect, worker
export const upgradesTable = {
    0:[{
            name: 'Auto Click',
            cost: 50,
            tier:1,
            description: 'Automatically clicks the earth for you every 5 seconds',  //creates job
            type: 'worker',
            id:null,
            time: 5,
            expiry:false,
            remove:false,
            reward: resource => { return resource+1 }
    },],
    50:[
            {
                name: 'Manual Click',
                cost: 100,
                tier:1,
                description: 'Increases amount of resources generated by manual clicks by 20%',
                type: 'clickEffect',
                disposable:true,
                effect: resource => { resource.current = resource.current*1.2 }
            },
            {
                name: 'Giddy Up',
                cost: 250,
                tier:1,
                description: 'The time before the next auto click occurs will be reduced by 5% after every 10 manual clicks',
                type:'clickEffect',
                disposable:false,
                remove:false,
                effect: (giddyUpCounter,clickToWorkerEffects) => {
                    giddyUpCounter.current = giddyUpCounter.current + 1
                    var effect = (time,setTimeAdjustment,timeAdjustment) => {setTimeAdjustment(timeAdjustment-time*0.05)} 
                    if(giddyUpCounter.current == 10){
                        clickToWorkerEffects.current = [...clickToWorkerEffects.current, {effect:effect, consumable:true, workerName:'Auto Click', modifier:'time', trigger:'realTime', type:'effect'} ]
                        giddyUpCounter.current = 0
                    }
                }
                    //callback that runs in clickable will flip state/ref to true, which will then count click sequence.
                    //then same callback will run a check to see if the state has reached 10
                    //if it has reached 10, it will add to clickToWorkerEffects

            }, //should im make this one a % or a static number?
            {
                name: 'Lucky Manual Clicks',
                cost: 500,
                tier:1,
                description: 'Each manual click has a 5% chance to increase the resources generated by the next auto click by 4. This effect can stack with itself.',
                type: 'clickEffect',
                disposable:false,
                remove:false,
                effect: (clickToWorkerEffects) => { 
                    var rand = Math.ceil(Math.random() * 100) //random 1-100
                    var effect = workerResource => {return workerResource+4}
                    if (rand <= 5){ 
                        clickToWorkerEffects.current = [...clickToWorkerEffects.current, {effect:effect, consumable:true, workerName:'Auto Click', modifier:'resource', trigger:'completion'} ]
                    }   
                }
                //should give some visual to indicate when stacks are building
                //maybe should make it so the big burst of resources doesnt turn the earth so much so quickly
            },

    ],
    500:[
        {
            name:'Spawn',
            cost:800,
            tier:1,
            description:'Each manual click has a 5% chance to create an temporary Auto Click worker, which lasts for 15 seconds and generates resources every 3 seconds. Multiple of these temporary workers can co-exist.',
            type:'clickEffect',
            disposable:false,
            remove:false,
            effect: (clickToWorkerEffects) => { 
                var rand = Math.ceil(Math.random() * 100) //random 1-100
                if (rand <= 5){
                    var worker = {
                        name: 'Spawn', 
                        type: 'worker',
                        time: 3,
                        expiry: 15.1,
                        reward: resource => { return resource+1 }
                    }
                    clickToWorkerEffects.current = [...clickToWorkerEffects.current, worker]
                }   
            }
        },
        {
            name:'Click Support',
            cost:1000,
            tier:1,
            description:'Auto Click ticks have a y% chance to increase the amount of resources gained by the next manual click by x%',
            type:'workerEffect',
            disposable:false,
            remove:false,
            effect:()=>{}
        },
        {
            name:'Worship', 
            cost:1200,
            tier:1,
            description:'The resources earned by each manual click will be increased by the amount of workers working by x% per worker',
            type:'workerEffect',
            disposable:false,
            remove:false,
            effect:()=>{}
        }
    ],
    1200:[
        {
            name: 'Reasonable Clicker',
            cost: 1500,
            tier:1,
            description: 'Increases reasources earned by manual clicks by (5?)% of resources earned per second by workers.',
            type: 'clickEffect',
            disposable:false,
            effect: ()=>{}
        },
    ]
}

