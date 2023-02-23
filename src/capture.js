let cap=undefined;
const capture=(grid,x,y)=>{
        cap=setTimeout(()=>{
        console.log('grid set');
        grid[x][y]=3;
    },2000)
    
    return grid;
}
const clear=()=>{
    console.log("clearing timeout",cap);
    clearTimeout(cap);
}
module.exports={capture,clear};