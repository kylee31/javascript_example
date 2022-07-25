//init()
window.onload=init();

var canvas;
var context;
//2차원 배열
var pallet = [["#FF0000", "#FF5E00", "#FFBB00", "#FFE400", "#ABF200", "#1DDB16", "#00D8FF", "#0054FF", "#FF007F"],
["#FFD8D8", "#FAE0D4", "#FAECC5", "#FAF4C0", "#E4F7BA", "#CEFBC9", "#D4F4FA", "#D9E5FF","#FFD9EC"]];

var pos = document.getElementById("position");
var colorP = document.getElementById("colorPick");
var lineP = document.getElementById("linePick");
var colorC = document.getElementById("choiceColor");

var delButton = document.getElementById("delbutton");


//컬러박스 id를 컬러코드로 설정해서 div 생성
//2차원 배열
var tag = ""
for (var i = 0; i < pallet.length; i++) {
    for (var j = 0; j < pallet[i].length; j++) {
        tag += "<div id=" + pallet[i][j] + " class='colorBox'></div>";
    }
    tag += "<br>";
}

//div 태그로 colorbox 생성
document.getElementById("palletBox").innerHTML = tag;

//설정된 id (컬러코드)로 배경색 칠하기
var colorBox = document.getElementsByClassName("colorBox");
for (i = 0; i < colorBox.length; i++) {
    colorBox[i].style.backgroundColor = colorBox[i].id;
}

function init() {
    //캔버스 컨텍스트 2d
    canvas = document.getElementById("sketch");
    context = canvas.getContext("2d");

    //이벤트 리스너 설정
    canvas.addEventListener("mousemove", function (e) { move(e) }, false);
    canvas.addEventListener("mousedown", function (e) { down(e) }, false);
    canvas.addEventListener("mouseup", function (e) { up(e) }, false);
    canvas.addEventListener("mouseoue", function (e) { out(e) }, false);
}

//배열 불러와서 이벤트리스너
//getElementsByClassName으로 불러온 colorBox
//https://velog.io/@yunji0614/JS-Paint 참고
Array.from(colorBox).forEach(color => color.addEventListener("click", handleColorClick));

//선 색상 설정1(컬러 팔레트 색으로 변경)
function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    context.strokeStyle = color;
    colorC.style.backgroundColor = color;
    console.log(color);
}

//DOM 이벤트 핸들러(선택색상 박스, 선 색상 설정2)
//input color속성 값으로 정한 색으로 변경
colorP.onchange = function (e) {
    colorC.style.backgroundColor = colorP.value;
    context.strokeStyle = colorP.value;
}

//DOM 이벤트 핸들러(선 굵기 변경)
lineP.onchange = function (e) {
    context.lineWidth = parseInt(lineP.value);
}

var posX = 0;
var posY = 0;
var dragging = false;

//캔버스에 선 그리기
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

    //이동하는 x,y 좌표 나타내기
    pos.innerHTML = "x=" + curX + "<br>" + "y=" + curY;
}
function out(e) {
    dragging = false;
}

//그림 삭제
delButton.onclick = function (e) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.beginPath();
}