const darkSquareColor = "#7b945a";
const lightSquareColor = "#eaecd3";
const board =  [];

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
    piece.style.width = "80px";
    piece.style.height = "80px";
    piece.style.margin = "5px";
    document.getElementById("cell"+i+j).appendChild(piece);
  }
} 

// b->for black && w->for white
let draggedPiece = null;

function box(target) {
  draggedPiece = document.getElementById(target);
  let isDragging = false;
let offsetX = 0;
let offsetY = 0;

draggedPiece.addEventListener("mousedown", (e) => {
  isDragging = true;
  offsetX = e.clientX - draggedPiece.offsetLeft;
  offsetY = e.clientY - draggedPiece.offsetTop;
});

document.addEventListener("mousemove", (e) => {
  if (!isDragging) return;

  draggedPiece.style.left = (e.clientX - offsetX) + "px";
  draggedPiece.style.top = (e.clientY - offsetY) + "px";
});

document.addEventListener("mouseup", () => {
  isDragging = false;
});

}


document.getElementById("chessboard").addEventListener("click", (e) => {
  const target = e.target;
  console.log("Clicked element:", target);
  console.log(target.id);
  box(target.id);
});
