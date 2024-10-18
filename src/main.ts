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

canvas.addEventListener("UpdateCanvas", function(){
    context.clearRect(0, 0, canvas.width, canvas.height);
    P.display(context);
    
});
////






//POINT CLASS
class setOfPoints {
    constructor() {
        this.points = [];
    }

    drag(x, y) {
        // Add new point to the line
        this.points.push([x, y]);
    }

    display(ctx) {
        if (this.points.length > 0) {
            ctx.beginPath();
            ctx.moveTo(this.points[0][0], this.points[0][1]);
            this.points.forEach(point => {
                ctx.lineTo(point[0], point[1]);
            });
            ctx.stroke();
        }
    }
}

//REDRAW FUNCT
function redraw(){
    for (let item of canvasPoints) {
        item.display(context);
    }
}




//DRAWING ON CANVAS
const cursor = { active: false, x: 0, y: 0 };
let P = new setOfPoints;


canvas.addEventListener("mousedown", (event) => {
    cursor.active = true;
    cursor.x = event.offsetX;
    cursor.y = event.offsetY;
    let tempP = new setOfPoints;
    P.points = [];
});
  canvas.addEventListener("mouseup", (event) => {
    cursor.active = false;
    let tempP = new setOfPoints;
    tempP.points = P.points;
    canvasPoints.push(tempP);
    P.points = [];  
});

addEventListener("mousemove", (event) => {
    if (cursor.active){
        //CANVAS HISTORY
        if (cursor.x >= 0 && cursor.x <=canvas.width && cursor.y >= 0 && cursor.y <=canvas.height){
            P.drag(cursor.x, cursor.y);
            cursor.x = event.offsetX;
            cursor.y = event.offsetY;
            canvas.dispatchEvent(canvasUpdate);
            redraw();         

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
        redraw();  
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
        redraw();
    }
})

/////


