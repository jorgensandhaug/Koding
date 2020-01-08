
let player = {
    pos: {x: canvas.width/2, y: canvas.height/2},
    vel: {x:0, y:0},
    r: 15,
    health: 400,
    carry: undefined,
    
    draw: function(){
        c.beginPath()
        c.fillStyle = "blue"
        c.arc(this.pos.x, this.pos.y, this.r, 0, 2*Math.PI)
        c.fill()
        c.closePath()
        c.beginPath()
        c.moveTo(this.pos.x, this.pos.y)
        let deltaX = mouse.x-this.pos.x
        let deltaY = mouse.y-this.pos.y
        let phi = Math.atan2(deltaY, deltaX)
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
        this.pos.x+=this.vel.x
        this.pos.y+=this.vel.y
        this.vel.x*=0.9
        this.vel.y*=0.9
        if(controller.w) this.vel.y = -speed
        if(controller.s) this.vel.y = speed
        if(controller.d) this.vel.x = speed
        if(controller.a) this.vel.x = -speed
        this.draw()
    }
}