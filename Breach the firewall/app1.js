let prevPos = player.pos
setInterval(function(){
    prevPos = player.pos
}, 1000)

let pickup1 = new Pickup(100, 100, "pink1", "pink")
let pickup2 = new Pickup(200, 100, "yellow1", "yellow")

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
    stop = false
    tid = 0
    player.health = 400
    overlay.style.display = "none"
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
window.addEventListener("mousemove", moveMouse)
canvas.addEventListener("mousedown", shoot)
window.addEventListener("keydown", pressDown)
window.addEventListener("keyup", releaseKey)



setInterval(function(){
    hunterArr.push(new Hunter())
}, 1000)

setInterval(function(){
    tid+=1
    if(tid%3 == 0) console.log("3 sekunder til")
}, 1000)


function loop(){
    requestAnimationFrame(loop)
    if(!stop){
        c.fillStyle = "beige"
        c.fillRect(0, 0, canvas.width, canvas.height)
        for(let i = 0; i<bulletArr.length; i++){
            for(let k = 0; k<hunterArr.length; k++){
                if(distance(hunterArr[k], bulletArr[i]) < bulletArr[i].r + hunterArr[k].r && bulletArr[i].connectedHunter != hunterArr[k]){
                    bulletArr[i].pierces += 1
                    hunterArr[k].health -= player.damage
                    if(hunterArr[k].health <=0){
                        hunterArr.splice(k, 1)
                        k-=1
                    }
                    if(bulletArr[i].pierces > pierces){
                    bulletArr.splice(i, 1)
                    i-=1
                    player.money += 50
                    }
                    bulletArr[i].connectedHunter = hunterArr[k]
                }
            }

            if(bulletArr[i].pos.x < 0 || bulletArr[i].pos.x > canvas.width || bulletArr[i].pos.y < 0 || bulletArr[i].pos.y > canvas.height){
                bulletArr.splice(i, 1)
            }
            bulletArr[i].update()
        }
        for(let i = 0; i<hunterArr.length; i++){
            for(let k = 0; k<hunterArr.length; k++){
                if(i!=k && distance(hunterArr[i], hunterArr[k]) < hunterArr[i].r + hunterArr[k].r){
                    let deltaX = hunterArr[k].pos.x - hunterArr[i].pos.x
                    let deltaY = hunterArr[k].pos.y - hunterArr[i].pos.y
                    let phi = Math.atan2(deltaY, deltaX)
                    hunterArr[i].pos.x+= -Math.cos(phi)*pushAwayStrengt
                    hunterArr[i].pos.y+= -Math.sin(phi)*pushAwayStrengt
                    hunterArr[k].pos.x+= Math.cos(phi)*pushAwayStrengt
                    hunterArr[k].pos.y+= Math.sin(phi)*pushAwayStrengt
                }
            }
            if(distance(hunterArr[i], player) < player.r + hunterArr[i].r){
                player.health -= 50
                let deltaX = player.pos.x - hunterArr[i].pos.x
                let deltaY = player.pos.y - hunterArr[i].pos.y
                let phi = Math.atan2(deltaY, deltaX)
                hunterArr[i].vel.x += -Math.cos(phi)*pushWhenHitStrength
                hunterArr[i].vel.y += -Math.sin(phi)*pushWhenHitStrength
                hunterArr[i].pos.x += hunterArr[i].vel.x
                hunterArr[i].pos.y += hunterArr[i].vel.y
                hunterArr[i].slowDown = true
                setTimeout(() => {
                    hunterArr[i].slowDown = false
                }, 2000);
            }
            hunterArr[i].update()
        }
        player.update()
        pickup1.update()
        pickup2.update()
        healthBar.draw()
        moneyBar.draw()

    }
}