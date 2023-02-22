const numRows = 20;
const numCols = 60;
const grid = document.getElementById("grid");
let currentRow = 0;
let currentCol = 0;

//creating an initial Grid of 20X60. Initial pointer is at cell(0,0)
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


//adding an event listener to send arrow button clicks
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
      //waiting for an array and the current cell position as response
      xhr.addEventListener('load', function() {
          if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            let grid=response.grid;
            let posx=response.x;
            let posy=response.y;
            console.log(grid,posx,posy);
            const curblink = document.getElementById(`${currentCol}-${currentRow}`);
            curblink.classList.remove("blink");
            const curblink2 = document.getElementById(`${posx}-${posy}`);
            curblink2.classList.add("blink");
            currentCol=posx;
            currentRow=posy;

            //re-rendering the grid according to the array received as response
            //1: white background indicating that cell has not been reached yet
            //2: Black background indicating that the cell has been reached but not Focused or captured
            //3: Blue Background indicating that the cell has been reached and Focused but not Captured
            //4: Red Background indicating that the cell has been reached and Focused and Captured.
            for (let i = 0; i < numRows; i++) {
              for (let j = 0; j < numCols; j++) {
                if (grid[i][j]==1){
                  const curblink = document.getElementById(`${i}-${j}`);
                  curblink.classList.add("reached");
                }
                if (grid[i][j]==2){
                  const curblink = document.getElementById(`${i}-${j}`);
                  curblink.classList.add("focused");
                }
                if (grid[i][j]==3){
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