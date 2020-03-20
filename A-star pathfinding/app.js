const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.width = 1200
canvas.height = 600

const scale = 30


// let mapArr = Array(20).fill(Array(40).fill(0))
let mapArr = []
for(let i = 0; i < 20; i++){
    mapArr[i] = []
    for(let j = 0; j < 40; j++){
        mapArr[i][j] = 0
    }
}
// console.log(mapArr)
// mapArr[10][20] = 1
// console.log(mapArr)

function draw(){
    mapArr.forEach((row, y) => {
        row.forEach((value, x) => {
            if(value == 1){ 
                c.fillStyle = "black"
                c.beginPath()
                c.fillRect(x*scale, y*scale, scale, scale)
                c.closePath()
        }
        })
    })
}

function drawStartpoint(){
    c.fillStyle = "black"
    c.fillRect(startPoint.x*scale, startPoint.y*scale, scale, scale)
    c.fillText("Start", startPoint.x*scale, startPoint.y*scale)
    c.fillText("End", endPoint.x*scale, endPoint.y*scale)
    c.fillRect(endPoint.x*scale, endPoint.y*scale, scale, scale)
}

let totalDist = 0
const longDist = (p1, p2) => {
    let dx = Math.abs(p2.x-p1.x)
    let dy = Math.abs(p2.y-p1.y)
    return 10*(dx+dy) + Math.min(dx, dy)*(-6)
}

const shortDist = (p1, p2) => {
    if(p1.x == p2.x || p1.y == p2.y) return 10
    else return 14
}
let startPoint = {y: 0,x:0}
const endPoint = {y: 19,x:39}
let bestOption = 0


class Square{
    constructor(y, x){
        this.y = y
        this.x = x
        this.index = squareArr.length-1
        this.G = longDist(this, startPoint)
        this.H = longDist(this, endPoint)
        this.F = this.G+this.H
    }


    calculateNext(){
        
        for(let y = this.y-1; y <= this.y+1; y++){
            for(let x = this.x-1; x <= this.x+1; x++){
                if(x >= 0 && x < mapArr[0].length && y >= 0 && y < mapArr.length && mapArr[y][x]==0){
                    if(x == this.x && y == this.y){
                        c.fillStyle = "red"
                        c.fillRect(x*scale, y*scale, scale, scale)
                        // mapArr[y][x] = 1
                    }
                    else{
                        // mapArr[y][x] = 2

                        c.fillStyle = "green"
                        c.fillRect(x*scale, y*scale, scale, scale)
                        c.fillStyle = "black"
                        c.font = "8px Arial"
                        c.fillText(`${squareArr[squareArr.length-1].G}`, x*scale, y*scale+0.3*scale)
                        c.fillText(`${squareArr[squareArr.length-1].H}`, x*scale+scale*.5, y*scale+0.3*scale)
                        c.font = "13px Arial"
                        c.fillText(`${squareArr[squareArr.length-1].F}`, x*scale+.15*scale, y*scale+scale*.7)
                        if(squareArr.find( square => square.x == x && square.y == y ) == undefined && finishedArr.find(square => square.x == x && square.y == y) == undefined){
                            squareArr.push(new Square(y, x))
                        }
                    }
                }
               
            }
        }
        finishedArr.push(this)
        squareArr.splice(this.index, 1)
        let smallestF = Infinity
        squareArr.forEach( (square, index) => {
            if(square.F < smallestF){
                smallestF = square.F
            }
        })
        let smallestH = Infinity
        bestOption = undefined
        squareArr.forEach( (square, index) => {
            if(square.F == smallestF){
                // console.log(square.H)
                if(square.H < smallestH){
                    bestOption = index
                    smallestH = square.H
                }
            }
        })
    }
}
let finishedArr = []
let squareArr = [startPoint]
startPoint = new Square(startPoint.y, startPoint.x)
squareArr[0] = startPoint

drawStartpoint()
function startPath(){
    c.clearRect(0, 0, canvas.width, canvas.height)
    drawStartpoint()
    let run = setInterval(() => {
        draw()
        squareArr[bestOption].calculateNext()
        if(squareArr[bestOption].y == endPoint.y && squareArr[bestOption].x == endPoint.x){
            clearInterval(run)
        }
    }, 100)
}

let mouseIsPressed = false
let mouse = {
    x: undefined,
    y: undefined
}
function updateMousePos(e){
    mouse.x = Math.floor(e.clientX/scale)
    mouse.y = Math.floor(e.clientY/scale)
}
function makeWall(){
        c.fillStyle = "black"
        c.fillRect(mouse.x*scale, mouse.y*scale, scale, scale)
        mapArr[mouse.y][mouse.x] = 1
    
    // else{
    //     c.fillStyle = "white"
    //     c.fillRect(mouse.x*scale, mouse.y*scale, scale, scale)
    //     mapArr[mouse.y][mouse.x] = 0
    // }

}
canvas.addEventListener("mousedown", (e) => {
    makeWall()
    updateMousePos(e)
    mouseIsPressed = true
})
canvas.addEventListener("mouseup", (e) => {
    mouseIsPressed = false
})
canvas.addEventListener("mousemove", (e)=>{
    updateMousePos(e)
    if(mouseIsPressed){
        makeWall()
    }
})

window.addEventListener("keydown", (e)=>{
    if(e.keyCode == 13){
        startPath()
    }
})
   


