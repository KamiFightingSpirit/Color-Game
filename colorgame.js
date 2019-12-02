//selects the 6 squares
let squares = document.querySelectorAll(".square");
//holds the instructions and game winning text
let pickColor = document.getElementById("pickColor");
//when true, only reset can be clicked, initialized to false
let gameOver = false;
//holds global random varaibles that determine the winner
let winningArr = [];
//gameMode = true is easy, gameMode = false is hard
let gameMode = true;
//Controls "difficulty" the lower the number the closer together the colors will be, a setting of 1 would mean near identical colors
let difficulty = 70;
//holds the initial 3 numbers to build hard mode's colors around
let buildColorArr = [];

//object holding the different functions to be called throughout the program. 
let gameState = {
  gameModeEasy : function() {
    gameMode = true;
    gameState.reset();
    difficultyText.textContent="(Set to Easy)";
  },
  gameModeHard : function() {
    gameMode = false;
    gameState.reset();
    difficultyText.textContent="(Set to Hard)";
  },
  nonWinner : function(clicked) {
    squares[clicked].classList.add("nonWinner");
  },
  win : function() {
    gameOver = true;
    pickColor.textContent = "YOU PICKED CORRECTLY!"; 
    
  },
  reset : function() {
      gameOver = false;
      winningArr = [];
      buildColorArr = [];      
      gameState.initialize();
  },
  initialize : function() {
    //reselects the square -- used during add/sub row
    squares = document.querySelectorAll(".square");
    for(let i = 0; i < squares.length; i++){
      //sets the background color for each square based off random gen
      squares[i].style.backgroundColor = gameState.randomColor(i); 
      squares[i].classList.remove("nonWinner");     
      squares[i].addEventListener("click", function() {
        if(!gameOver){  
          if(i !== winningArr[0]){ 
            gameState.nonWinner(i);
          } else {
            gameState.win();
          }
        }
      })      
    }; 
    gameState.randomWinner();
  },
  //creates the RGB code for each square
  randomColor : function (clicked) {    
      if(clicked === 0) {      
      for(let i = 0; i < 3; i++) {
        buildColorArr.push(gameState.randomNum(clicked));    
     }      
      return("rgb("+buildColorArr[0]+","+buildColorArr[1]+","+buildColorArr[2]+")");
    } else if (!!gameMode) {
        return("rgb("+gameState.randomNum()+","+gameState.randomNum()+","+gameState.randomNum()+")");
    } else {      
      return gameState.randomColorHard(clicked);
    }
  }, 
  //generates a random number to be used for colors
  randomNum : function(clicked) {
    if(clicked === 0 || gameMode === true) {
      return Math.round(Math.random() * 255);
      } else {
        return gameState.randomNumHard();
      }
  },
  //pushes the random winning values to a global array
  randomWinner : function() { 
    winningArr.push(Math.floor(Math.random() * (squares.length)));
    winningArr.push(squares[winningArr[0]].style.backgroundColor); 
    pickColor.textContent = "Find this color: " + winningArr[1];
  },
  randomColorHard : function(clicked) { 
    for(let i = 0; i < 3; i++){
        buildColorArr.push(gameState.randomNumHard(buildColorArr[i]));
       }
      let constructedColor = ("rgb("+buildColorArr[3]+","+buildColorArr[4]+","+buildColorArr[5]+")");
      buildColorArr.splice(3);
      return constructedColor;    
  },
  randomNumHard : function(parentColor) {
    let posOrNeg = Math.random() < 0.5 ? -1 : 1;
    let constructedNum = Math.round(parentColor + posOrNeg * Math.random() * difficulty);
    return constructedNum;
  },
  addRow : function() {
    for(let i = 0; i < 3; i++){
      squareContainer.innerHTML += "<div class='square'></div>";
      }
    gameState.reset();     
  },
  subtractRow : function() {
    for(let i = 0; i < 3; i++){
      squares[i].remove();
      }
    gameState.reset();
  }
}
//sets up the first game
gameState.initialize();
//reset button - initialized invisible
let resetButton = document.getElementById("resetButton"); 
resetButton.addEventListener("click", gameState.reset);
//changes the difficulty to easy
let easyButton = document.getElementById("easyButton");
easyButton.addEventListener("click", gameState.gameModeEasy);
//changes the difficulty to hard
let hardButton = document.getElementById("hardButton");
hardButton.addEventListener("click", gameState.gameModeHard);
//controls the text that tells you the current difficult mode
let difficultyText = document.getElementById("difficultyText");
//adds an additional row of squares
let addRowButton = document.getElementById("addRowButton");
addRowButton.addEventListener("click", gameState.addRow);
//subtracts a row of squares
let subtractRowButton = document.getElementById("subtractRowButton");
subtractRowButton.addEventListener("click", gameState.subtractRow);
let squareContainer = document.getElementById("container");



