<script setup lang="ts">
import { ref, onMounted, onUnmounted } from "vue";

const isFirstGame = ref(true);
const score = ref(0);
const gameScreen = ref<HTMLElement | null>(null);
const gameInterval = ref<NodeJS.Timeout | null>(null);
const gameStarted = ref(false);
const gameOver = ref(false);
const gameWon = ref(false);
const food = ref({ x: 10, y: 5 });
const direction = ref("up");
const snake = ref([
  { x: 10, y: 12 },
  { x: 10, y: 13 },
  { x: 10, y: 14 },
  { x: 10, y: 15 },
  { x: 10, y: 16 },
  { x: 10, y: 17 },
  { x: 10, y: 18 },
  { x: 11, y: 18 },
  { x: 12, y: 18 },
  { x: 13, y: 18 },
  { x: 14, y: 18 },
  { x: 15, y: 18 },
  { x: 15, y: 19 },
  { x: 15, y: 20 },
  { x: 15, y: 21 },
  { x: 15, y: 22 },
  { x: 15, y: 23 },
  { x: 15, y: 24 },
])

function startGame() {
  // start game
  gameStarted.value = true;
  isFirstGame.value = false;
  gameInterval.value = setInterval(moveSnake, 100);
}

function startAgain() {
  // reset game
  gameStarted.value = false;
  gameOver.value = false;
  gameWon.value = false;
  restartScore()
  food.value = {
    x: 10,
    y: 5
  }
  snake.value = [
    { x: 10, y: 12 },
    { x: 10, y: 13 },
    { x: 10, y: 14 },
    { x: 10, y: 15 },
    { x: 10, y: 16 },
    { x: 10, y: 17 },
    { x: 10, y: 18 },
    { x: 11, y: 18 },
    { x: 12, y: 18 },
    { x: 13, y: 18 },
    { x: 14, y: 18 },
    { x: 15, y: 18 },
    { x: 15, y: 19 },
    { x: 15, y: 20 },
    { x: 15, y: 21 },
    { x: 15, y: 22 },
    { x: 15, y: 23 },
    { x: 15, y: 24 },
  ]
  direction.value = "up";

  // start game
  render();
}

function moveSnake() {
  let newX = snake.value[0].x;
  let newY = snake.value[0].y;

  switch (direction.value) {
    case "up":
      newY--;
      break;
    case "down":
      newY++;
      break;
    case "left":
      newX--;
      break;
    case "right":
      newX++;
      break;
  }

  // check if snake dont leave from game window and check if snake dont eat itself
  if (
      newX >= 0 &&
      newX < 24 &&
      newY >= 0 &&
      newY < 40 &&
      !snake.value.find(
          snakeCell => snakeCell.x === newX && snakeCell.y === newY
      )
  ) {
    // add new snake head
    snake.value.unshift({ x: newX, y: newY });

    /* check snake next cell is food */
    if (newX === food.value.x && newY === food.value.y) {

      // add score
      score.value++;

      // add food to score board
      const scoreFoods = document.getElementsByClassName("food");
      scoreFoods[score.value - 1].style.opacity = 1;

      // check if score is 10 (max score)
      if(score.value === 10) {

        // move snake head to food (fix snake head position at end)
        snake.value.unshift({ x: newX, y: newY }); // move head
        food.value = { x: 0, y: 0 } // remove food
        gameWon.value = true; // game won
        gameOver.value = false; // game over
        gameStarted.value = false; // stop game

      } else {

        // create new food
        food.value = {
          x: Math.floor(Math.random() * 24),
          y: Math.floor(Math.random() * 40)
        };
      }

    } else {
      // if next cell is not food: snake pop last cell
      snake.value.pop();
    }
  } else {
    // GAME OVER: if snake leave from game window or eat itself
    gameStarted.value = false;
    gameOver.value = true;
    gameWon.value = false;
  }
  render();
}

