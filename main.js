prediction = " "

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'png_format',
    png_quality: 90
});

camera = document.getElementById("camera");

Webcam.attach('#camera');

function takesnapshot(){
    Webcam.snap(function(data_uri){
        document.getElementById("result").innerHTML = '<img id="capture_image" src="' + data_uri + '">';
    });
}

console.log('ml5 version',ml5.version);

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/QTvaU1uxy/model.json',modelLoaded);

function modelLoaded(){
    console.log('modelLoaded');
}

function speak(){
    var Synth = window.speechSynthesis;

    speak_data = "Prediction Is " + prediction;

    utter_this = new SpeechSynthesisUtterance(speak_data);
    Synth.speak(utter_this);
}

function check(){
    img = document.getElementById('capture_image');
    classifier.classify(img, gotResult);
}

function gotResult(error, result){
    if(error)  {
        console.error(error);
    }
    else{
        console.log(result)
        document.getElementById("result_emotion_name").innerHTML = result[0].label;
        prediction_1 = result[0].label;
        speak();
        if(result[0].label == "2 Fingers"){
            document.getElementById("update_emoji").innerHTML = "&#9996;";
        }
        if(result[0].label == "Fist"){
            document.getElementById("update_emoji").innerHTML = "&#9995;";
        }
        if(result[0].label == "palm"){
            document.getElementById("update_emoji").innerHTML = "]&#9994";
        }
        }
}
