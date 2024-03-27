document.addEventListener("DOMContentLoaded", function () {
  const customCursor = document.getElementById("custom-cursor");

  if (customCursor) {
    let rotationAngle = -55;
    let isClicked = false;

    document.addEventListener("mousemove", (e) => {
      if (!isClicked) {
        document.body.style.cursor = "none";
      }

      customCursor.style.display = "block";
      customCursor.style.top = e.pageY + "px";
      customCursor.style.left = e.pageX + "px";
    });

    document.addEventListener("mouseleave", () => {
      if (!isClicked) {
        document.body.style.cursor = "auto";
      }

      customCursor.style.display = "none";
    });

    document.addEventListener("click", () => {
      if (!isClicked) {
        rotationAngle = -70;
        customCursor.style.transform = `rotate(${rotationAngle}deg)`;
        isClicked = true;

        setTimeout(() => {
          rotationAngle = -55;
          customCursor.style.transform = `rotate(${rotationAngle}deg)`;
          isClicked = false;
        }, 500);
      }
    });
  } else {
    console.error("Custom cursor element not found.");
  }

  let backgroundMusic = document.getElementById("background-music");
  backgroundMusic.loop = true;
  backgroundMusic.play();

  setGame();

  document.getElementById("start-button").addEventListener("click", startGame);
});

let currMoleTile = null;
let currPlantTile = null;
let score = 0;
let gameOver = true;
let baseMoleInterval = 2000;
let basePlantInterval = 2000;
let moleInterval;
let plantInterval;

function startGame() {
  if (!gameOver) return;
  gameOver = false;
  score = 0;
  document.getElementById("score").innerText = score.toString();

  document.getElementById("start-button").style.display = "none";

  setGame();
}

function setGame() {
  document.getElementById("board").innerHTML = "";

  for (let i = 0; i < 9; i++) {
    let tile = document.createElement("div");
    tile.id = i.toString();
    tile.addEventListener("click", selectTile);
    document.getElementById("board").appendChild(tile);
  }

  clearInterval(moleInterval);
  clearInterval(plantInterval);

  moleInterval = setInterval(setMole, baseMoleInterval);
  plantInterval = setInterval(setPlant, basePlantInterval);
}

function getRandomTile() {
  let num = Math.floor(Math.random() * 9);
  return num.toString();
}

function setMole() {
  if (gameOver) return;

  clearMole();

  let mole = document.createElement("img");
  mole.src = "./mole.png";
  mole.style.width = "150px";

  let num = getRandomTile();
  currMoleTile = document.getElementById(num);
  currMoleTile.appendChild(mole);
}

function setPlant() {
  if (gameOver) return;

  clearPlant();

  let plant = document.createElement("img");
  plant.src = "./plant.png";
  plant.style.width = "180px";

  let num = getRandomTile();
  currPlantTile = document.getElementById(num);
  currPlantTile.appendChild(plant);
}

function selectTile() {
  if (gameOver) return;

  if (this == currMoleTile) {
    score += 10;
    document.getElementById("score").innerText = score.toString();

    if (score % 100 === 0) {
      increaseDifficulty();
    }

    clearMole();
  } else if (this == currPlantTile) {
    document.getElementById("score").innerText =
      "GAME OVER: " + score.toString();
    gameOver = true;
    document.getElementById("start-button").style.display = "block";

    clearPlant();
  }
}

function increaseDifficulty() {
  baseMoleInterval = Math.max(100, baseMoleInterval - 500);
  basePlantInterval = Math.max(100, basePlantInterval - 500);
  clearInterval(moleInterval);
  clearInterval(plantInterval);
  setGame();
}

function clearMole() {
  if (currMoleTile) {
    currMoleTile.innerHTML = "";
    currMoleTile = null;
  }
}

function clearPlant() {
  if (currPlantTile) {
    currPlantTile.innerHTML = "";
    currPlantTile = null;
  }
}
