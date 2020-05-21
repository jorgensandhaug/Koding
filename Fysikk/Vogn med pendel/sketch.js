const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.width = window.innerWidth-10
canvas.height = window.innerHeight-10
const w = canvas.width
const h = canvas.height

let vogn = {
    x: w/2,
    y: h/2,
    width: 120,
    height: 40,
    dx: 0,
}
let pendel = {
    length: 100,
    angle: Math.PI/4,
    aVel: 0,
    aAcc: 0,
    r: 10
}



function visPendel(){
    const a = pendel.angle + Math.PI/2
    c.beginPath()
    c.strokeStyle = "blue"
    c.fillStyle = "blue"
    c.moveTo(vogn.x, vogn.y - 150)

    const kulePos = {
        x: vogn.x + pendel.length*Math.cos(a),
        y: vogn.y - 150 + pendel.length*Math.sin(a)
    }
    c.lineTo(kulePos.x, kulePos.y)
    c.stroke()
    c.closePath()
    c.beginPath()
    c.arc(kulePos.x, kulePos.y, pendel.r, 0, Math.PI*2)
    c.fill()
    c.closePath()
}
function visVogn(){
    c.fillStyle = "red"
    console.log(vogn.x)
    c.fillRect(vogn.x-vogn.width/2, vogn.y, vogn.width, vogn.height)
    c.strokeStyle = "black"
    c.beginPath()
    c.moveTo(vogn.x, vogn.y)
    c.lineTo(vogn.x, vogn.y - 150)
    c.stroke()
    c.closePath()
}

function update(){
    requestAnimationFrame(update)
    c.clearRect(0, 0, w, h)

    pendel.aAcc = -0.01* Math.sin(pendel.angle)
    pendel.aVel += pendel.aAcc
    pendel.angle += pendel.aVel
    vogn.x+=vogn.dx
    visVogn()
    visPendel()
}
update()