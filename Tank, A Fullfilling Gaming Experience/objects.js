
let player = {
    pos: {x: canvas.width/2, y: canvas.height/2},
    vel: {x:0, y:0},
    r: 14,
    health: 400,
    money: 10000,
    carry: undefined,
    baseDmg: baseDmg,
    addedDmg: 0,
    color: "blue",
    
    draw: function(){
        c.beginPath()
        // c.fillStyle = this.color
        // c.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI)
        // c.fill()
        c.drawImage(tankImg, 0, 0, 64, 64, this.pos.x-24, this.pos.y-24, 48, 48)
        c.closePath()
        c.beginPath()
        c.moveTo(this.pos.x, this.pos.y)
        let deltaX = mouse.x-this.pos.x
        let deltaY = mouse.y-this.pos.y
        let phi = Math.atan2(deltaY, deltaX)
        c.moveTo(this.pos.x + Math.cos(phi)*this.r, this.pos.y + this.r*Math.sin(phi))
        c.lineTo(this.pos.x + Math.cos(phi)*gunLength, this.pos.y + gunLength*Math.sin(phi))
        c.lineWidth = 5
        c.stroke()
        c.closePath()
        if(playerIsCarrying){
            this.carry.pos.x = this.pos.x - Math.cos(phi)*pickupDistance
            this.carry.pos.y = this.pos.y - Math.sin(phi)*pickupDistance
        }

    },
    update: function(){
        player.baseDmg = baseDmg
        this.pos.x+=this.vel.x
        this.pos.y+=this.vel.y
        this.vel.x*=0.9
        this.vel.y*=0.9
        if(controller.w) {if(speedReduction[0]){this.vel.y = -(speed-speedReduction[1])} else{this.vel.y = -speed}}
        if(controller.s) {if(speedReduction[0]){this.vel.y = speed-speedReduction[1]} else{this.vel.y = speed}}
        if(controller.d) {if(speedReduction[0]){this.vel.x = speed-speedReduction[1]} else{this.vel.x = speed}}
        if(controller.a) {if(speedReduction[0]){this.vel.x = -(speed-speedReduction[1])} else{this.vel.x = -speed}}
        this.draw()

        if(this.health <= 0){
            stop = true
            youLose()
        }

        if(this.pos.x < this.r && !controller.d) this.vel.x = 0.01
        if(this.pos.x > canvas.width-this.r && !controller.a) this.vel.x = -0.01
        if(this.pos.y > canvas.height-this.r && !controller.w) this.vel.y = -0.01
        if(this.pos.y < this.r && !controller.s) this.vel.y = 0.01
    }
}

let healthBar = {
    leftTop: {x: 300, y: 50},
    height: 25,
    startHealth: player.health,
    color: "red",

    draw: function(){
        c.beginPath()
        c.fillStyle = this.color
        c.fillRect(this.leftTop.x, this.leftTop.y, 400*(player.health/this.startHealth), this.height)
        c.strokeStyle = "grey"
        c.strokeRect(this.leftTop.x, this.leftTop.y, 400, this.height)
        c.fillStyle = "black"
        c.textAlign = "center"
        c.font = "20px monospace"
        c.fillText(`HP: ${player.health} / ${this.startHealth}`, this.leftTop.x + 200, this.leftTop.y-25)
        c.closePath()
    },

    update: function(){

    }
}

let controller = {
    w: false,
    a: false,
    d: false,
    s: false
}
let mouse = {
    x: canvas.width/2,
    y: canvas.height/2
}

let moneyBar = {
    draw: function(){
        c.fillStyle = "green"
        c.textAlign = "start"
        c.font = "25 px monospace"
        c.fillText(`$${player.money}`, canvas.width-125, 60)
    }
}


let healthPots = {
    antall: 0,
    draw: function(){
        c.drawImage(healthPotImg, 0, 0, healthPotImg.width, healthPotImg.height, canvas.width-175, 30, 32, 32)
        c.font = "20px monospace"
        c.fillStyle = "black"
        c.fillText(this.antall, canvas.width-175 + 32 - 10, 30+32)
    }
}



defaultSettings()


