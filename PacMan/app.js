const y2 = 11.5
const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight
let w = canvas.width
let h = canvas.height

let map = [[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1],[1,2,2,2,2,1,2,2,2,2,2,2,2,2,2,1,2,1,2,1],[1,2,2,2,2,1,2,1,1,1,2,1,2,1,2,1,2,2,2,1],[1,2,1,1,1,1,2,2,2,2,2,1,2,1,2,1,2,1,2,1],[1,2,2,2,2,2,2,2,2,2,2,1,2,1,2,1,2,2,2,1],[1,2,1,1,2,2,1,1,2,1,2,1,2,1,2,1,2,1,2,1],[1,2,1,2,2,1,1,2,2,1,2,1,1,1,2,2,2,2,2,1],[1,2,1,1,2,2,1,2,2,2,2,2,2,2,2,1,1,1,1,1],[1,2,1,1,2,1,1,2,2,1,2,1,1,1,1,1,2,2,2,1],[1,2,1,2,2,1,1,2,2,1,2,1,2,2,2,2,2,1,2,1],[1,2,2,2,1,1,2,2,1,1,2,2,2,2,2,2,2,1,2,1],[1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1]]
let startMap = JSON.parse(JSON.stringify(map))
// for(let y = 0; y < 12; y++){
//     map[y] = []
//     for(let x = 0; x < 20; x++){
//         if(y == 0 || y == 11 || x == 0 || x == 19){
//             map[y][x] = 1
//         }
//         else{
//             map[y][x] = 2
//         }
//     }
// }

let scaleX = Math.ceil(w/map[0].length)
let scaleY = Math.ceil(h/map.length)
//resizer canvas
window.addEventListener("resize", ()=>{
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    w = canvas.width
    h = canvas.height

    scaleX = Math.ceil(w/map[0].length)
    scaleY = Math.ceil(h/map.length)
})

pacSpriteX = [0, 9, 17.5, 26]
let lastTime = 0
let pacSpriteIndex = 0
let animatePac = true
function updatepacSpriteIndex(time){
    if(animatePac && time-lastTime > 100){
        lastTime = time
        pacSpriteIndex ++
        if(pacSpriteIndex == 3) pacSpriteIndex = 0
    }
}

let spriteSheet = new Image()
spriteSheet.src = "sprites/spritesheet.png"


let mouseDown = false
window.addEventListener("mousedown", e=>{
    mouseDown = true
    const x = Math.floor(e.clientX / scaleX)
    const y = Math.floor(e.clientY / scaleY)
    
    if(map[y][x] == 2 || map[y][x] == 0) map[y][x] = 1
    else if(map[y][x] == 1) map[y][x] = 2
})
window.addEventListener("mouseup", ()=>{
    mouseDown = false
})
window.addEventListener("mousemove", e=>{
    if(mouseDown){
        const x = Math.floor(e.clientX / scaleX)
        const y = Math.floor(e.clientY / scaleY)
        map[y][x] = 1
    }
})


//pac
let pac = {
    x: 1,
    y: 1,
    direction: "right"
}
let enemies = [
    //1
    {
        x: map[0].length-2,
        y: map.length-2,
        direction: "up"
    },
    //2
    {
        x: map[0].length-2,
        y: map.length-6,
        direction: "left"
    },
    //3
    {
        x: 6,
        y: 1,
        direction: "right"
    },
    //4
    {
        x: 2,
        y: map.length-2,
        direction: "left"
    },
]
let startEnemies = JSON.parse(JSON.stringify(enemies))

map[pac.y][pac.x] = 0

