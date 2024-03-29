

let cvsIn = document.getElementById("inputimg");
let ctxIn = cvsIn.getContext('2d');
let divOut = document.getElementById("predictdigit");

let mouselbtn = false;


// initilize
window.onload = function(){

    ctxIn.fillStyle = "white";
    ctxIn.fillRect(0, 0, cvsIn.width, cvsIn.height);
    ctxIn.lineWidth = 7;
    ctxIn.lineCap = "round";

}



// add cavas events
cvsIn.addEventListener("mousedown", function(e) {

    if(e.button == 0){
        let rect = e.target.getBoundingClientRect();
        let x = e.clientX - rect.left;
        let y = e.clientY - rect.top;
        mouselbtn = true;
        ctxIn.beginPath();
        ctxIn.moveTo(x, y);
    }
    else if(e.button == 2){
        onClear();  // right click for clear input
    }
});
cvsIn.addEventListener("mouseup", function(e) {
    if(e.button == 0){
        mouselbtn = false;
        onRecognition();
    }
});
cvsIn.addEventListener("mousemove", function(e) {
    let rect = e.target.getBoundingClientRect();
    let x = e.clientX - rect.left;
    let y = e.clientY - rect.top;
    if(mouselbtn){
        ctxIn.lineTo(x, y);
        ctxIn.stroke();
    }
});







document.getElementById("clearbtn").onclick = onClear;
function onClear(){
    mouselbtn = false;
    ctxIn.fillStyle = "white";
    ctxIn.fillRect(0, 0, cvsIn.width, cvsIn.height);
    ctxIn.fillStyle = "black";
}

// post data to server for recognition
function onRecognition() {
    console.time("time");

    $.ajax({
            url: './DigitRecognition',
            type:'POST',
            data : {img : cvsIn.toDataURL("image/png").replace('data:image/png;base64,','') },

        }).done(function(data) {

            showResult(JSON.parse(data))

        }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
            console.log(XMLHttpRequest);
            alert("error");
        })

    console.timeEnd("time");
}


function showResult(resultJson){

    // show predict digit
    divOut.textContent = resultJson.predict_digit;

    // show probability
    document.getElementById("probStr").innerHTML =
        "Probability : " + resultJson.prob[resultJson.predict_digit].toFixed(2) + "%";

    // show processing images
    //drawImgToCanvas("detectimg", resultJson.detect_img);
    //drawImgToCanvas("centerimg", resultJson.centering_img);




}



