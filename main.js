function setup()
{
    canvas=createCanvas(300,300);
    canvas.center();
    background("white");
    canvas.mouseReleased(classifyCanvas);
    synth=window.speechSynthesis;
}

function preload(){
    classifier=ml5.imageClassifier('Doodlenet')
}

 
function draw(){
    strokeWeight(13);
    stroke(0);
    if (mouseIsPressed){
        line(PmouseX,PmouseY,mouseX,mouseY);
    }
}

function classifyCanvas(){
    classifier.classify(canvas, gotResult);
}

function clear_canvas(){
background("white");
}

function gotResult(error,result){
    if (error) {
        console.error(error);
    }
    console.log(result);
    document.getElementById('label').innerHTML='label' + result[0].label;
    document.getElementById('confidence').innerHTML='confidence' + Math.round(result[0].confidence *100) + "%";
    utterThis=new SpeechSynthesisUtterance(results[0].label);
    synth.speak(utterThis);
}