//draw
let run = true
function timeLoop(time = 0){
    requestAnimationFrame(timeLoop)

    //alt som skjer hver frame her
    updatepacSpriteIndex(time)

    c.fillStyle = "beige"
    c.fillRect(0,0, w, h)
    
    //tegne inn kartet
    map.forEach( (row, y) =>{
        row.forEach( (val, x) =>{
            if(val == 1){
                c.fillStyle = "black"
                c.fillRect(x*scaleX, y*scaleY, scaleX, scaleY)
            }
            else if(val == 2){
                c.fillStyle = "yellow"
                c.fillRect(x*scaleX + 3/8 * scaleX, y*scaleY + 3/8 * scaleY, 2/8 * scaleX, 2/8 * scaleY)
            }
        })
    })

    c.save()
    c.translate(pac.x*scaleX + scaleX/2, pac.y*scaleY + scaleY/2)
    if(pac.direction == "left") c.rotate(Math.PI)
    else if(pac.direction == "down") c.rotate(Math.PI/2)
    else if(pac.direction == "up") c.rotate(-Math.PI/2)
    c.drawImage(spriteSheet, pacSpriteX[pacSpriteIndex]*20, y2*20, 8*20, 8*20, -scaleX/2, -scaleY/2, scaleX, scaleY)
    c.restore()

    for(let i = 0; i < enemies.length; i++){
        if(enemies[i].direction == "left") c.drawImage(spriteSheet, 12, 0, 8*20, 9.5*20, enemies[i].x*scaleX, enemies[i].y*scaleY, scaleX, scaleY)
        else if(enemies[i].direction == "right") c.drawImage(spriteSheet, pacSpriteX[1]*20, 0, 8*20, 9.5*20, enemies[i].x*scaleX, enemies[i].y*scaleY, scaleX, scaleY)
        else if(enemies[i].direction == "down") c.drawImage(spriteSheet, pacSpriteX[2]*20 - 20, 0, 8*21, 9.5*20, enemies[i].x*scaleX, enemies[i].y*scaleY, scaleX, scaleY)
        else if(enemies[i].direction == "up") c.drawImage(spriteSheet, pacSpriteX[3]*20 - 20, 0, 8*20, 9.5*20, enemies[i].x*scaleX, enemies[i].y*scaleY, scaleX, scaleY)
    }
}


let gameLoop
const directions = ["right", "up", "left", "down"]
function move(ob){
    if(ob.direction == "right") ob.x += 1
    else if(ob.direction == "left") ob.x -= 1
    else if(ob.direction == "up") ob.y -= 1
    else if(ob.direction == "down") ob.y += 1
}
spriteSheet.addEventListener("load",()=>{
    gameLoop = setInterval(()=>{
        if(run){
            //save pac previous position
            let prevPos = {
                x: pac.x,
                y: pac.y
            }
            //movement for pac
            move(pac)

            if(map[pac.y][pac.x] == 1){
                pac.x = prevPos.x
                pac.y = prevPos.y
                animatePac = false
            }
            else{
                animatePac = true
            }
            map[pac.y][pac.x] = 0


            for(let i = 0; i < enemies.length; i++){
                for(let x = 0; x < 10; x++){
                    let prevPos = {
                        x: enemies[i].x,
                        y: enemies[i].y
                    }
                    move(enemies[i])
                    if(map[enemies[i].y][enemies[i].x] != 1) break
                    else{
                        enemies[i].x = prevPos.x
                        enemies[i].y = prevPos.y
                        enemies[i].direction = directions[Math.floor(Math.random()*4)]
                    }
                }

                if(enemies[i].x == pac.x && enemies[i].y == pac.y){
                    run = false
                    console.log("du tapte")
                    setTimeout( ()=>{
                        map = JSON.parse(JSON.stringify(startMap))
                        enemies = JSON.parse(JSON.stringify(startEnemies))
                        pac.x = 1
                        pac.y = 1
                    }, 1000)
                }


            }

            

            if(isMapCompleted(map)){
                console.log("Du vinner")
            }
        }
    }, 300)
    timeLoop()
})

function isMapCompleted(arr){
    for(let y = 0; y < map.length; y++){
        for(let x = 0; x < map[0].length; x++){
            if(arr[y][x] == 2) return false
        }
    }
    return true
}




//controller
window.addEventListener("keydown", e=>{
    switch(e.keyCode){
        case 65: {pac.direction = "left"; break}
        case 68: {pac.direction = "right"; break}
        case 87: {pac.direction = "up"; break}
        case 83: {pac.direction = "down"; break}
        case 32: {run = run == true ? false : true; break}
        case 13: {console.log(JSON.stringify(map)); break}
    }
})