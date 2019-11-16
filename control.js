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
  speedX: 4,
  speedY: 4,              
},

brick = {
  row: 5,
  col: 3,
  H_distance: 30,
  V_distance: 20,
  width: (canvas.width - 30 * 6) / 5,
  height: 40,
  color: "#404040",

  arrOfbricksCoordinats: [],

  coordinats(){
    for(let i = 0; i < brick.row; i++){
      brick.arrOfbricksCoordinats[i] = [];
      for(let j = 0; j < brick.col; j++){
        brick.arrOfbricksCoordinats[i][j] = {x: 0, y: 0};
      }
    }

    for(let i = 0; i < brick.row; i++){
      for(let j = 0; j < brick.col; j++){
        brick.arrOfbricksCoordinats[i][j].x = brick.H_distance +(brick.width + brick.H_distance) * i;
        brick.arrOfbricksCoordinats[i][j].y = brick.V_distance + (brick.height + brick.V_distance) * j;
      }
    }
  }
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
    brick.coordinats();

    for(let i = 0; i < brick.row; i++){
      for(let j = 0; j < brick.col; j++){
        draw.rect(brick.arrOfbricksCoordinats[i][j].x, brick.arrOfbricksCoordinats[i][j].y, brick.width, brick.height, brick.color);
      }
    }
  }
};


move = {
  player (event) {
    let keyState = (event.type == "keydown") ? true : false;

    // if(keyState)
    switch(event.keyCode){
      case 37:  
        move.left(player, ball);
        // alert("Key Code is 37");
        break;
      case 38:
          ball.attached = false;
          break;
      case 39:        
        move.right(player, ball);
        break;  
    }
  },
      
  attachedBall(player, ball){
    if(ball.attached == true){
      ball.x = player.x + player.width / 2;
      ball.y = player.y - 15;
    }
  },

  left(player, ball){
    move.attachedBall(player, ball);
    player.x -= 8;
  },

  right(player, ball){
    move.attachedBall(player, ball);
    player.x += 8;
  },

  flight(player, ball){
    if(!ball.attached){
      ball.x += ball.speedX;
      ball.y -= ball.speedY;
    }
  },


  
};

collide = {
  
  signChange(ball, n){
    if(n == 1){
      ball.speedX *= -1;
    }else{
      ball.speedY *= -1;
    }
  },
  
  collideRight(ball){
    if(ball.x >= canvas.width){
      collide.signChange(ball, 1);
    }
  },

  collideTop (ball){
    if(ball.y <= 0){
      collide.signChange(ball, 2);
    }
  },

  collideLeft(ball){
    if(ball.x <= 0){
      collide.signChange(ball, 1);
    }
  },

  collidePlayer(ball, player){
    if(player.x < ball.x && player.x + player.width > ball.x && player.y <  ball.y){
        collide.signChange(ball, 2);
      }
  },

  collide(ball){
    // console.log("Hi");
    collide.collideRight(ball);
    collide.collideTop(ball);
    collide.collideLeft(ball);

    collide.collidePlayer(ball, player);
  },
  
}

function loop(){

  draw.rect(0, 0, canvas.width, canvas.height, "#e0e0e0");
  draw.rect(player.x, player.y, player.width, player.height, player.color);
  draw.circle(ball.x, ball.y, ball.radius, ball.color);
  draw.bricks(brick);

  collide.collide(ball);
  move.flight(player, ball);


  window.requestAnimationFrame(loop);
}

window.addEventListener("keydown", move.player);
window.requestAnimationFrame(loop);
