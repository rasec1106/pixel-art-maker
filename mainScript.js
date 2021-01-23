function drawCanvas(rows,columns){
    let canvas = document.getElementById("gridCanvas");
    canvas.style.setProperty("grid-template-rows",`repeat(${rows},10px)`)
    canvas.style.setProperty("grid-template-columns",`repeat(${columns},10px)`)
    for(let i=0; i<rows*columns;i++){
        let pixel = document.createElement("div");
        pixel.className+= " canvas__pixel";
        pixel.addEventListener('mousedown',(e)=>paintPixel(e,"black"));
        canvas.appendChild(pixel);
    }
};

function paintPixel(event, color){
    let pixel = event.target;
    if(pixel!=historyPaint[historyPaint.length-1])
        historyPaint.push(pixel);   
    pixel.style.setProperty("background-color",color);
}

function stepBack(e) {
    e = e || window.event;
    let code = e.which || e.keyCode;
  
    // press Ctrl + Z
    if (((code === 90 && e.ctrlKey)||e.target == undoButton) && historyPaint.length !== 0) {
      let target = historyPaint.pop();
  
      /* if (!target.countOfFloodFill) {
        // simple clean cell
        cleanCell(target);
      } else {
        // clean after flood fill
        let count = target.countOfFloodFill;
        cleanCell(target);
        for (let i = 0; i < count - 1; i++) {
          target = historyPaint.pop();
          cleanCell(target);
        }
      } */
      target.style.setProperty("background-color","#fff");
    }
  }

drawCanvas(30,30);
let historyPaint = [];
let undoButton = document.getElementById("undoButton");
undoButton.addEventListener("mousedown",stepBack); 
document.addEventListener('keydown', stepBack, false);