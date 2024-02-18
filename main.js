var CanvasContext;
var Canvas;
var GameSize = 30;
var xv = yv = 0;
var px = py = 10;
var ax = ay = 15;
var trail = [];
var tail = 5;
var score = 0;
var gameStarted=false;

window.onload = function () {
    Canvas = document.getElementById("GameCanvas");
    CanvasContext = Canvas.getContext("2d");
    document.addEventListener("keydown", keyPush);    
    Canvas.width = 900;
    Canvas.height = 900;
    
    drawStartMessage();
}

function startGame(){
    if(!gameStarted){
        gameStarted=true;
        document.removeEventListener("keydown",startGame);
        setInterval(Game, 1000 / 15);
    }
}

function drawStartMessage(){
   
    CanvasContext.fillStyle="white";
    CanvasContext.font="20px Arial";
    var text="Press any key to start";
    var textWidth=CanvasContext.measureText(text).width;
    var x=(Canvas.width-textWidth)/2;
    var y=(Canvas.height/2);
    CanvasContext.fillText(text,x,y);
    
}


document.addEventListener("keydown",function(e){startGame();})



function Game() {
    px += xv;
    py += yv;

    if (px < 0) {
        px = GameSize - 1;
    }

    if (px > GameSize - 1) {
        px = 0;
    }
    if (py < 0) {
        py = GameSize - 1;
    }

    if (py > GameSize - 1) {
        py = 0;
    }

    CanvasContext.fillStyle = "black";
    CanvasContext.fillRect(0, 0, Canvas.width, Canvas.height);

    CanvasContext.fillStyle = "green";
    for (var i = 0; i < trail.length; i++) {
        CanvasContext.fillRect(trail[i].x * GameSize, trail[i].y * GameSize, GameSize - 2, GameSize - 2);
        if (trail[i].x == px && trail[i].y == py) {
            tail = 5;
            score = 0;
        }
    }

    trail.push({ x: px, y: py });
    while (trail.length > tail) {
        trail.shift();
    }

    CanvasContext.fillStyle = "red";
    CanvasContext.fillRect(ax * GameSize, ay * GameSize, GameSize - 2, GameSize - 2);

    if (ax == px && ay == py) {
        tail++;
        ax = Math.floor(Math.random() * GameSize);
        ay = Math.floor(Math.random() * GameSize);
        score++;
    }

    // Sol üst köşe skoru 
    CanvasContext.fillStyle = "white";
    CanvasContext.font = "20px Arial";
    CanvasContext.fillText("Score: " + score, 10, 20);
}

function keyPush(e) {
    if (e.keyCode == 38 && yv != 1) {
        xv = 0;
        yv = -1;
    }
    if (e.keyCode == 37 && xv != 1) {
        xv = -1;
        yv = 0;
    }
    if (e.keyCode == 40 && yv != -1) {
        xv = 0;
        yv = 1;
    }
    if (e.keyCode == 39 && xv != -1) {
        xv = 1;
        yv = 0;
    }
}

    

