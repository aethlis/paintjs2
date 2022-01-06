const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const colors = document.getElementsByClassName("controls__colors");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");


const INITIAL_COLOR = "#2c2c2c";
const CANSIZ = 700;

canvas.width = CANSIZ;
canvas.height = CANSIZ;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, CANSIZ, CANSIZ)
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function onMove(event){
    const x = event.offsetX;
    const y = event.offsetY;
    // console.log(x, y)
    if(!painting) {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleRange(event) {
    ctx.lineWidth = event.target.value;
}

function handleColorClick(event) {
    // console.log(event)
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleModes(event) {
    if(filling === true){
        filling = false
        mode.innerText = "Fill"
    } else{
        filling = true
        mode.innerText = "Paint"
    }
}

function handleCanvasClick(event) {
    if(filling) {
        ctx.fillRect(0, 0, CANSIZ, CANSIZ)
    } else{}
}

function handleSaveClick(event) {
    const image = canvas.toDataURL("image/jpeg")
    const link = document.createElement("a")
    link.href = image
    link.download = "Paint JS Image"
    link.click()
}

if(canvas) {
    canvas.addEventListener("mousemove", onMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("click", handleCanvasClick)
}

if(range) {
    range.addEventListener("input", handleRange);
}

if(mode) {
    mode.addEventListener("click", handleModes)
}

if(saveBtn) {
    saveBtn.addEventListener("click", handleSaveClick)
}

Array.from(colors).forEach(color => 
    color.addEventListener("click", handleColorClick))