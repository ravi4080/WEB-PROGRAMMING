var plc = 0;
var coc = 0;
var pscore = 0;
var cscore = 0;

//functions to get user and computer options
function rock() {
  $("#player-rock").css("text-shadow", "2px 2px 30px black");
  $("#player-paper").css("text-shadow", "0px 0px");
  $("#player-scissors").css("text-shadow", "0px 0px");
  computerChoice();
  plc = 1;
  Game();
}

function paper() {
  $("#player-rock").css("text-shadow", "0px 0px");
  $("#player-paper").css("text-shadow", "2px 2px 30px black");
  $("#player-scissors").css("text-shadow", "0px 0px");
  computerChoice();
  plc = 2;
  Game();  
}

function scissors() {
  $("#player-rock").css("text-shadow", "0px 0px");
  $("#player-paper").css("text-shadow", "0px 0px");
  $("#player-scissors").css("text-shadow", "2px 2px 30px black");
  computerChoice();
  plc = 3;
  Game();
}

function computerChoice() {
  //using random function to generate random selection by the computer
  coc = Math.floor((Math.random() * 3)+1)
  switch (coc) {
    case 1:
      $("#computer-rock").css("text-shadow", "2px 2px 30px black");
      $("#computer-paper").css("text-shadow", "0px 0px");
      $("#computer-scissors").css("text-shadow", "0px 0px");      
      break;
    
    case 2:
      $("#computer-rock").css("text-shadow", "0px 0px");      
      $("#computer-paper").css("text-shadow", "2px 2px 30px black");
      $("#computer-scissors").css("text-shadow", "0px 0px");      
      break;
    
    case 3:
      $("#computer-rock").css("text-shadow", "0px 0px");
      $("#computer-paper").css("text-shadow", "0px 0px");
      $("#computer-scissors").css("text-shadow", "2px 2px 30px black");
      break;
  }
}
//game function
function Game() {
  switch (plc) {
    case 1:
      if(coc == 1) {
        document.getElementById('message').innerHTML = "Draw!";
        //no score updation as it is draw
      }
      else if(coc == 2) {
        cscore++;
        document.getElementById('message').innerHTML = "Computer Won!";
        document.getElementById('computer_score').innerHTML = cscore; //displaying computer score of the computer 
      }
      else if(coc == 3) {
        pscore++;
        document.getElementById('message').innerHTML = "You Won!";
        document.getElementById('player_score').innerHTML = pscore; //displaying computer score of the player
      }
      break;

    case 2:
      if(coc == 2) {
        document.getElementById('message').innerHTML = "Draw!";
         //no score updation as it is draw
      }
      else if(coc == 3) {
        cscore++;
        document.getElementById('message').innerHTML = "Computer Won!";
        document.getElementById('computer_score').innerHTML = cscore; //displaying computer score of the computer
      }
      else if(coc == 1) {
        pscore++;
        document.getElementById('message').innerHTML = "You Won!";
        document.getElementById('player_score').innerHTML = pscore; //displaying computer score of the player
      }
      break;

    case 3:
      if(coc == 3) {
        document.getElementById('message').innerHTML = "Draw!";
        //no score updation as it is draw
      }
      else if(coc == 1) {
        cscore++;
        document.getElementById('message').innerHTML = "Computer Won!";
        document.getElementById('computer_score').innerHTML = cscore;  //displaying computer score of the computer 
      }
      else if(coc == 2) {
        pscore++;
        document.getElementById('message').innerHTML = "You Won!";   
        document.getElementById('player_score').innerHTML = pscore; //displaying computer score of the player
      }
      break;
  }
}

//functions to reset the game
function reset() {
plc = 0;
coc = 0;
pscore = 0;
cscore = 0;

resetCSS();

document.getElementById('computer_score').innerHTML = cscore;
document.getElementById('player_score').innerHTML = pscore;
document.getElementById('message').innerHTML = "Start the Game....!!";
}

function resetCSS() {
  $("#player-rock").css("text-shadow", "0px 0px");
  $("#player-paper").css("text-shadow", "0px 0px");
  $("#player-scissors").css("text-shadow", "0px 0px");
  $("#computer-rock").css("text-shadow", "0px 0px");
  $("#computer-paper").css("text-shadow", "0px 0px");
  $("#computer-scissors").css("text-shadow", "0px 0px");
}

function resetConfirm() {
  var text;
  if (confirm("Click 'OK' to Reset the Game ")) {
    reset();
  }
}

