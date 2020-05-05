function RayCast(startPoint, direction, wall){
    const [x1, y1, x2, y2, x3, y3, x4, y4] = [wall.a.x, wall.a.y, wall.b.x, wall.b.y, startPoint.x, startPoint.y, startPoint.x+direction.x, startPoint.y+direction.y]
    const t = ((x1-x3)*(y3-y4) - (y1-y3)*(x3-x4))/((x1-x2)*(y3-y4) - (y1-y2)*(x3-x4))
    const u = -((x1-x2)*(y1-y3) - (y1-y2)*(x1-x3))/((x1-x2)*(y3-y4) - (y1-y2)*(x3-x4))
    //intersection
    if(u >= 0 && t >= 0 && t <= 1){
        //ja
        const pointOfIntersect = {
            x: x1 + t*(x2-x1),
            y: y1 + t*(y2-y1)
        }
        return pointOfIntersect
    }
    return null
}

class Light{
    constructor(x, y){
        this.pos = {
            x: x,
            y: y
        }
        // this.mouseDir
    }
    update(walls, angle, viewAngle){
        
        for(let a = angle-viewAngle/2; a < angle+viewAngle/2; a+=0.001){
            const dir = {x: Math.cos(a), y: Math.sin(a)}
            let shortestDist = Infinity
            let bestHit
            for(let wall of walls){
                const hitInfo = RayCast(this.pos, dir, wall)
                if(hitInfo){
                    const distNotSquared = Math.pow(hitInfo.x-this.pos.x, 2) + Math.pow(hitInfo.y-this.pos.y, 2)
                    if(distNotSquared < shortestDist){
                        shortestDist = distNotSquared
                        bestHit = hitInfo
                    }
                }
            }
            if(bestHit){
                c.beginPath()
                c.strokeStyle = "rgba(255, 255, 255, 0.5)"
                c.moveTo(this.pos.x, this.pos.y)
                c.lineTo(bestHit.x, bestHit.y)
                c.stroke()
                c.closePath()
            }
        }
    }
}