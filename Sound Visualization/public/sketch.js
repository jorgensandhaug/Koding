let sound = new Audio()
sound.src = "./songs/song2.mp3"
sound.controls = true
sound.autoplay = false
sound.volume = 0.05
sound.currentTime = 30


let firstTimePress = true
const canvas = document.querySelector("canvas")
canvas.width = window.innerWidth-10
canvas.height = window.innerHeight-10
const c = canvas.getContext("2d")

let audioContext, analyser, source, fbc_array
window.addEventListener("click", initMp3Player, false)
function initMp3Player(){
    sound.play()
    if(firstTimePress){
        firstTimePress = false
        audioContext = new AudioContext()
        analyser = audioContext.createAnalyser()
        source = audioContext.createMediaElementSource(sound)
        source.connect(analyser)
        analyser.connect(audioContext.destination)
        analyser.smoothingTimeConstant = 0.9
        frameLooper()
    }
}

function frameLooper(){
    requestAnimationFrame(frameLooper)
    c.clearRect(0, 0, canvas.width, canvas.height)
    fbc_array = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(fbc_array)
    // let pointArr1 = []
    // let pointArr2 = []
    const lowestFreq = fbc_array[0]
    const r = 70 + lowestFreq

    c.fillStyle = "red"
    for(let i = 0; i < 360; i++){
        const barHeight = fbc_array[Math.floor(i/3+100)]
        const a = i/180 *Math.PI - Math.PI/2
        const pos = {
            x: canvas.width/2 + r*Math.cos(a),
            y: canvas.height/2 + r*Math.sin(a)
        }
        // pointArr1.push({
        //     x: canvas.width/2 + (r + barHeight)*Math.cos(a), 
        //     y: canvas.height/2 + (r + barHeight)*Math.sin(a)
        // })
        // pointArr2.push({
        //     x: canvas.width/2 + (r - barHeight/8)*Math.cos(a), 
        //     y: canvas.height/2 + (r - barHeight/8)*Math.sin(a)
        // })

        c.save()
        c.translate(pos.x, pos.y)
        c.rotate(Math.PI/2 + a)
        c.fillRect(0, 0, 1, -2*barHeight)
        c.restore()
    }
    // c.strokeStyle = "red"
    // c.beginPath()
    // c.moveTo(pointArr1[0].x, pointArr1[1].y)
    // let strokeAll = true
    // for(let point of pointArr1){
    //     //nesten på sirkelen
    //     if(Math.abs(Math.sqrt(Math.pow(point.x - canvas.width/2, 2) + Math.pow(point.y - canvas.height/2, 2)) - r) < 1){
    //         strokeAll = false
    //     }
    //     else c.lineTo(point.x, point.y)
    // }
    // if(strokeAll) c.lineTo(pointArr1[0].x, pointArr1[1].y)   
    
    c.beginPath()
    c.moveTo(canvas.width/2 + r, canvas.height/2)
    c.arc(canvas.width/2, canvas.height/2, r, 0, Math.PI*2)
    c.stroke()
    c.closePath()

    
}