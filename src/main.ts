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
const ctx = canvas.getContext("2d");
/////


//DRAWING ON CANVAS
addEventListener("mousemove", (event) => {});

onmousemove = (event) => {
    
};
/////

//CLEAR BUTTON//
const clearButton = document.createElement("button");
clearButton.innerHTML = "Clear Canvas";
/////


