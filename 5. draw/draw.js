window.onload=init();

var canvas;
var context;

var pallet = [["#FF0000", "#FF5E00", "#FFBB00", "#FFE400", "#ABF200", "#1DDB16", "#00D8FF", "#0054FF", "#FF007F"],
["#FFD8D8", "#FAE0D4", "#FAECC5", "#FAF4C0", "#E4F7BA", "#CEFBC9", "#D4F4FA", "#D9E5FF","#FFD9EC"]];

var pos = document.getElementById("position");
var colorP = document.getElementById("colorPick");
var lineP = document.getElementById("linePick");
var colorC = document.getElementById("choiceColor");

var delButton = document.getElementById("delbutton");


var tag = ""
for (var i = 0; i < pallet.length; i++) {
    for (var j = 0; j < pallet[i].length; j++) {
        tag += "<div id=" + pallet[i][j] + " class='colorBox'></div>";
    }
    tag += "<br>";
}

document.getElementById("palletBox").innerHTML = tag;

var colorBox = document.getElementsByClassName("colorBox");
for (i = 0; i < colorBox.length; i++) {
    colorBox[i].style.backgroundColor = colorBox[i].id;
}


//배열..불러와서 이벤트리스너;..
//https://velog.io/@yunji0614/JS-Paint 참고
Array.from(colorBox).forEach(color => color.addEventListener("click", handleColorClick));

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    context.strokeStyle = color;
    colorC.style.backgroundColor = color;
    console.log(color);
}


colorP.onchange = function (e) {
    colorC.style.backgroundColor = colorP.value;
    context.strokeStyle = colorP.value;
}


lineP.onchange = function (e) {
    context.lineWidth = parseInt(lineP.value);
}

function init() {
    canvas = document.getElementById("sketch");
    context = canvas.getContext("2d");


    canvas.addEventListener("mousemove", function (e) { move(e) }, false);
    canvas.addEventListener("mousedown", function (e) { down(e) }, false);
    canvas.addEventListener("mouseup", function (e) { up(e) }, false);
    canvas.addEventListener("mouseoue", function (e) { out(e) }, false);

}

var posX = 0;
var posY = 0;
var dragging = false;
function draw(curX, curY) {
    context.beginPath();
    context.moveTo(posX, posY);
    context.lineTo(curX, curY);
    context.stroke();
}
function down(e) {
    posX = e.offsetX;
    posY = e.offsetY;
    dragging = true;
}
function up(e) {
    dragging = false;
}
function move(e) {
    if (!dragging) return;
    var curX = e.offsetX, curY = e.offsetY;
    draw(curX, curY);
    posX = curX;
    posY = curY;

    pos.innerHTML = "x=" + curX + "<br>" + "y=" + curY;
}
function out(e) {
    dragging = false;
}


delButton.onclick = function (e) {
    var canvas = document.getElementById("sketch");
    canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
}