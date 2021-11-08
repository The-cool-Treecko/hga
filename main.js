//https://teachablemachine.withgoogle.com/models/wXWgNXidI/

var prediction1;

Webcam.set({
    width: 350,
    height: 300,
    image_format: 'jpeg',
    jpeg_quality: 90
})

Webcam.attach(document.getElementById("camera"));

function takePic() {
    Webcam.snap(function (data_uri) {
        document.getElementById("result").innerHTML = '<img id="resultimg" src="' + data_uri + '">'
    })
}
console.log(ml5.version)

classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/wXWgNXidI/model.json', modelLoaded);

function modelLoaded() {
    console.log("ml5 version: " + ml5.version);
}

function speak() {
    synth = window.speechSynthesis;
    speech_data1 = "The prediction is " + prediction1;
    utterThis = new SpeechSynthesisUtterance(speech_data1);
    synth.speak(utterThis);
}

function toEmoji() {
    classifier.classify(document.getElementById("resultimg"), function (error, results) {
        if (error) {
            console.log(error);
        } else {
            console.log(results);
            prediction1 = results[0].label;
            prediction2 = results[1].label;
            speak()
            document.getElementById("result_emotion_name").innerHTML = prediction1
            if (prediction1 == "Victory") {
                document.getElementById("emoji1").innerHTML = "&#9996"
            } else if (prediction1 == "Best") {
                document.getElementById("emoji1").innerHTML = "&#128077"
            } else if (prediction1 == "Amazing") {
                document.getElementById("emoji1").innerHTML = "&#128076"
            }
        }
    })
}