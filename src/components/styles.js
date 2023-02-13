export var containerStyle = {
    display: 'flex',
    flexDirection: 'column',
    flexGrow:'1',
    border: '1px inset white',
    maxWidth: '33%'
}

export var upgradeStyle = {
    userSelect:'none',
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    width:'100',
    background:`linear-gradient(0deg, rgba(255,255,255,0.5), rgba(0,0,50,0.5)), url(https://grainy-gradients.vercel.app/noise.svg)`,
    //should try: keep gradient above except take out its blue, then add griadient right to left, where the blueish hue is on the right
    borderRadius:5,
    border: '3px inset grey',
    padding: '10px',
    fontFamily: 'Verdana, sans-serif',
    transition:'opacity 0.7s',
    cursor:'pointer'
} 