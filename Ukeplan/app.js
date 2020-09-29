const canvas = document.querySelector("canvas")
const c = canvas.getContext("2d")
canvas.width = window.innerWidth
canvas.height = window.innerHeight


function dayFromNumber(num){
    switch(num){
        case 0: return "Mandag"
        case 1: return "Tirsdag"
        case 2: return "Onsdag"
        case 3: return "Torsdag"
        case 4: return "Fredag"
        case 5: return "Lørdag"
        case 6: return "Søndag"
    }
}

class Rute{
    constructor(itemNumber, dayNumber){
        this.itemNumber = itemNumber
        this.dayNumber = dayNumber
        this.day = dayFromNumber(this.dayNumber)

        this.event = {
                tid: "Kveld",
                innhold: "Tacokveld hos halvor og de",
                color: "black"
            // },

            // 1 : {
            //     tid: "Vet ikke",
            //     innhold: "Abalympics med halvor",
            //     color: "red"
            // }
        }
    }
}

let ruter = []
for(let i = 0; i < 7; i++){
    ruter[i] = []
    for(let j = 0; j < 4; j++){
        ruter[i][j] = new Rute(j, i)
    }
}


function displayRuter(){
    let w = canvas.width / 11
    let h = canvas.height / 9

    for(let x = 0; x < 7; x++){

        //ukedagtekst over kollonnene
        c.textAlign = "center"
        c.font = `${Math.floor(w / 8)}px Arial`
        c.fillText(ruter[x][0].day, (x +2.5 )*w, 3/2 * h)

        for(let y = 0; y < 4; y++){
            //alt som skjer i hver rute
            c.rect(2*w + x*w, 2*h + y*h, w, h)
            const rute = ruter[x][y]
            c.font = `${Math.floor(w/12)}px Arial ${rute.event.color}`

            c.fillText(rute.event.tid, (x +2.5 )*w, (y + 2.2)*h)

            c.textAlign = "left"
            const contentInfo = getContentInfo(rute.event.innhold, w, h)
            for(let i = 0; i < contentInfo.antallRader; i++){
                c.fillText(contentInfo.rader[i], (x +2)*w, (y + 2.2 + (i+1) * 0.1)*h)
            }
        }
    }
    c.strokeStyle = "black"
    c.lineWidth = 2
    c.stroke()
}



function getContentInfo(txt, w, h){
    let metrics = c.measureText(txt)
    const len = txt.length
    let texts = []

    if(metrics.width < w) return txt
    else{
        for(let i = 0; i < len; i++){
            if(c.measureText(txt.splice(0, i)) > w){
             
            }
        }
    }
}

displayRuter()







//fikser ting når vinduet blir resiza
function resize(){
    canvas.width = window.innerWidth
    canvas.height = window.innerHeight
    displayRuter()
}


window.addEventListener("resize", resize)