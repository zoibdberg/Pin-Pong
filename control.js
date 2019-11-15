// "use strict"
let canvas = document.querySelector("canvas");
let ctx = canvas.getContext("2d");

canvas.width = window.innerWidth
|| document.documentElement.clientWidth
|| document.body.clientWidth;

canvas.height = window.innerHeight
|| document.documentElement.clientHeight
|| document.body.clientHeight;

let player = {
  x: canvas.width / 2 - 100/2,
  y: canvas.height - 40,
  width: 100,
  height: 10,
  color: "#505050",
},

ball = {
  x: player.x + player.width / 2,
  y: player.y - 15,
  radius: 15,
  color: "#a04040",
  attached: true,
  type: "Normal",
},

brick = {
  row: 5,
  col: 3,
  H_distance: 30,
  V_distance: 20,
  width: (canvas.width - 30 * 6) / 5,
  height: 40,
  color: "#404040",
}

draw = {
  rect (x, y, width, height, color){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.fillRect(x, y, width, height);
    ctx.fill();
  },

  circle(x, y, radius, color){
    ctx.beginPath();
    ctx.fillStyle = color;
    ctx.arc(x, y, radius, 0, 2*Math.PI, true);
    ctx.fill();
  },

  bricks (brick){

    ///////////////////////////////////////////////////////////////////
    // Вытащи эту хрень, иначе ты не сможешь обрабатывать столкновения.
    let arrOfbricksCoordinats = [];
    for(let i = 0; i < brick.row; i++){
      arrOfbricksCoordinats[i] = [];
      for(let j = 0; j < brick.col; j++){
        arrOfbricksCoordinats[i][j] = {x: 0, y: 0};
      }
    }
    ///////////////////////////////////////////////////////////////////

    for(let i = 0; i < brick.row; i++){
      for(let j = 0; j < brick.col; j++){
        arrOfbricksCoordinats[i][j].x = brick.H_distance +(brick.width + brick.H_distance) * i;
        arrOfbricksCoordinats[i][j].y = brick.V_distance + (brick.height + brick.V_distance) * j;

        draw.rect(arrOfbricksCoordinats[i][j].x, arrOfbricksCoordinats[i][j].y, brick.width, brick.height, brick.color);
      }
    }
  }
};


move = {
  player (event) {
    let keyState = (event.type == "keydown") ? true : false;
    console.log(keyState);

    // if(keyState)
    switch(event.keyCode){
      case 37:  
        move.left(player, ball);
        // alert("Key Code is 37");
        break;
      case 38:
        // alert("Key Code is 38");
        break;
      case 39:        
        move.right(player, ball);
        // alert("Key Code is 39");
        break;  
        default:
          // console.log("Nothin to do");
        }
      },
      
  attachedBall(player, ball){
    ball.x = player.x + player.width / 2;
    ball.y = player.y - 15;
  },

  left(player, ball){
    if(ball.attached == true){
      ball.x = player.x + player.width / 2;
      ball.y = player.y - 15;
    }
    player.x -= 8;
  },

  right(player, ball){
    if(ball.attached == true){
      ball.x = player.x + player.width / 2;
      ball.y = player.y - 15;
    }
    player.x += 8;
  },

};


function loop(){

  draw.rect(0, 0, canvas.width, canvas.height, "#e0e0e0");
  draw.rect(player.x, player.y, player.width, player.height, player.color);
  draw.circle(ball.x, ball.y, ball.radius, ball.color);
  draw.bricks(brick);


  window.requestAnimationFrame(loop);
  
}

window.addEventListener("keydown", move.player);
window.requestAnimationFrame(loop);
