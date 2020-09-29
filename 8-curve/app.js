const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
const w = canvas.width
const h = canvas.height


const a = 500
const inc = 0.1
const moveStep = 0.001
let offSet = 0

function loop(){

    requestAnimationFrame(loop)
    c.fillStyle = "black"
    c.fillRect(0, 0, w, h)

    offSet += moveStep
    for(let x = 0 + offSet; x < 2*Math.PI + offSet; x+= inc){
        c.fillStyle = `hsl(${x*50}, 50%, 50%)`
        c.beginPath()
        c.arc(w/2 + a*Math.sin(x), h/2 + a*Math.sin(x)*Math.cos(x), w/150, 0, 2*Math.PI)
        c.fill()
        c.closePath()
    }
}
loop()