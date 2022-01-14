const canvas = document.getElementById("jsCanvas");
const body = document.getElementById("body");
const main = document.getElementById("main");
const mode = document.getElementById("jsMode");
const ctx = canvas.getContext("2d");
const INITIAL_COLOR = "#2c2c2c";

let CURRENT_DEVICE;
const width = canvas.width;
const height = canvas.height;
let filling = false;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, width, height);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;
function isMobile()
{
    const isMobile = /(iphone|ipod|ipad|android|blackberry|windows ce|palm|symbian)/i.test(navigator.userAgent);
    console.log(`Current Mobile : ${isMobile}`);
    CURRENT_DEVICE = isMobile;
}
function init(){
    isMobile();
}
function preventDefaultEvent(event)
{
    event.preventDefault();
}
function paintModeSelect()
{
    if(filling === false)
    {
        filling = true;
        mode.innerText = "Paint";
    }
    else
    {
        filling = false;
        mode.innerText = "Brush";
    }
    console.log(filling);
}
function stopPainting(event)
{
    filling = false;
}
function startPainting(event)
{
    filling = true;
}
function onMouseMove(event)
{
    const x = event.offsetX;
    const y = event.offsetY;
    if(!filling)
    {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else
    {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
function canvasClick()
{
    if(filling)
    {
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
}
function handleCM(event)
{
    event.preventDefault();
}
if(main)
{
    main.addEventListener("click", preventDefaultEvent);
    main.addEventListener("wheel", preventDefaultEvent);
    main.addEventListener("touchmove", preventDefaultEvent);
}
if(mode)
{
    mode.addEventListener("click", paintModeSelect);
}
if(canvas && CURRENT_DEVICE === false){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", canvasClick);
    canvas.addEventListener("contextmenu", handleCM);
}

function onTouchMove(event)
{
    const x = event.offsetX;
    const y = event.offsetY;
    if(!filling)
    {
        ctx.beginPath();
        ctx.moveTo(x, y);
    }
    else
    {
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
function touchStart()
{
    filling = true;
}
function stopTouch()
{
    filling = false;
}
if(canvas && CURRENT_DEVICE === true)
{
    canvas.addEventListener("touchmove", onTouchMove);
    canvas.addEventListener("touchstart", touchStart);
    canvas.addEventListener("touchend", stopTouch)
}
init();