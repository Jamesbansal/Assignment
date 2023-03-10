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
        cell.classList.add("reached");
      }
      cell.setAttribute('id',`${i}-${j}`);
      row.appendChild(cell);
    }
    grid.appendChild(row);
  }
}
createGrid();

const reset = document.getElementById("reset");
reset.addEventListener("click", resetGrid);
//When we reset the grid, all the added class names has to be removed from the cells.
function resetGrid() {
      //console.log("resetting grid");
      let xhr = new XMLHttpRequest();
      xhr.open('POST', '/reset', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      let payload = JSON.stringify({
        code: event.keyCode,
        value: 'reset'
      });
      xhr.send(payload);
      let posx=0;
      let posy=0;
      const curblink = document.getElementById(`${currentCol}-${currentRow}`);
      curblink.classList.remove("blink");
      const curblink2 = document.getElementById(`${posx}-${posy}`);
      curblink2.classList.add("blink");
      currentCol=posx;
      currentRow=posy;
      //removing the classnames from all cells in the grid.
      for (let i = 0; i < numRows; i++) {
        for (let j = 0; j < numCols; j++) {
          
        const curblink = document.getElementById(`${i}-${j}`);
        if(curblink.classList.contains("reached")){
          curblink.classList.remove("reached");
        }
        if(curblink.classList.contains("focused")){
          curblink.classList.remove("focused");
        }
        if(curblink.classList.contains("captured")){
          curblink.classList.remove("captured");
        }
        const curblink2 = document.getElementById(`${0}-${0}`);
      curblink2.classList.add("reached");
        }
      }
        
    
    
  

}
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
            //console.log(grid,posx,posy);
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



function UpdateArray(){
  let xhr = new XMLHttpRequest();
      xhr.open('Get', '/grid', true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      let payload = JSON.stringify({
        code: "event.keyCode",
        value: "event.key"
      });
      xhr.send(payload);
      //waiting for an array and the current cell position as response
      xhr.addEventListener('load', function() {
          if (xhr.status === 200) {
            let response = JSON.parse(xhr.responseText);
            let grid=response.grid;
            let posx=response.x;
            let posy=response.y;
            //console.log(grid,posx,posy,"send from here");
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

            setTimeout(UpdateArray,1000);
          } else {
            console.error('Request failed');
            setTimeout(UpdateArray,10000);
          }
    });
    
}
UpdateArray();