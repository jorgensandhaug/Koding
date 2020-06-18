const fetch = require('node-fetch')
const convert = require('xml-js')
let data = {}
let objectArray = []

let olListe = []

let navn = 3
let pris = 5
let volum = 6
let prisPerLiter = 7
let type = 11
let varegruppe = 10
let alkoholinnhold = 21

fetch('https://www.systembolaget.se/api/assortment/products/xml').then(response => response.text()).then(str => {
    data = JSON.parse(convert.xml2json(str))
}).then( ()=>{

    const artikler = data.elements[0]
    for(let vareIndex = 2; vareIndex < data.elements[0].elements.length; vareIndex++){
        const artikkel = artikler.elements[vareIndex]

        objectArray.push({
            navn: artikkel.elements[navn].elements != undefined ? artikkel.elements[navn].elements[0].text : undefined,
            pris: artikkel.elements[pris].elements != undefined ? Number(artikkel.elements[pris].elements[0].text) : undefined,
            volum: artikkel.elements[volum].elements != undefined ? Number(artikkel.elements[volum].elements[0].text) : undefined,
            prisPerLiter: artikkel.elements[prisPerLiter].elements != undefined ? Number(artikkel.elements[prisPerLiter].elements[0].text) : undefined,
            varegruppe: artikkel.elements[varegruppe].elements != undefined ? artikkel.elements[varegruppe].elements[0].text : undefined,
            type: artikkel.elements[type].elements != undefined ? artikkel.elements[type].elements[0].text : undefined,
            alkoholinnhold: artikkel.elements[alkoholinnhold].elements != undefined ? Number(artikkel.elements[alkoholinnhold].elements[0].text.substring(0, artikkel.elements[alkoholinnhold].elements[0].text.length-1)) : undefined,
        })
    }
    // console.log(objectArray)

    //fikser listene
    for(let i = 0; i < objectArray.length; i++){
        objectArray[i].ppma = prisPerAlko(objectArray[i])
        if(objectArray[i].varegruppe == 'Öl'){
            objectArray[i].varegruppe = "Øl"

            olListe.push(objectArray[i])
        }
    }
    console.log(olListe.filter(el => el.navn.startsWith("Pripps")))

    olListe.sort( (a, b) => a.ppma - b.ppma)
    objectArray.sort( (a, b) => a.ppma - b.ppma)
    // console.log(olListe)
    // console.log(olListe.find(el => /*el.navn.startsWith("Pripps")*/el.volum > 330))
    // console.log(olListe.splice(0, 20))
    // console.log(objectArray.splice(0, 20))
})

function prisPerAlko(produkt){
    return produkt.pris / (produkt.volum * produkt.alkoholinnhold / 100)
}




