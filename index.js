const express = require('express');
const path = require('path'); 
const bodyParser = require('body-parser');
const app = express();
app.use(express.static('public'));
app.use(bodyParser.json());
const focus=require('./focus');
const capture=require('./capture');


let posx=0;
let posy=0;
let grid = new Array(20);
for (let i = 0; i < grid.length; i++) {
    grid[i] = new Array(60);
}
for(let j=0; j<grid.length;j++){
    for (let i = 0; i < 60; i++) {
        grid[j][i]=0;
    }
}
grid[0][0]=1;

//This function check if the cuurent position has been focused or not and calls the appropriate function accordingly
function Operation() {
    //If current cell has not been reached but has not been focused, then we call the focus function on the current cell.
    if (grid[posx][posy] === 1) {
        grid[posx][posy]=2;
      focus.focus(posx,posy);
      setTimeout(Operation, 3000); // Wait 3 seconds before checking again
    } 
    //If current cell has been focused already then we call capture on the current cell.
    else if (grid[posx][posy] === 2) {
        grid[posx][posy]=3;
      capture.capture(posx,posy);
      setTimeout(Operation, 2000); // Wait 2 seconds before checking again
    } 
    //If the cuurent cell has been captured as well , then we wait for 100milli-second before checking again.
    else {
      setTimeout(Operation,100); // Wait 100 milli-second before checking again
    }
  }

Operation();


app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/public/home.html');
});


app.post('/', (req, res) => {
  const keyCode = req.body.code;
  const keyValue = req.body.value;
    let arrowpressed=keyValue;
    if (arrowpressed=='ArrowLeft'){
        posy-=1;
        if (posy<0)
        {
            posy+=1;
        }

    }else if(arrowpressed=='ArrowRight'){
        posy+=1;
        if (posy>=60)
        {
            posy-=1;
        }
    }
    else if(arrowpressed=='ArrowUp'){
        posx-=1;
        if (posx<0)
        {
            posx+=1;
        }
    }
    else if(arrowpressed=='ArrowDown'){
        posx+=1;
        if (posx>=20)
        {
            posx-=1;
        }
    }
    if (grid[posx][posy]==0){
        grid[posx][posy]=1;
    }
    

    //sending current cell position and grid array as data.
    res.status(200).json({ grid:grid , x:posx , y:posy });
});

app.listen(3000, () => {
  console.log('Backend listening on port 3000');
});