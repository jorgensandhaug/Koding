const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.width = window.innerWidth-10
canvas.height = window.innerHeight-10

class Wall{
    constructor(x1, y1, x2, y2){
        this.a = {x: x1, y: y1}
        this.b = {x: x2, y: y2}
    }
    show(){
        c.beginPath()
        c.strokeStyle = "white"
        c.moveTo(this.a.x, this.a.y)
        c.lineTo(this.b.x, this.b.y)
        c.stroke()
        c.closePath()
    }
}
let walls = []
for(let i = 0; i < 10; i++){
    const x1 = Math.random()*canvas.width
    const x2 = Math.random()*canvas.width
    const y1 = Math.random()*canvas.height
    const y2 = Math.random()*canvas.height
    walls.push(new Wall(x1, y1, x2, y2))
}
let lightSource = new Light(canvas.width/2, canvas.height/2)
walls.push(new Wall(0, 0, 0, canvas.height))
walls.push(new Wall(canvas.width, 0, canvas.width, canvas.height))
walls.push(new Wall(0, 0, canvas.width, 0))
walls.push(new Wall(0, canvas.height, canvas.width, canvas.height))


//input
const moveSpeed = 5
const viewAngle = Math.PI/4
let moveDir = {
    x: 0,
    y: 0
}
let keys = {
    w: false,
    a: false,
    s: false,
    d: false
}
window.addEventListener("keydown", e=>{
    if(keys[e.key] == true || keys[e.key] == false) keys[e.key] = true
})
window.addEventListener("keyup", e=>{
    if(keys[e.key] == true || keys[e.key] == false) keys[e.key] = false
})

let angleToMouse = 0
window.addEventListener("mousemove", e=>{
    angleToMouse = Math.atan2(e.clientY-lightSource.pos.y, e.clientX-lightSource.pos.x)
})

function draw(){
    requestAnimationFrame(draw)
    c.fillStyle = "black"
    c.fillRect(0, 0, canvas.width, canvas.height)

    for(let wall of walls){
        wall.show()
    }

    //bevegelse av lyskilden
    if(Math.abs(moveDir.x) == 1 && Math.abs(moveDir.y) == 1){
        moveDir.x *= 1/Math.sqrt(2)
        moveDir.y *= 1/Math.sqrt(2)
    }

    if((keys.w && keys.s) || (!keys.w && !keys.s)) moveDir.y = 0
    else if(keys.w) moveDir.y = -1
    else if(keys.s) moveDir.y = 1

    if((keys.a && keys.d) || (!keys.a && !keys.d)) moveDir.x = 0
    else if(keys.a) moveDir.x = -1
    else if(keys.d) moveDir.x = 1
    
    if(Math.abs(moveDir.x) == 1 && Math.abs(moveDir.y) == 1){
        moveDir.x *= 1/Math.sqrt(2)
        moveDir.y *= 1/Math.sqrt(2)
    }

    // console.log(keys)

    lightSource.pos.x += moveDir.x*moveSpeed
    lightSource.pos.y += moveDir.y*moveSpeed
    if(lightSource.pos.x < 1) lightSource.pos.x = 1
    else if(lightSource.pos.x > canvas.width-1) lightSource.pos.x = canvas.width-1
    if(lightSource.pos.y < 1) lightSource.pos.y = 1
    else if(lightSource.pos.y > canvas.height-1) lightSource.pos.y = canvas.height-1

    //sender ut alle rays
    lightSource.update(walls, angleToMouse, viewAngle)
    c.fillStyle = "red"
    c.arc(lightSource.pos.x, lightSource.pos.y, 5, 0, Math.PI*2)
    c.fill()
}
draw()