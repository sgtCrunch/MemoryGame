const gameContainer = document.getElementById("game");
const startButton = document.querySelector(".cool-button");
const scoreText = document.getElementById("score");

sessionStorage.setItem("correct", 0);
sessionStorage.setItem("score", 0);

const COLORS = [
  "red",
  "blue",
  "green",
  "orange",
  "purple",
  "red",
  "blue",
  "green",
  "orange",
  "purple"
];


startButton.addEventListener("click", function(){
  createDivsForColors(shuffledColors);
  startButton.remove();
});


// here is a helper function to shuffle an array
// it returns the same array with values shuffled
// it is based on an algorithm called Fisher Yates if you want ot research more
function shuffle(array) {
  let counter = array.length;

  // While there are elements in the array
  while (counter > 0) {
    // Pick a random index
    let index = Math.floor(Math.random() * counter);

    // Decrease counter by 1
    counter--;

    // And swap the last element with it
    let temp = array[counter];
    array[counter] = array[index];
    array[index] = temp;
  }

  return array;
}

let shuffledColors = shuffle(COLORS);

// this function loops over the array of colors
// it creates a new div and gives it a class with the value of the color
// it also adds an event listener for a click for each card
function createDivsForColors(colorArray) {

  for (let color of colorArray) {
    // create a new div
    const newDiv = document.createElement("div");

    // give it a class attribute for the value we are looping over
    newDiv.classList.add(color);
    newDiv.classList.add("face-down");

    // call a function handleCardClick when a div is clicked on
    newDiv.addEventListener("click", handleCardClick);

    // append the div to the element with an id of game
    gameContainer.append(newDiv);
  }
}

function endGamePopUp(){

  const overlap = document.createElement("div");
  const newDiv = document.createElement("div");
  const newButton = document.createElement("button");
  const scoreDisp = document.createElement("h3");
  const highDisp = document.createElement("h4");

  newDiv.classList.add("pop-up");
  newButton.classList.add("cool-button");
  overlap.classList.add("overlay");

  const currentScore = parseInt(sessionStorage.getItem("score"));
  const highScore = parseInt(localStorage.getItem("highScore"));

  newButton.innerText = "Restart Game";
  scoreDisp.innerText = "Total Guesses: " + currentScore;

  if(!highScore || currentScore < highScore){
    localStorage.setItem("highScore", currentScore);
    highDisp.innerText = "YOU GOT THE HIGH SCORE!";
  }
  else{
    highDisp.innerHTML = "High Score: " + highScore;
  }

  newButton.addEventListener("click", function(e){
    gameContainer.innerHTML = "";
    createDivsForColors(shuffle(COLORS));
    sessionStorage.setItem("correct", 0);
    sessionStorage.setItem("score", 0);
    scoreText.innerText = "Total Guesses: 0";
    e.target.parentElement.parentElement.remove();

  });

  newDiv.append(scoreDisp);
  newDiv.append(highDisp);
  newDiv.append(newButton);
  overlap.append(newDiv);

  document.body.append(overlap);



}

// TODO: Implement this function!
function handleCardClick(event) {

  // you can use event.target to see which element was clicked
  if(event.target.classList.contains("face-down") && gameContainer.querySelectorAll("div:not(.face-down):not(.found)").length < 2)
  {

    event.target.classList.toggle("face-down");
    const cardsFlipped = Array.from(gameContainer.querySelectorAll("div:not(.face-down):not(.found)"));

    if(cardsFlipped.length > 1)
    {
      
      if(cardsFlipped[0].className === cardsFlipped[1].className)
      {
        sessionStorage.setItem("correct", parseInt(sessionStorage.getItem("correct")) + 1);
        cardsFlipped[0].classList.add("found");
        cardsFlipped[1].classList.add("found");
        
        if(sessionStorage.getItem("correct") == 5){
          endGamePopUp();
        }

      }
      else
      {
        
        setTimeout(function(){
          for(let card of cardsFlipped){
            card.classList.toggle("face-down");
          }

        }, 1000);
      }

      sessionStorage.setItem("score", parseInt(sessionStorage.getItem("score")) + 1);
      scoreText.innerText = "Total Guesses: " + sessionStorage.getItem("score");

    }
  }

}