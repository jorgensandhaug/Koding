const canvas = document.querySelector("canvas")
const overlay = document.querySelector(".overlay")
const c = canvas.getContext("2d")
canvas.width = window.innerWidth-400
canvas.height = window.innerHeight-40


let tankImg = new Image()
tankImg.src = "sprites/smallTank1.png"
let healthPotImg = new Image()
healthPotImg.src = "sprites/healthPot.png"


let shopBtns = document.querySelectorAll(".shopBtn")



let type, speed, tid, bulletSpeed, gunLength, playerIsCarrying, hunterSpeed, moneyPerKill, pierces, tankLevel, mode, speedReduction, readyToShoot, baseDmg, bloom, fireRate, healthPotHeal
function defaultSettings(){
    healthPotHeal = 300
    readyToShoot = true
    speedReduction = [false, 1.5]
    weapons.pistol()
    fireRate = 3
    speed = 3
    tid = 0
    gunLength = 30
    playerIsCarrying = false
    hunterSpeed = 2
    moneyPerKill = 25
    tankLevel = 1
}


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
            tankImg.src = "sprites/smallTank2.png"
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
            speed = 6.5
            tankImg.src = "sprites/smallTank5.png"
        },
        function(){
            if(player.health > 275) player.health = 275 
            healthBar.startHealth = 275
            speed = 7
            tankImg.src = "sprites/smallTank6.png"
        },
        function(){
            if(player.health > 250) player.health = 250
            healthBar.startHealth = 250
            speed = 8.5
            tankImg.src = "sprites/smallTank7.png"
        },
    ],
    big: [
        function(){
            player.health = 500
            healthBar.startHealth = 500
            speed = 2.5
            tankImg.src = "sprites/smallTank1.png"
        },
        function(){
            if(player.health > 600) player.health = 600 
            healthBar.startHealth = 600
            speed = 2.5
            tankImg.src = "sprites/smallTank2.png"
        },
        function(){
            if(player.health > 700) player.health = 700 
            healthBar.startHealth = 700
            speed = 2.5
            tankImg.src = "sprites/smallTank3.png"
        },
        function(){
            if(player.health > 800) player.health = 800 
            healthBar.startHealth = 800
            speed = 2.5
            tankImg.src = "sprites/smallTank4.png"
        },
        function(){
            if(player.health > 900) player.health = 900 
            healthBar.startHealth = 900
            speed = 2.5
            tankImg.src = "sprites/smallTank5.png"
        },
        function(){
            if(player.health > 1000) player.health = 1000 
            healthBar.startHealth = 1000
            speed = 2.5
            tankImg.src = "sprites/smallTank6.png"
        },
        function(){
            if(player.health > 1500) player.health = 1500 
            healthBar.startHealth = 1500
            speed = 2
            tankImg.src = "sprites/smallTank7.png"
        }
    ]
}


let weapons = {
    pistol: function(){
        mode = "pistol"
        bulletSpeed = 5
        baseDmg = 50
        pierces = 0
    },
    smg: function(){
        mode = "smg"
        bulletSpeed = 3.5
        baseDmg = 25
        bloom = Math.PI/15
        fireRate = 4
    },
    lmg: function(){
        mode = "lmg"
        bulletSpeed = 5
        speedReduction = [true, 1.5]
        baseDmg = 65
        fireRate = 3
        bloom = Math.PI/12
    },
    sniper: function(){
        mode = "sniper"
        bulletSpeed = 10
        pierces = 2
        baseDmg = 100
    }
}



const distance = (ob1, ob2) => Math.sqrt(Math.pow(ob2.pos.x-ob1.pos.x, 2) + Math.pow(ob2.pos.y-ob1.pos.y, 2))


function startShop(){
    for(let i = 0; i<shopBtns.length; i++){
        shopBtns[i].addEventListener("click", function(){
    
            let price = Number(shopBtns[i].value.split("").slice(1).join(""))
    
            if(player.money >= price){
                player.money -= price
                if(i<5) shopFunctions[i](price)
    
                else{
                    weapons[shopBtns[i].name]()
                    for(let k = 5; k < shopBtns.length; k++){
                        shopBtns[k].value = shopBtns[k].id
                    }
                    shopBtns[i].value = "SELECTED"
                }
            }
        })
    }
}
function changeTank(){
    tanks[type][tankLevel-1]()
}

