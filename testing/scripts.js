const item = document.getElementById("item");
const boxes = document.querySelectorAll(".box");

let draggedElement = null;

/* When dragging starts */
item.addEventListener("dragstart", (e) => {
  draggedElement = e.target;
  console.log(draggedElement);
});

/* Loop over all drop zones */
boxes.forEach(box => {

  /* Allow dropping */
  box.addEventListener("dragover", (e) => {
    e.preventDefault(); // REQUIRED
  });

  /* Handle drop */
  box.addEventListener("drop", (e) => {
    e.preventDefault();

    // Prevent nesting inside item itself
    if (e.target.classList.contains("box")) {
      e.target.appendChild(draggedElement);
    }
  });
});
