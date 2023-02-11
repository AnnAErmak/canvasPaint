const canvas = document.getElementById("jsCanvas")
const ctx = canvas.getContext('2d')
const colors = document.getElementById('jsColors')
const range = document.getElementById('jsRange')
const mode = document.getElementById('jsMode')
const save = document.getElementById('jsSave')
const INITIAL_COLOR = '2c2c2c'
const CANVAS_SIZE = 700

canvas.height = CANVAS_SIZE
canvas.width = CANVAS_SIZE

ctx.fillStyle = 'white'
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
ctx.lineWidth = 2.5
ctx.strokeStyle = INITIAL_COLOR
ctx.fillStyle = INITIAL_COLOR

let painting = false
let filling = false

function stopPainting(){
    painting = false
}
function startPainting(){
    painting = true
}

function onMouseMove(event){
    let x = event.offsetX
    let y = event.offsetY
    if(!painting){
        ctx.beginPath()
        ctx.moveTo(x, y)
    }else{
        ctx.lineTo(x, y)
        ctx.stroke()
    }
}

function onMouseDown(event){
    painting = true
}

function changeColor(event){
    if (event.target.className === 'controls__color'){
        const color = event.target.style.backgroundColor
        ctx.strokeStyle = color
        ctx.fillStyle = color
    }
}
function changeInput(event){
    ctx.lineWidth = event.target.value
}
function changeMode(event){
    if(filling === true){
        filling = false
        mode.innerText = 'Заливка'
    }else{
        filling =true
        mode.innerText = 'Рисование'
    }
}
function hadleCanvasClick(){
    if(filling){
        ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE)
    }

}
function handleCM(event){
    event.preventDefault()
}
function changeSaveClick(event){
    const img = canvas.toDataURL('image/png')
    const link = document.createElement('a')
    link.href = img
    link.download = 'PaintJSExport.png'
    link.click()
}

if (canvas){
    canvas.addEventListener('mousemove', onMouseMove)
    canvas.addEventListener('mousedown', onMouseDown)
    canvas.addEventListener('mouseup', stopPainting)
    canvas.addEventListener('mouseleave', stopPainting)
    canvas.addEventListener('click', hadleCanvasClick)
    canvas.addEventListener('contextmenu', handleCM)
}

colors.addEventListener('click', changeColor)
range.addEventListener('input', changeInput)
mode.addEventListener('click', changeMode)
save.addEventListener('click', changeSaveClick)