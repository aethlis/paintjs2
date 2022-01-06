const canvas = document.getElementById("jsCanvas")
ctx = canvas.getContext("2d", {alpha: true})
const range = document.getElementById("jsRange")
const colors = document.getElementsByClassName("controls__colors")
const saveBtn = document.getElementById("jsSave")
const mode = document.getElementById("jsMode")
const trans = document.getElementById("jsTrans")

// const originalHeight = canvas.height
// const originalWidth = canvas.width
// render();
// function render() {
//   let dimensions = getObjectFitSize(
//     true,
//     canvas.clientWidth,
//     canvas.clientHeight,
//     canvas.width,
//     canvas.height
//   );
//   canvas.width = dimensions.width;
//   canvas.height = dimensions.height;

//   let ctx = canvas.getContext("2d");
//   let ratio = Math.min(
//     canvas.clientWidth / originalWidth,
//     canvas.clientHeight / originalHeight
//   );
//   ctx.scale(ratio, ratio); //adjust this!
//   ctx.fillRect(0, 0, ratio, ratio)
// }
// render();


const CANVAS_SIZE = 700
canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = "white"
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
// ctx.fillRect(0, 0, 700, 700)
ctx.fillStyle = "black"
ctx.lineWidth = 2.5
ctx.globalAlpha = 0.5


let painting = false
let filling = false


function startPainting(event) {
    painting = true
}

function stopPainting(event) {
    painting = false
}

function mouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY
    if(!painting) {
        ctx.beginPath(x, y)
        ctx.moveTo(x, y)
    } else {
        ctx.lineTo(x, y)
        ctx.stroke()
    }
    console.log(x,y)
}

function toggleColors(event) {
    const color = event.target.style.backgroundColor
    ctx.strokeStyle = color
    ctx.fillStyle = color
}

function canvasClick(event) {
    if(filling) {
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
        // ctx.fillRect(0, 0, 700, 700)
    } else {}
}

function rangeData(event) {
    ctx.lineWidth = event.target.value
}

function changeOpacity(event) {
    const opacData = event.target.value
    ctx.globalAlpha = opacData
}

function toggleModes(event) {
    if(filling === true) {
        filling = false
        mode.innerText = "Fill"
    } else {
        filling = true
        mode.innerText = "Paint"
    }
}

function saveFile(event) {
    const image = canvas.toDataURL("image/png")
    const link = document.createElement("a")
    link.href = image
    link.download = "Paint JS3"
    link.click()
}

if(canvas) {
    canvas.addEventListener("mousemove", mouseMove)
    canvas.addEventListener("mousedown", startPainting)
    canvas.addEventListener("mouseup", stopPainting)
    canvas.addEventListener("mouseleave", stopPainting)
    canvas.addEventListener("click", canvasClick)
}

if(range) {
    range.addEventListener("input", rangeData)
}

if(saveBtn) {
    saveBtn.addEventListener("click", saveFile)
}

if(mode) {
    mode.addEventListener("click",toggleModes)
}

if(trans) {
    trans.addEventListener("input", changeOpacity)
}

Array.from(colors).forEach(color =>
    color.addEventListener("click", toggleColors))

// function getObjectFitSize(
//     contains /* true = contain, false = cover */,
//     containerWidth,
//     containerHeight,
//     width,
//     height
// ) {
//     var doRatio = width / height;
//     var cRatio = containerWidth / containerHeight;
//     var targetWidth = 0;
//     var targetHeight = 0;
//     var test = contains ? doRatio > cRatio : doRatio < cRatio;

//     if (test) {
//     targetWidth = containerWidth;
//     targetHeight = targetWidth / doRatio;
//     } else {
//     targetHeight = containerHeight;
//     targetWidth = targetHeight * doRatio;
//     }

//     return {
//     width: targetWidth,
//     height: targetHeight,
//     x: (containerWidth - targetWidth) / 2,
//     y: (containerHeight - targetHeight) / 2
//     };
// }