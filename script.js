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

function kingLogic(curr,targCell,currX,currY,targX,targY) {
  if(board[targX][targY] !== "" && board[targX][targY][0] === chance)return false;  
  return  (Math.abs(currX - targX) <= 1 && Math.abs(currY - targY) <= 1);
}

function queenLogic(curr,targCell,currX,currY,targX,targY) {

}

function rookLogic(curr,targ) {
  // if(targCell.firstElementChild && targCell.firstElementChild.className[0] === chance)return false;
  // if(currX !== targX || currY !== targY)return false;
  // for(let i = Math.min(currX,targX)+1; i < Math.max(currX,targX); i++){
}

function bishopLogic(curr,targ) {

} 

function knightLogic(curr,targ) {

} 

function pawnLogic(curr,targ) {

}

function isValidMove(curr,targCell) {
  if(curr.className[0] === chance){

    let currX = parseInt(curr.parentNode.id[4]);
    let currY = parseInt(curr.parentNode.id[5]);
    let targX = parseInt(targCell.id[4]);
    let targY = parseInt(targCell.id[5]);

    let currPiece = curr.className[1];
    
    if(currPiece === "k"){
      return kingLogic(curr,targCell,currX,currY,targX,targY);
    }else if(currPiece === "q"){
      return true;
    }else if(currPiece === "r"){
      return true;
    } else if(currPiece === "b"){
      return true;
    }else if(currPiece === "n"){
      return true;
    }else{
      return true;
    }
  }
  return false;
}
