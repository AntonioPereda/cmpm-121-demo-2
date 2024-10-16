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

let canvasPoints:number[][][] = [];
const canvasIterations:number[][][][] = [];
/////

//CANVAS DRAWING EVENT
let x,y;
const canvasUpdate = new CustomEvent("UpdateCanvas");
document.dispatchEvent(canvasUpdate);

canvas.addEventListener("UpdateCanvas", function(e){

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

let newCanv:number[][] = [];
canvas.addEventListener("mousedown", (event) => {
    cursor.active = true;
    cursor.x = event.offsetX;
    cursor.y = event.offsetY;
    newCanv = [];
    canvasPoints.push(newCanv);
});
  canvas.addEventListener("mouseup", (event) => {
    cursor.active = false;
});

addEventListener("mousemove", (event) => {
    if (cursor.active == true){
        //CANVAS POINTS 
        if (canvasPoints.length != 0){const newCanv:number[][] = canvasPoints.slice(-1)[0];} //IF NOT EMPTY
                                                                                                    //GRAB LAST ELEMENT

        //CANVAS HISTORY
        if (cursor.x >= 0 && cursor.x <=canvas.width && cursor.y >= 0 && cursor.y <=canvas.height){
            newCanv.push([cursor.x, cursor.y]);

            cursor.x = event.offsetX;
            cursor.y = event.offsetY;
            canvas.dispatchEvent(canvasUpdate);         

        } else {cursor.active = false;}
        if (newCanv.length != 0){ //DONT UPDATE HISTORY
                                //IF NO CHANGES WERE MADE
            canvasPoints.push(newCanv);
            canvasIterations.push(canvasPoints);
            canvas.dispatchEvent(canvasUpdate);                   

        }
    }
    
});


/////

//REDRAW CANVAS


//CLEAR BUTTON//
const clearButton = document.createElement("button");
clearButton.innerHTML = "Clear Canvas";
clearButton.style.position = "absolute";
clearButton.style.left = "450px";
clearButton.style.top = "250px";
app.append(clearButton);

clearButton.addEventListener("click", ()=>{
    console.log(canvasPoints);
    context.clearRect(0, 0, canvas.width, canvas.height);
    canvasIterations.push(canvasPoints);
    canvasPoints = [];
})  
/////


