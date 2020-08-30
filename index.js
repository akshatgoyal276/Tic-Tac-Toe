let players = [];
let turn = parseInt(Math.random() * 10, 10),
  gameOver = false,
  turntext = "",
  turncount = 0;
let playbox = document.getElementById("playbox");
let dimension = document.getElementById("dimensions"),
  dimv = 0;
let board = undefined;

const startGame = () => {
  let player1 = document.getElementById("player1");
  let player2 = document.getElementById("player2");

  let player1name = player1.value;
  let player2name = player2.value;
  dimv = parseInt(dimension.value, 10);

  if (isEmpty(player1name) || isEmpty(player2name)) {
    alert("Player Name is Required");
    return;
  }
  if (dimv < 0) {
    alert("Please Choose A Dimension");
    return;
  }

  player1.classList.add("hide");
  player2.classList.add("hide");
  dimension.classList.add("hide");
  document.getElementById("play-btn").classList.add("hide");
  document.getElementById("dimension").classList.add("hide");
  document.getElementById("player").classList.add("hide");

  players.push(player1name);
  players.push(player2name);

  initGame();
};
const initGame = () => {
  gameOver = false;
  board = new Array(dimv);
  for (let index = 0; index < dimv; index++) {
    board[index] = new Array(dimv);
  }
  turntext = `${players[turn % 2]}'s Turn`;
  let turndisplay = document.createElement("div");
  turndisplay.setAttribute("id", "turn-display");
  turndisplay.innerHTML = turntext;
  turndisplay.classList.add("turn-display");
  playbox.appendChild(turndisplay);
  playbox.style.setProperty("width", "520px");
  let game = document.createElement("div");
  game.setAttribute("id", "game");
  game.classList.add("game");
  playbox.appendChild(game);

  for (let i = 0; i < dimv; i++) {
    let row = document.createElement("div");
    row.className = "row";
    for (let j = 0; j < dimv; j++) {
      let cell = document.createElement("div");
      cell.addEventListener("click", (event) => handleClick(cell, i, j));
      cell.className = "cell";
      if (i === 0) {
        cell.style.borderTop = "none";
      }
      if (i === dimv - 1) {
        cell.style.borderBottom = "none";
      }
      if (j === 0) {
        cell.style.borderLeft = "none";
      }
      if (j === dimv - 1) {
        cell.style.borderRight = "none";
      }
      row.appendChild(cell);
    }
    document.getElementById("game").appendChild(row);
  }
};
const handleClick = (cell, i, j) => {
  if (gameOver || cell.innerText !== "") {
    return;
  }
  if (turn % 2) {
    cell.innerText = "X";
    board[i][j] = 1;
    cell.style.color = "#0066FF";
  } else {
    cell.innerText = "O";
    board[i][j] = -1;
    cell.style.color = "#FF007C";
  }
  if (turncount >= 2 * dimv - 2) {
    if (checkwinner(i, j)) {
      gameOver = true;
      result(players[turn % 2]);
      return;
    }
  }
  turn++;
  turncount++;
  turntext = `${players[turn % 2]}'s Turn`;
  document.getElementById("turn-display").innerHTML = turntext;
  if (turncount === dimv * dimv) {
    result(0);
    return;
  }
};
const checkwinner = (i, j) => {
  let m = 1;
  for (m = 1; m < dimv; m++) {
    if (board[m][j] !== board[m - 1][j]) {
      break;
    }
  }
  if (m === dimv) {
    return true;
  }

  for (m = 1; m < dimv; m++) {
    if (board[i][m] !== board[i][m - 1]) {
      break;
    }
  }
  if (m === dimv) {
    return true;
  }
  for (m = 1; m < dimv; m++) {
    if (board[m][m] !== board[m - 1][m - 1]) {
      break;
    }
  }
  if (m === dimv) {
    return true;
  }
  for (m = 1; m < dimv; m++) {
    if (board[m][dimv - m - 1] !== board[m - 1][dimv - m]) {
      break;
    }
  }
  if (m === dimv) {
    return true;
  }
  return false;
};
const result = (res) => {
  if (res !== 0) {
    res = res.toUpperCase() + "\n WON !!!";
  } else {
    res = "DRAW !!!";
  }
  let popup = document.createElement("div");
  popup.classList.add("modal");
  let resbox = document.createElement("div");
  resbox.setAttribute("id", "result-box");
  resbox.classList.add("res-box", "center");
  let restart = document.createElement("div");
  restart.classList.add("btn");
  restart.innerText = "RESTART";
  restart.addEventListener("click", (event) => restartGame(popup));
  resbox.innerText = res;
  resbox.appendChild(restart);
  popup.appendChild(resbox);
  document.getElementsByTagName("body")[0].appendChild(popup);
  playbox.classList.add("hide");
};
const restartGame = (popup) => {
  playbox.innerText = "";
  turncount = 0;
  popup.classList.add("hide");
  playbox.classList.remove("hide");
  initGame();
};
const isEmpty = (value) => !value || !value.trim();
