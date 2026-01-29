const darkSquareColor = "#7b945a";
const lightSquareColor = "#eaecd3";
const board =  [];

let chance = "b";

for(let i = 0; i < 8; i++) {
    board[i]=[]

    // Create a row of the chessboard
    const row = document.createElement("div");
    document.getElementById("chessboard").appendChild(row);
    row.style.display = "flex";
    row.id = "row"+i;
    row.style.height = "90px";
    row.style.width = "720px";


  for(let j = 0; j < 8; j++) {
    board[i][j] = ""

    //create a cell of the chessboard
    const cell = document.createElement("div");
    cell.id = "cell"+i+j;
    cell.className = "cell";
    cell.draggable = true;
    cell.style.display = "flex";
    cell.style.justifyContent = "center";
    cell.style.alignItems = "center";
    cell.style.width = "90px";
    cell.style.height = "90px";
    document.getElementById("row"+i).appendChild(cell);

    if((i + j) % 2 === 0) {
      cell.style.backgroundColor = lightSquareColor;
    } else {
      cell.style.backgroundColor = darkSquareColor;
    }
  }
}

//Assiging pieces to board array
board[0] = ["br","bn","bb","bq","bk","bb","bn","br"];
board[1] = ["bp","bp","bp","bp","bp","bp","bp","bp"];
board[6] = ["wp","wp","wp","wp","wp","wp","wp","wp"];
board[7] = ["wr","wn","wb","wq","wk","wb","wn","wr"];

const addTo = [0,1,6,7];

for(let i of addTo) {
  for(let j = 0; j < 8; j++) {
    const piece = document.createElement("img");
    piece.src = `pieces/${board[i][j]}.png`;
    piece.className = `${board[i][j]}`;
    piece.style.width = "80px";
    piece.style.height = "80px";
    piece.style.margin = "5px";
    document.getElementById("cell"+i+j).appendChild(piece);
  }
} 

//code for drag and drop functionality
let draggedPiece = null;

document.getElementById("chessboard").addEventListener("dragstart", (e) => {
  const target = e.target;
  if(target.tagName === "IMG"){ 
    draggedPiece = target;
    console.log("#######");
    console.log((target));
  }
});

document.getElementById("chessboard").addEventListener("dragover", (e) => {
  e.preventDefault();
});

document.getElementById("chessboard").addEventListener("drop", (e) => {
  e.preventDefault();
  const cell = e.target.closest(".cell");
  if (!cell || !draggedPiece) return;

  if (isValidMove(draggedPiece, cell)) {

    let currX = parseInt(draggedPiece.parentNode.id[4]);
    let currY = parseInt(draggedPiece.parentNode.id[5]);
    let targX = parseInt(cell.id[4]);
    let targY = parseInt(cell.id[5]);

    board[targX][targY]=board[currX][currY];
    board[currX][currY]="";

    if (cell.firstElementChild) {
      cell.removeChild(cell.firstElementChild);
    }
    cell.appendChild(draggedPiece);
    chance = chance === "b" ? "w" : "b";
  }
  draggedPiece = null;
});



//chess pieces logic
function kingLogic(currX,currY,targX,targY) {
  return  (Math.abs(currX - targX) <= 1 && Math.abs(currY - targY) <= 1);
}

function queenLogic(currX,currY,targX,targY) {
  if(currX === targX || currY === targY)
    return rookLogic(currX,currY,targX,targY);
  else
    return bishopLogic(currX,currY,targX,targY);
}

function rookLogic(currX,currY,targX,targY) {
  if(currX !== targX && currY !== targY)return false;
  for(let i = Math.min(currX,targX)+1; i < Math.max(currX,targX); i++){
    if(board[i][currY] !== "")return false;
  }
  for(let j = Math.min(currY,targY)+1; j < Math.max(currY,targY); j++){
    if(board[currX][j] !== "")return false;
  }
  return true;
}

function bishopLogic(currX,currY,targX,targY) {
  if(Math.abs(currX - targX) !== Math.abs(currY - targY))return false;
  let dx = currX > targX ? -1 : 1;
  let dy = currY > targY ? -1 : 1;
  let x = currX + dx;
  let y = currY + dy;
  while(x!=targX && y!=targY){
    if(board[x][y] !== "")return false;
    x += dx;
    y += dy;
  }
  return true;
} 

function knightLogic(currX,currY,targX,targY) {
  let check = [[2,1],[2,-1],[-2,1],[-2,-1],[1,2],[1,-2],[-1,2],[-1,-2]];
  for(let i = 0; i < check.length; i++){
    if(currX + check[i][0] === targX && currY + check[i][1] === targY){
      return true;
    }
  }
  return false;
} 

function pawnLogic(currX,currY,targX,targY) {
  let direction = chance === "w" ? -1 : 1;
  //for 1 forward
  if(targX === currX + direction && targY === currY && board[targX][targY] === ""){
    return true;
  }
  //for 2 forward from initial position
  if((chance === "w" && currX === 6) || (chance === "b" && currX === 1)){
    if(targX === currX + 2*direction && targY === currY && board[targX][targY] === "" && board[currX + direction][currY] === ""){
      return true;
    }
  }
  //for capture
  if(targX === currX + direction && Math.abs(targY - currY) === 1){
    if(board[targX][targY] !== "" && board[targX][targY][0] !== chance){
      return true;
    }
  }
  return false; 
}

function isValidMove(curr,targCell) {
  console.log("hjello wiorld");
  
  if(curr.className[0] === chance){

    let currX = parseInt(curr.parentNode.id[4]);
    let currY = parseInt(curr.parentNode.id[5]);
    let targX = parseInt(targCell.id[4]);
    let targY = parseInt(targCell.id[5]);

    let currPiece = curr.className[1];
    console.log(board[targX][targY]);
    
    if(board[targX][targY] !== "" && board[targX][targY][0] === chance)return false;  
    
    if(currPiece === "k"){
      return kingLogic(currX,currY,targX,targY);
    }else if(currPiece === "q"){
      return queenLogic(currX,currY,targX,targY);
    }else if(currPiece === "r"){
      return rookLogic(currX,currY,targX,targY);
    } else if(currPiece === "b"){
      return bishopLogic(currX,currY,targX,targY);
    }else if(currPiece === "n"){
      return knightLogic(currX,currY,targX,targY);
    }else{
      return pawnLogic(currX,currY,targX,targY);
    }
  }
  return false;
}
