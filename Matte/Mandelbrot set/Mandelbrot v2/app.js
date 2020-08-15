let canvas
let offSetX = 0
let offSetY = 0
let scale = 2
function setup(){
    canvas = createCanvas(window.innerWidth, window.innerHeight)
    //calc
    colorMode(HSL)
    drawModel()
}

function draw(){
    
}

function mouseWheel(e){
    if(e.delta < 0){
        scale *= 0.8
    }
    else scale /= 0.8
    drawModel()
}

function mouseDragged(e){
    offSetX -= e.movementX * 0.001 * scale
    offSetY -= e.movementY * 0.001 * scale
    drawModel()
}

function drawModel(){
    for(let x = 0; x < width; x++){
        for(let y = 0; y < height; y++){    

            let a = (x-width/(scale*window.innerWidth/window.innerHeight))/(width/(2*(scale*window.innerWidth/window.innerHeight))) + offSetX
            let b = (y-height/scale)/(height/(2*scale)) + offSetY

            let aa = 0
            let bb = 0
            let n = 0
            while(n<500){
                let tempaa = aa*aa - bb*bb
                bb = 2 * aa * bb + b
                aa = tempaa + a
                if(aa*aa + bb*bb > 4) break

                n++
            }
            

            let c = color(0, 50, n/5)
            set(x, y, c)
        }
    }
    updatePixels()
}