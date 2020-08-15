const seed = Date.now()
// const simplexNoise = openSimplexNoise(seed)
// const simplexNoise = 
const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")

let simplex = new SimplexNoise(seed)


canvas.height = window.innerHeight
canvas.width = window.innerWidth
const w = canvas.width
const h = canvas.height
let res = 20
let z = 0
let inc = 0.02


function line(p1, p2){
    c.lineWidth = 3
    const hue = simplex.noise3D(p1.x/2000, p1.y/2000, z/2)*400
    c.strokeStyle = `hsl(${hue}, 50%, 50%)`
    c.beginPath()
    c.moveTo(p1.x, p1.y)
    c.lineTo(p2.x, p2.y)
    c.stroke()
    c.closePath()
}


let xOff, yOff, dotArr
function draw(){
    z += 0.005
    dotArr = []

    yOff = 0
    for(let y = 0; y < Math.floor(h/res) + 1; y++){
        xOff = 0
        yOff += inc
        dotArr[y] = []
        for(let x = 0; x < Math.floor(w/res) + 1; x++){
            xOff += inc
            dotArr[y][x] = simplex.noise3D(xOff, yOff, z) < 0 ? 0 : 1
        }
    }

    requestAnimationFrame(draw)
    c.fillStyle = "black"
    c.fillRect(0, 0, w, h)


    // dette er versjon med fargerike linjer:

    res = 5
    inc = 0.007
    for(let y = 0; y < dotArr.length - 1; y++){
        for(let x = 0; x < dotArr[y].length - 1; x++){
            const a = dotArr[y][x]
            const b = dotArr[y][x+1]
            const c = dotArr[y+1][x+1]
            const d = dotArr[y+1][x]
            drawLines(x, y, a, b, c, d)
        }
    }

    // dette er versjon med fulle farger, men mer pikselert:

    // res = 20
    // inc = 0.02
    // dotArr.forEach( (row, y) =>{
    //     row.forEach( (val, x) =>{
    //         if(val == 1){
    //             const hue = simplex.noise3D(x/2000, y/2000, z/2)*400
    //             c.fillStyle = `hsl(${hue}, 50%, 50%)`
    //         }
    //         else{
    //             const hue = simplex.noise3D(x/2000, y/2000, z/2 + 10000)*400
    //             c.fillStyle = `hsl(${hue}, 50%, 50%)`
    //         }
    //         c.fillRect(x*res, y*res, res, res)
    //     })
    // })

}

function drawLines(x, y, a, b, c, d){
    const binar = String(a)+String(b)+String(c)+String(d)
    // console.log(binar)
    const pA = {x: res * (x+0.5), y: res * y}
    const pB = {x: res * (x+1), y: res * (y+0.5)}
    const pC = {x: res * (x+0.5), y: res * (y+1)}
    const pD = {x: res * x, y: res * (y+0.5)}

    switch(binar){
        case "1000": line(pA, pD); break;
        case "1001": line(pA, pC); break;
        case "1011": line(pA, pB); break;
        case "1010": line(pA, pB); line(pC, pD); break;
        case "1110": line(pC, pD); break;
        case "1101": line(pB, pC); break;
        case "1100": line(pB, pD); break;
        case "0001": line(pC, pD); break;
        case "0011": line(pB, pD); break;
        case "0010": line(pB, pC); break;
        case "0100": line(pA, pB); break;
        case "0101": line(pA, pD); line(pB, pC); break;
        case "0110": line(pA, pC); break;
        case "0111": line(pA, pD); break;
    }
}

draw()