//TODO: instead of making a new array each time just 0 out and use the old one
//TODO: try using some cool array functions like map instead of iterating through the whole thing each time
//TODO: make this in python for practice
//TODO: do some fun stuff with the rules
let grid;
let cols;
let rows;
let resolution = 5;

function make2DArray(cols, rows){
  let arr = new Array(cols);
  for(let i = 0; i<arr.length; i++){
    arr[i] = new Array(rows);
  }
  //fills array randomly with 1 or 0
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      arr[i][j] = floor(random(2));
    }
  }
  return arr;
}

function setup(){
  createCanvas(1600, 800);
  cols = width/resolution;
  rows = height/resolution;
  grid = make2DArray(cols,rows);
}

function draw(){
  background(0);
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let x = i * resolution;
      let y = j * resolution;
      if(grid[i][j] == 1){
        fill(255);
        stroke(0);
        rect(x,y,resolution-1,resolution-1);
      }
    }
  }

  let next = make2DArray(cols, rows);

  //Compute next generation based on grid
  for(let i = 0; i < cols; i++){
    for(let j = 0; j < rows; j++){
      let state = grid[i][j];

      //Count live neighbors
      let sum = 0;
      let neighbors = countNeighbors(grid, i, j);

      //rules
      if(state == 0 && neighbors == 3){
        next[i][j] = 1;
      }
      else if(state == 1 && (neighbors < 2 || neighbors > 3)){
        next[i][j] = 0;
      }
      else{
        next[i][j] = state;
      }
    }
  }
  grid = next;
}

function countNeighbors(grid, x, y){
  let sum = 0;
  for(let i = -1; i < 2; i++){
    for(let j = -1; j < 2; j++){
      let col = (x+i+cols)%cols;
      let row = (y+j+rows)%rows;
      sum += grid[col][row];
    }
  }
  sum -= grid[x][y];
  return sum;
}
