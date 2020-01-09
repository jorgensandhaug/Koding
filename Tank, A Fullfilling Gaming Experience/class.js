class Bullet{
    constructor(x, y, dx, dy){
        this.pos = {x:x, y:y}
        this.vel = {x:dx, y:dy}
        this.r = 5
        this.pierces = 0
        this.connectedHunter = undefined
    }
    update(){
        this.pos.x+=this.vel.x
        this.pos.y+=this.vel.y
        this.draw()
    }
    draw(){
        c.beginPath()
        c.fillStyle = "red"
        c.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI)
        c.fill()
        c.closePath()
    }
}

class Hunter{
    constructor(){
        this.pos = {x: canvas.width, y: canvas.width/2}
        this.vel = {x: -5, y: 0}
        this.r = 10
        this.slowDown = false
        this.health = 150
        this.startHealth = this.health
    }
    draw(){
        c.beginPath()
        c.fillStyle="red"
        c.arc(this.pos.x, this.pos.y, this.r, 0, Math.PI*2)
        c.fill()
        c.closePath()
        c.beginPath()
        c.strokeStyle = "green"
        c.moveTo(this.pos.x - 10, this.pos.y + 15)
        c.lineTo(this.pos.x - 10 + (this.health/this.startHealth)*20, this.pos.y + 15)
        c.lineWidth = 2
        c.stroke()
        c.closePath()
    }
    update(){
        let deltaX = prevPos.x-this.pos.x
        let deltaY = prevPos.y-this.pos.y
        let phi = Math.atan2(deltaY, deltaX)
        this.vel.x = Math.cos(phi)*hunterSpeed
        this.vel.y = Math.sin(phi)*hunterSpeed
        if(this.slowDown){
            this.pos.x += this.vel.x*0.3
            this.pos.y += this.vel.y*0.3
        }
        else{
            this.pos.x+=this.vel.x
            this.pos.y+=this.vel.y
        }

        this.draw()
    }
}



class Pickup{
    constructor(x, y, ID, color){
        this.pos = {x:x, y:y}
        this.r = 15
        this.ID = ID
        this.color = color
    }
    draw(){
        c.beginPath()
        c.fillStyle = this.color
        c.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI)
        c.fill()
    }
    update(){
        if(!playerIsCarrying && distance(this, player) < this.r + player.r){
            playerIsCarrying = true
            player.carry = this
        }
        this.draw()
    }
}