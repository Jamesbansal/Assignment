
const numRows = 20;
const numCols = 60;
const grid = document.getElementById("grid");
let currentRow = 0;
let currentCol = 0;

function createGrid() {
  for (let i = 0; i < numRows; i++) {
    const row = document.createElement("tr");
    for (let j = 0; j < numCols; j++) {
      const cell = document.createElement("td");
      if (i === currentRow && j === currentCol) {
        cell.classList.add("blink");
      }
      cell.setAttribute('id',`${i}-${j}`);
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
}
createGrid();

document.addEventListener('keydown', function(event) {
    if (event.key=='ArrowUp' || event.key=='ArrowDown' || event.key=='ArrowLeft' || event.key=='ArrowRight')
    {
    let xhr = new XMLHttpRequest();
    xhr.open('POST', '/', true);
    xhr.setRequestHeader('Content-Type', 'application/json');
    let payload = JSON.stringify({
      code: event.keyCode,
      value: event.key
    });
    xhr.send(payload);
    xhr.addEventListener('load', function() {
        if (xhr.status === 200) {
          let response = JSON.parse(xhr.responseText);
          let x=response.x;
          let y=response.y;
          let arr=response.array;
          console.log(x);
          console.log(y);
          console.log(arr);
          const curblink = document.getElementById(`${currentCol}-${currentRow}`);
          curblink.classList.remove("blink");
          const curblink2 = document.getElementById(`${x}-${y}`);
          curblink2.classList.add("blink");
          currentCol=x;
          currentRow=y;
          for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
              if (arr[i][j]==1){
                const curblink = document.getElementById(`${i}-${j}`);
                curblink.classList.add("reached");
              }
              if (arr[i][j]==2){
                const curblink = document.getElementById(`${i}-${j}`);
                curblink.classList.add("focused");
              }
              if (arr[i][j]==3){
                const curblink = document.getElementById(`${i}-${j}`);
                curblink.classList.add("captured");
              }
            }
          }

          
        } else {
          console.error('Request failed');
        }
    });
    
  }
  });