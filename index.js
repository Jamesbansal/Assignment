function focus(x,y){
    return 1;
}
function capture(x,y){
    return 1;
}

let posx=0;
let posy=0;
let arr = new Array(20);
for (let i = 0; i < arr.length; i++) {
    arr[i] = new Array(60);
}
for(let j=0; j<arr.length;j++){
    for (let i = 0; i < 60; i++) {
        arr[j][i]=0;
    }
}
arr[0][0]=1;


const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(express.static(__dirname));

app.use(bodyParser.json());

app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/home.html');
})
// setInterval(() => {
//     if (arr[posx][posy]==0 || arr[posx][posy]==1){
//         arr[posx][posy]=2;
//         //focuss(posx,posy);
//         setTimeout(()=>{console.log(`Focused on ${posx} , ${posy}`)},3000);
//     }
//     else if(arr[posx][posy]==2){
//         arr[posx][posy]=3;
//         //capture(posx,posy);
//         setTimeout(()=>{console.log(`Focused on ${posx} , ${posy}`)},2000);
//     }
// }, 100);

function checkOper() {
    if (arr[posx][posy] === 0 || arr[posx][posy]==1) {
        arr[posx][posy]=2;
      focus(posx,posy);
      setTimeout(checkOper, 3000); // Wait 3 seconds before checking again
    } else if (arr[posx][posy] === 2) {
        arr[posx][posy]=3;
      capture(posx,posy);
      setTimeout(checkOper, 2000); // Wait 2 seconds before checking again
    } else {
      setTimeout(checkOper,100); // Wait 1 second before checking again
    }
  }
checkOper();

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
    if (arr[posx][posy]==0){
        arr[posx][posy]=1;
    }
    
    res.status(200).json({ 
    array: arr, 
    x: posx, 
    y: posy });
});

app.listen(3000, () => {
  console.log('Backend listening on port 3000');
});