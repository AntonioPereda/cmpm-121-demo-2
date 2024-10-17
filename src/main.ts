import "./style.css";

const APP_NAME = "Online Doodle Pad";
const app = document.querySelector<HTMLDivElement>("#app")!;


//webpage title
document.title = APP_NAME;
app.innerHTML = APP_NAME;
app.style.fontSize = "35px";
app.style.top = "0px";
app.style.left = "470px";
app.style.position = "absolute";
///


//CANVAS SETUP//
const canvas = document.createElement("canvas");
canvas.style.backgroundColor = "white";
canvas.width = 256;
canvas.height = 256;

canvas.style.top = "210px";
canvas.style.left = "30px";
canvas.style.scale = "1.75";

canvas.style.position = "absolute";
canvas.style.borderRadius = "20px";
canvas.style.filter = "dropShadow(10px 40px 30px #ffffff)";
app.append(canvas);
const context = canvas.getContext("2d");

let canvasPoints = [];
let redo = [];
/////

//CANVAS DRAWING EVENT
let x,y;
const canvasUpdate = new CustomEvent("UpdateCanvas");
document.dispatchEvent(canvasUpdate);

canvas.addEventListener("UpdateCanvas", function(e){
    console.log(canvasPoints);

    context.clearRect(0, 0, canvas.width, canvas.height);
    for (const point of canvasPoints) {
      if (point.length > 1) {
        context.beginPath();
        let x = point[0][0];
        let y = point[0][1];
        context.moveTo(x, y);
        for ([x,y] of point) {
            context.lineTo(x, y);
        }
        context.stroke();
      }
    }

});
////



//DRAWING ON CANVAS
const cursor = { active: false, x: 0, y: 0 };

let newCanv = [];
canvas.addEventListener("mousedown", (event) => {

    cursor.active = true;
    cursor.x = event.offsetX;
    cursor.y = event.offsetY;
    newCanv = [];
    canvasPoints.push(newCanv);
});
  canvas.addEventListener("mouseup", (event) => {
    cursor.active = false;
    newCanv = [];
});

addEventListener("mousemove", (event) => {
    if (cursor.active){
        //CANVAS HISTORY
        if (cursor.x >= 0 && cursor.x <=canvas.width && cursor.y >= 0 && cursor.y <=canvas.height){
            newCanv.push([cursor.x, cursor.y]);

            cursor.x = event.offsetX;
            cursor.y = event.offsetY;
            canvas.dispatchEvent(canvasUpdate);         

        } else {cursor.active = false;}
    }
    
});


/////


//CLEAR BUTTON//
const clearButton = document.createElement("button");
clearButton.innerHTML = "Clear Canvas";
clearButton.style.position = "absolute";
clearButton.style.left = "450px";
clearButton.style.top = "250px";
app.append(clearButton);

clearButton.addEventListener("click", ()=>{
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvasPoints = [];
})  
/////

//UN_RE-DO BUTTON//
const undoButton = document.createElement("button");
undoButton.innerHTML = "Undo";
undoButton.style.position = "absolute";
undoButton.style.left = "-300px";
undoButton.style.top = "200px";
app.append(undoButton);

undoButton.addEventListener("click", ()=>{
    if (canvasPoints.length > 0){
        redo.push(canvasPoints.pop());
        canvas.dispatchEvent(canvasUpdate);  
    }
}) 

const redoButton = document.createElement("button");
redoButton.innerHTML = "Redo";
redoButton.style.position = "absolute";
redoButton.style.left = "-300px";
redoButton.style.top = "400px";
app.append(redoButton);

redoButton.addEventListener("click", ()=>{
    if (redo.length > 0) {
        canvasPoints.push(redo.pop());
        canvas.dispatchEvent(canvasUpdate);  
    }
})

/////


