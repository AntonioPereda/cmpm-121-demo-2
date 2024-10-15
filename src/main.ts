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
/////


//DRAWING ON CANVAS
const cursor = { active: false, x: 0, y: 0 };

canvas.addEventListener("mousedown", (event) => {
    cursor.active = true;
    cursor.x = event.offsetX;
    cursor.y = event.offsetY;
});
  canvas.addEventListener("mouseup", (event) => {
    cursor.active = false;
});

addEventListener("mousemove", (event) => {
    if (cursor.active == true){
        if (cursor.x >= 0 && cursor.x <=canvas.width && cursor.y >= 0 && cursor.y <=canvas.height){
            context.beginPath();
            context.moveTo(cursor.x, cursor.y);
            context.lineTo(event.offsetX, event.offsetY);
            context.stroke();
            cursor.x = event.offsetX;
            cursor.y = event.offsetY;
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
})  
/////


