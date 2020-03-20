let myVid, classifier, feature
let div = document.querySelector("div")
let highestConfidence = 0
let bestLabel = "start"
let images = ["flaske", "glasses"]
let buttons = []
let trainButton
function featureReady(){
    console.log("Featureextractor is ready")
}
function startClassify(){
    console.log("start classify")
    classifier.classify(getResults)
}

function getResults(err, result){
    console.log("hei")
    // if(err) console.error(err)
    // else{
        console.log(result)
        if(result[0].confidence > highestConfidence){
            highestConfidence = result[0].confidence
            bestLabel = result[0].label
        }
        classifier.classify(getResults)
    // }
}
function setup(){
    createCanvas(600, 600)
    myVid = createCapture(VIDEO)
    myVid.hide()

    feature = ml5.featureExtractor("MobileNet", featureReady)
    classifier = feature.classification(myVid, startClassify)
    
    trainButton = createButton("Train")
    trainButton.mousePressed(function(){
        classifier.train(function(loss){
            if(loss == null) startClassify()
        })
    })

    for(let i = 0; i < images.length; i++){
        buttons.push(createButton(images[i]))
        buttons[i].mousePressed(function(){
            classifier.addImage(images[i])
        })
    }
}
function draw(){
    image(myVid, 0, 0)
    div.innerHTML = bestLabel
}