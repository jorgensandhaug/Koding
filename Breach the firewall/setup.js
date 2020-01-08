const canvas = document.querySelector("canvas")
const overlay = document.querySelector(".overlay")
const c = canvas.getContext("2d")
canvas.width = 1000
canvas.height = 600
let speed = 3
let tid = 0
let bulletSpeed = 5
let pushAwayStrengt = 0.2
let pushWhenHitStrength = 30
let gunLength = 30
let playerIsCarrying = false
let pickupDistance = 10
let hunterSpeed = 2
let stop = false
let bulletArr = []
let hunterArr = []
let pierces = 1
let tankLevel = 0
let type = "small"
let tanks = {
    small: [
        function(){
            player.health = 400
            healthBar.startHealth = 400
            speed = 3
            player.color = "blue"
        },
        function(){
            player.health = 375
            healthBar.startHealth = 375
            speed = 4
            player.color = "purple"
        },
        function(){
            player.health = 350
            healthBar.startHealth = 350
            speed = 5
            player.color = "red"
        },
    ],
    big: [
        function(){
            player.health = 500
            healthBar.startHealth = 500
            speed = 2.5
            player.color = "green"
        }

    ]
}

const distance = (ob1, ob2) => Math.sqrt(Math.pow(ob2.pos.x-ob1.pos.x, 2) + Math.pow(ob2.pos.y-ob1.pos.y, 2))

function pickSmallTank(){
    loop()
    overlay.innerHTML = ""
    type = "small"
    changeTank()
}
function pickBigTank(){
    loop()
    overlay.innerHTML = ""
    type = "big"
    changeTank()
}
function changeTank(){
    tanks[type][tankLevel]()
}
document.querySelector("#smallTank").addEventListener("click", pickSmallTank)
document.querySelector("#bigTank").addEventListener("click", pickBigTank)