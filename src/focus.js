let foc=undefined;
const focus=(grid,x,y)=>{
        foc=setTimeout(()=>{
        console.log('grid set 2');
        grid[x][y]=2;
    },3000)

    return grid;
}

const clear=()=>{
    console.log("clearing timeout 2",foc);
    clearTimeout(foc);
}
module.exports={focus,clear};