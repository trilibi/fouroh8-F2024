/*
* 2024-09-25T16:40-5:00
* Nova Solarz
*/

/* --- MAIN -----------------------------------------------------------------------------*/
console.log("woag");

let rowsInput = document.getElementById("rows");
let colsInput = document.getElementById("cols");
let renderDiv = document.getElementById("render");
let rangeInput = document.getElementById("rangeInp");


rowsInput.addEventListener("change", function(e) {
    console.log(e.target.value);
});
colsInput.addEventListener("change", function(e) {
    console.log(colsInput.value);
});

let renderInterval = setInterval(render, 1000);
rangeInput.addEventListener("change", function(e) {
    console.log(rangeInput.value);
    clearInterval(renderInterval);
    renderInterval = setInterval(render, rangeInput.value);

});

const hsl_col_perc = (percent, start, end) => {
    const a = percent / 100,
        b = (end - start) * a,
        c = b + start;
    return 'hsl(' + c + ', 100%, 50%)';
}

/* --- FUNCTIONS ----------------------------------------------------------------------*/
function render() {
    console.log("--- RENDER! ---");
    console.log("rowsInput: " + rowsInput.value.toString());
    console.log("colsInput: " + colsInput.value.toString());
    console.log("rangeInput: " + rangeInput.value.toString());

    renderDiv.innerHTML = "";

    for (let rowIndex = 1; rowIndex <= rowsInput.value; rowIndex++) {
        for (let colIndex = 1; colIndex <= colsInput.value; colIndex++) {

            let checkbox = document.createElement("input");
            checkbox.type = "checkbox";
            checkbox.checked = true;
            checkbox.style.accentColor = "black";
            renderDiv.appendChild(checkbox);

            let randInt = Math.floor(Math.random()*colsInput.value);
            if(randInt+1 >= colIndex) {
                checkbox.style.accentColor = hsl_col_perc(100 - randInt / colIndex * 100, 0, 120);
            }
        }
        renderDiv.appendChild(document.createElement("br"));
    }

}

/*
copied from: https://canvas.unk.edu/courses/48785/discussion_topics/458921

  const hsl_col_perc = (percent, start, end) => {
    const a = percent / 100,
      b = (end - start) * a,
      c = b + start;
    return 'hsl(' + c + ', 100%, 50%)';
  }

        if (colorMode === 'opacity') {
          div.style.opacity = (j + 1) / colCount;
        } else if (colorMode === 'heatmap') {
          div.style.accentColor = hsl_col_perc(100 - rand / colCount * 100, 0, 120);
        } else if (colorMode === 'rainbow') {
          div.style.accentColor = hsl_col_perc((j + 1) / colCount * 100, 0, 360);
        }
*/