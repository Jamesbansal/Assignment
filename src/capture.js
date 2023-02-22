const capture=(grid,x,y)=>{
    grid[x][y]=3;
    return grid;
}
module.exports={capture};