function render() {
  const screen = gameScreen.value; // Accéder à l'élément DOM
  if (screen) {
    screen.innerHTML = "";

    // responsive cell screen
    // (this.$refs.gameScreen.offsetWidth / 20) + "px";

    /* const widthCells = window.innerWidth > 1536 ? 24 : 20; */
    const cellSize = window.innerWidth > 1536 ? "10px" : "8px";
    // eje y
    for (let i = 0; i < 40; i++) {
      // exe x
      for (let j = 0; j < 24; j++) {

        /* cell style */
        let cell = document.createElement("div");
        cell.classList.add("cell");
        cell.style.width = cellSize
        cell.style.height = cellSize
        cell.style.display = "flex";
        cell.style.flexShrink = "0";
        cell.classList.add("black");

        if (j === food.value.x && i === food.value.y) {
          cell.style.backgroundColor = "#43D9AD";
          cell.style.borderRadius = "50%";
          cell.style.boxShadow = "0 0 10px #43D9AD";
        }

        let snakeCell = snake.value.find(
            snakeCell => snakeCell.x === j && snakeCell.y === i
        );

        if (snakeCell) {
          cell.style.backgroundColor = "#43D9AD";
          cell.style.opacity = 1 - (snake.value.indexOf(snakeCell) / snake.value.length);
          cell.classList.add("green");

        }


        if (snakeCell && snake.value.indexOf(snakeCell) === 0) {

          let headRadius = "5px";
          if (direction.value === "up") {
            cell.style.borderTopLeftRadius = headRadius;
            cell.style.borderTopRightRadius = headRadius;
          }
          if (direction.value === "down") {

            cell.style.borderBottomLeftRadius = headRadius;
            cell.style.borderBottomRightRadius = headRadius;
          }
          if (direction.value === "left") {
            cell.style.borderTopLeftRadius = headRadius;
            cell.style.borderBottomLeftRadius = headRadius;
          }
          if (direction.value === "right") {
            cell.style.borderTopRightRadius = headRadius;
            cell.style.borderBottomRightRadius = headRadius;
          }
        }
        screen.appendChild(cell);
      }
    }
  }
}


function restartScore() {
  score.value = 0;
  const scoreFoods = document.getElementsByClassName("food");
  for (let i = 0; i < scoreFoods.length; i++) {
    scoreFoods[i].style.opacity = 0.3;
  }
}

function move(directionValue: string) {
  if (!gameStarted.value) return;
  switch (directionValue) {
    case "up":
      if (direction.value !== "down") {
        direction.value = "up";
      }
      break;
    case "down":
      if (direction.value !== "up") {
        direction.value = "down";
      }
      break;
    case "left":
      if (direction.value !== "right") {
        direction.value = "left";
      }
      break;
    case "right":
      if (direction.value !== "left") {
        direction.value = "right";
      }
      break;
  }
}


function handleKeyDown(event: KeyboardEvent) {
  if (gameStarted.value) {
    switch (event.keyCode) {
      case 37:
        if (direction.value !== "right") {
          direction.value = "left";
        }
        break;
      case 38:
        if (direction.value !== "down") {
          direction.value = "up";
        }
        break;
      case 39:
        if (direction.value !== "left") {
          direction.value = "right";
        }
        break;
      case 40:
        if (direction.value !== "up") {
          direction.value = "down";
        }
        break;
    }
  } else {
    switch (event.keyCode) {
      case 32:
        if(gameOver.value){
          startAgain();
        }else {
          startGame();
        }
        break;
    }
  }
}

onMounted(() => {
  document.addEventListener("keydown", handleKeyDown);

  window.onresize = () => {
    render();
  };

  render();
});

onUnmounted(() => {
  document.removeEventListener("keydown", handleKeyDown);
  if (gameInterval.value) {
    clearInterval(gameInterval.value)
  }
});
</script>

<template>
    <div id="console">

      <!-- bolts -->
      <img id="corner" src="/svg/console/bolt-up-left.svg" alt="" class="absolute top-2 left-2 opacity-70">
      <img id="corner" src="/svg/console/bolt-up-right.svg" alt="" class="absolute top-2 right-2 opacity-70">
      <img id="corner" src="/svg/console/bolt-down-left.svg" alt="" class="absolute bottom-2 left-2 opacity-70">
      <img id="corner" src="/svg/console/bolt-down-right.svg" alt="" class="absolute bottom-2 right-2 opacity-70">


      <!-- Game Screen -->
      <div id="game-screen" ref="gameScreen"></div>

      <button v-if="!gameStarted && isFirstGame" id="start-button" class="" @click="startGame">start-game</button>

      <!-- Game Over -->
      <div v-if="gameOver" id="game-over">
        <span class="text-accent text-3xl bg-primary h-16 flex items-center justify-center">GAME OVER!</span>
        <button class="text-menu-text text-xl flex items-center justify-center w-full py-6 hover:text-white" @click="startAgain">start-again</button>
      </div>

      <div v-if="gameWon" id="congrats" class="hidden">
        <span class="text-accent text-3xl bg-primary h-16 flex items-center justify-center">WELL DONE!</span>
        <button class="text-menu-text text-xl flex items-center justify-center w-full py-6 hover:text-white" @click="startAgain">play-again</button>
      </div>

      <div id="console-menu" class="h-full flex flex-col items-end justify-start">


        <div id="instructions" class="text-sm text-white">
          <p>// use your keyboard</p>
          <p>// arrows to play</p>

          <div id="buttons" class="w-full flex flex-col items-center gap-1 pt-5">

              <button class="console-button button-up" aria-label="button up" @click="move('up')">
                <img src="/svg/console/arrow-button.svg" alt="">
              </button>

              <div class="grid grid-cols-3 gap-1">
                <button class="console-button button-left" aria-label="button left" @click="move('left')">
                  <img src="/svg/console/arrow-button.svg" alt="" class="-rotate-90">
                </button>

                <button class="console-button button-down" aria-label="button down" @click="move('down')">
                  <img src="/svg/console/arrow-button.svg" alt="" class="rotate-180">
                </button>

                <button class="console-button button-right" aria-label="button right" @click="move('right')">
                  <img src="/svg/console/arrow-button.svg" alt="" class="rotate-90">
                </button>
            </div>

          </div>
        </div>

        <!-- score board -->
        <div id="score-board" class="w-full flex flex-col pl-5">
          <p class=" text-white pt-5">// food left</p>

          <div id="score" class="grid grid-cols-5 gap-5 justify-items-center pt-5 w-fit">
            <div class="food"></div>
            <div class="food"></div>
            <div class="food"></div>
            <div class="food"></div>
            <div class="food"></div>
            <div class="food"></div>
            <div class="food"></div>
            <div class="food"></div>
            <div class="food"></div>
            <div class="food"></div>

          </div>
        </div>
      </div>
    </div>