function pickSmallTank(){
    stop = false
    overlay.innerHTML = ""
    type = "small"
    changeTank()
    startShop()
}
function pickBigTank(){
    stop = false
    overlay.innerHTML = ""
    type = "big"
    changeTank()
    startShop()
}




const rotate = (vector, angle) =>[vector[0]*Math.cos(angle) - vector[1]*Math.sin(angle), vector[0]*Math.sin(angle) + vector[1]*Math.cos(angle)]



function pressDown(e){
    if(e.key == "h" || e.key == "H") {healthPots.antall -= 1; player.health += healthPotHeal; if(player.health > healthBar.startHealth) player.health = healthBar.startHealth}
    else controller[e.key] = true
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
    changeTank()
    stop = false
    overlay.style.display = "none"
    player.health = 400
    healthBar.startHealth = 400
    player.pos = {x:canvas.width/2, y:canvas.height/2}
    player.money = 0
    bulletArr = []
    hunterArr = []
    for(let i = 0; i < shopBtns.length; i++){
        shopBtns[i].value = shopBtns[i].id
    }
    weapons[shopBtns[5].name]()
    shopBtns[5].value = "SELECTED"

    
    // pickup1 = new Pickup(100, 100, "pink1", "pink")
    // pickup2 = new Pickup(200, 100, "yellow1", "yellow")
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

let oldTime = 0

function randomInt(min, max){
    return Math.random()*(max-min)+min
}

function shoot(){
    mouseIsPressed = true
    let deltaX = mouse.x-player.pos.x
    let deltaY = mouse.y-player.pos.y
    let phi = Math.atan2(deltaY, deltaX)
    if(mode == "sniper"){
        if(tid - oldTime >= 1) {readyToShoot = true; oldTime = tid}
        else readyToShoot = false
    }
    else if(mode == "pistol") readyToShoot = true
    if(readyToShoot) bulletArr.push(new Bullet(player.pos.x + Math.cos(phi)*gunLength, player.pos.y + Math.sin(phi)*gunLength, Math.cos(phi)*bulletSpeed + player.vel.x*0.5, Math.sin(phi)*bulletSpeed + player.vel.y*0.5))
    readyToShoot = false
}

function spray(){
    let deltaX = mouse.x-player.pos.x
    let deltaY = mouse.y-player.pos.y
    let phi = Math.atan2(deltaY, deltaX)
    phi = randomInt(phi-bloom, phi+bloom)
    if((tid-oldTime)*fireRate >= 1/fireRate){
        bulletArr.push(new Bullet(player.pos.x + Math.cos(phi)*gunLength, player.pos.y + Math.sin(phi)*gunLength, Math.cos(phi)*bulletSpeed + player.vel.x*0.5, Math.sin(phi)*bulletSpeed + player.vel.y*0.5))
        oldTime = tid
    }
}




let shopFunctions = [
    function(pris){
        if(tankLevel < 7){
            tankLevel+=1
            changeTank()
            let nyPris = pris + 300
            shopBtns[0].value = `$${nyPris}`
        }
        else{
            shopBtns[0].value = `MAXED OUT`
            player.money += pris
        }
    },
    function(pris){
        pierces+=1
        let nyPris = pris + 1000
        shopBtns[1].value = `$${nyPris}`
    },
    function(pris){
        player.addedDmg+=50
        let nyPris = pris + 400
        shopBtns[2].value = `$${nyPris}`
    },
    function(pris){
        moneyPerKill += 50
        let nyPris = pris + 2000
        shopBtns[3].value = `$${nyPris}`
    },
    function(){
        healthPots.antall += 1
    }
]






document.querySelector("#smallTank").addEventListener("click", pickSmallTank)
document.querySelector("#bigTank").addEventListener("click", pickBigTank)
window.addEventListener("mousemove", moveMouse)
window.addEventListener("mousedown", shoot)
window.addEventListener("mouseup", function(){ mouseIsPressed = false })
window.addEventListener("keydown", pressDown)
window.addEventListener("keyup", releaseKey)