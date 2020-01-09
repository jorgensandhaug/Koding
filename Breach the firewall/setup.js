const canvas = document.querySelector("canvas")
const overlay = document.querySelector(".overlay")
const c = canvas.getContext("2d")
canvas.width = window.innerWidth-400
canvas.height = window.innerHeight-40


let tankImg = new Image()
tankImg.src = "sprites/smallTank1.png"


let type, speed, tid, bulletSpeed, gunLength, playerIsCarrying, hunterSpeed, moneyPerKill, pierces, tankLevel
function defaultSettings(){
    speed = 3
    tid = 0
    bulletSpeed = 5
    gunLength = 30
    playerIsCarrying = false
    hunterSpeed = 2
    moneyPerKill = 25
    pierces = 0
    tankLevel = 4
}
defaultSettings()

let pushAwayStrengt = 0.2
let pushWhenHitStrength = 30
let pickupDistance = 10
let stop = true
let bulletArr = []
let hunterArr = []

let tanks = {
    small: [
        function(){
            player.health = 400
            healthBar.startHealth = 400
            speed = 3
            tankImg.src = "sprites/smallTank1.png"
        },
        function(){
            if(player.health > 375) player.health = 375 
            healthBar.startHealth = 375
            speed = 4
            tankImg.src = "sprites/smallTank2.pngsprites/"
        },
        function(){
            if(player.health > 350) player.health = 350 
            healthBar.startHealth = 350
            speed = 5
            tankImg.src = "sprites/smallTank3.png"
        },
        function(){
            if(player.health > 325) player.health = 325 
            healthBar.startHealth = 325
            speed = 6
            tankImg.src = "sprites/smallTank4.png"
        },
        function(){
            if(player.health > 300) player.health = 300 
            healthBar.startHealth = 300
            speed = 7
            tankImg.src = "sprites/smallTank5.png"
        },
    ],
    big: [
        function(){
            if(player.health > 500) player.health = 500 
            healthBar.startHealth = 500
            speed = 2.5
            player.color = "green"
        },
        function(){
            if(player.health > 600) player.health = 600 
            healthBar.startHealth = 600
            speed = 2.5
            player.color = "brown"
        },
        function(){
            if(player.health > 700) player.health = 700 
            healthBar.startHealth = 700
            speed = 2.5
            player.color = "grey"
        },
        function(){
            if(player.health > 800) player.health = 800 
            healthBar.startHealth = 800
            speed = 2.5
            player.color = "#722f37"
        },
        function(){
            if(player.health > 900) player.health = 900 
            healthBar.startHealth = 900
            speed = 2.5
            player.color = "black"
        },


    ]
}

const distance = (ob1, ob2) => Math.sqrt(Math.pow(ob2.pos.x-ob1.pos.x, 2) + Math.pow(ob2.pos.y-ob1.pos.y, 2))

function changeTank(){
    tanks[type][tankLevel-1]()
}

function pickSmallTank(){
    stop = false
    overlay.innerHTML = ""
    type = "small"
    changeTank()
}
function pickBigTank(){
    stop = false
    overlay.innerHTML = ""
    type = "big"
    changeTank()
}




const rotate = (vector, angle) =>[vector[0]*Math.cos(angle) - vector[1]*Math.sin(angle), vector[0]*Math.sin(angle) + vector[1]*Math.cos(angle)]



function pressDown(e){
    if (e.type == "keydown"){
        controller[e.key] = true
    }
}
function releaseKey(e){
    controller[e.key] = false
}
function moveMouse(e){
    mouse.x = e.clientX
    mouse.y = e.clientY
}
function restart(){
    defaultSettings()
    stop = false
    overlay.style.display = "none"
    player.health = 400
    healthBar.startHealth = 400
    player.pos = {x:canvas.width/2, y:canvas.height/2}
    player.money = 0
    bulletArr = []
    hunterArr = []
    pickup1 = new Pickup(100, 100, "pink1", "pink")
    pickup2 = new Pickup(200, 100, "yellow1", "yellow")
}

function youLose(){
    overlay.style = ""
    overlay.innerHTML = `You lose <input type="button" class="restart" value="Restart?">`
    overlay.style.position = "absolute"
    overlay.style.fontSize = "40px"
    overlay.style.left = `${canvas.width/2-100}px`
    overlay.style.top = `${canvas.height/2-30}px`
    let restartBtn = document.querySelector(".restart")
    restartBtn.addEventListener("click", restart)
}



function shoot(){
    let deltaX = mouse.x-player.pos.x
    let deltaY = mouse.y-player.pos.y
    let phi = Math.atan2(deltaY, deltaX)
    bulletArr.push(new Bullet(player.pos.x + Math.cos(phi)*gunLength, player.pos.y + Math.sin(phi)*gunLength, Math.cos(phi)*bulletSpeed + player.vel.x*0.5, Math.sin(phi)*bulletSpeed + player.vel.y*0.5))
}


let shopFunctions = [
    function(pris){
        tankLevel+=1
        changeTank()
        let nyPris = pris + 300
        shopBtns[0].value = `$${nyPris}`
    },
    function(pris){
        pierces+=1
        let nyPris = pris + 1000
        shopBtns[1].value = `$${nyPris}`
    },
    function(pris){
        player.damage+=50
        let nyPris = pris + 400
        shopBtns[2].value = `$${nyPris}`
    },
    function(pris){
        moneyPerKill += 50
        let nyPris = pris + 2000
        shopBtns[3].value = `$${nyPris}`
    },
    function(){
        console.log("Du kjøpte en HP potion")
    }
]

let shopBtns = document.querySelectorAll(".shopBtn")

for(let i = 0; i<shopBtns.length; i++){
    shopBtns[i].addEventListener("click", function(){
        let price = Number(shopBtns[i].value.split("").slice(1).join(""))
        if(player.money >= price){
            player.money -= price
            shopFunctions[i](price)
        } 
    })
}




document.querySelector("#smallTank").addEventListener("click", pickSmallTank)
document.querySelector("#bigTank").addEventListener("click", pickBigTank)
window.addEventListener("mousemove", moveMouse)
window.addEventListener("mousedown", shoot)
window.addEventListener("keydown", pressDown)
window.addEventListener("keyup", releaseKey)