</template>

<style>
#console {
    width: 530px;
    height: 475px;
    border: 1px solid black;
    display: flex;
    align-items: center;
    justify-content: space-between;
    background: linear-gradient(to bottom, rgba(35, 123, 109, 1), rgba(67, 217, 173, 0.13));
    border-radius: 10px;
    padding: 30px;
    position: relative;

}

#game-screen {
    width: 240px;
    height: 400px;
    border-radius: 10px;
    background-color: rgba(1, 22, 39, 0.84);
    display: flex;
    flex-wrap: wrap;
    box-shadow: inset 0 0 10px #00000071;
}

#start-button {
  padding-inline: 16px;
  padding-block: 8px;
  border-radius: 10px;
  border: 1px solid black;
  background-color: #FEA55F;
  color: black;
  cursor: pointer;
  position: absolute;
  bottom: 20%;
  left: 17%;
  font-size: 0.875rem; /* 14px */
  line-height: 1.25rem; /* 20px */
}

#start-button:hover {
  background-color: rgb(255, 178, 119);
}

#console-menu{
  height: 400px;
}

.console-button {
  background-color: #010C15;
  border-radius: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 50px;
  height: 30px;
}

.console-button:hover {
  background-color: #010c15d8;
  box-shadow: #43D9AD 0 0 10px;
}

#instructions {
  background-color: rgba(1, 20, 35, 0.19);
  border-radius: 7px;
  padding: 10px;
}

.food {
  background-color: #43D9AD;
  border-radius: 50%;
  box-shadow: 0 0 10px #43D9AD;
  width: 8px;
  height: 8px;
  opacity: 0.3;
}

#game-over, #congrats {
  position: absolute;
  bottom: 12%;
  color: #43D9AD;
  width: 240px;
}

#game-over, #congrats > span {
  font-size: 1.5rem; /* 24px */
  line-height: 2rem; /* 32px */
}

#corner {
  width: 24px;
  height: 24px;
}

#skip-btn{
  font-size: 14px;
  color: white;
  padding-inline: 16px;
  padding-block: 8px;
  border: 2px solid white;
  border-radius: 0.5rem; /* 8px */
}


@media (min-width: 1024px) and (max-width: 1536px) {
  #game-screen {
    width: 192px;
    height: 320px;
  }

  #console {
    width: 420px;
    height: 370px;
    padding: 24px;

  }

  #start-button {
  padding-inline: 12px;
  padding-block: 6px;
  border-radius: 8px;
  bottom: 20%;
  left: 17%;
  font-size: 0.75rem; /* 14px */
  line-height: 1rem; /* 20px */
}

  #console-menu{
  height: 320px;
}

#instructions {
  font-size: 12px;
}

#console-button {
  width: 40px;
  height: 25px;
  border-radius: 6px;
}

#score-board {
  font-size: 12px;
}

.food {
  width: 6px;
  height: 6px;
}

#game-over, #congrats {
  position: absolute;
  bottom: 10%;
  color: #43D9AD;
  width: 192px;
}

#game-over, #congrats > span {
  font-size: 1.125rem; /* 18px */
  line-height: 1.75rem; /* 28px */
}

#corner {
  width: 20px;
  height: 20px;
}

}
</style>