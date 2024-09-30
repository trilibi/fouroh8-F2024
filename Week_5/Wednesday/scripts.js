/*
* 2024-09-25T16:40-05:00
* UPDATE: 2024-09-30T16:45-05:00
* Nova Solarz ( it / they / she )
*/

/* --- MAIN -----------------------------------------------------------------------------*/
console.log("woag");

let rowsInput = document.getElementById("rows");
let colsInput = document.getElementById("cols");
let renderDiv = document.getElementById("render");
let rangeInput = document.getElementById("rangeInp");
let sizeInput = document.getElementById("sizeInput");
let themeInput = document.getElementById("themeSelect");
let selectedTheme = null;


rowsInput.addEventListener("change", function(e) {
    console.log(e.target.value);
});
colsInput.addEventListener("change", function(e) {
    console.log(colsInput.value);
});

let renderInterval = setInterval(render, 500);
rangeInput.addEventListener("change", function(e) {
    console.log(rangeInput.value);
    clearInterval(renderInterval);
    renderInterval = setInterval(render, rangeInput.value);
});

themeInput.addEventListener("change", function(e) {
    console.log("THEME CHANGE ----------------------------")
    console.log(e.target.options[e.target.selectedIndex].value);
    selectedTheme = e.target.options[e.target.selectedIndex].value;
});


/* --- FUNCTIONS ----------------------------------------------------------------------*/
const hsl_col_perc = (percent, start, end) => {
    const a = percent / 100,
        b = (end - start) * a,
        c = b + start;
    return 'hsl(' + c + ', 100%, 50%)';
}

function renderSquare(colIndex, colCount, randInt, rowIndex, rowCount) {
    let element = document.createElement("div");
    element.className = "square";
    element.style.width = sizeInput.value + "px";
    element.style.height = sizeInput.value + "px";

    if(randInt >= colIndex) {
        if (!selectedTheme) {
            //    if theme is null
            element.style.backgroundColor = "chartreuse"
        } else if (selectedTheme === "rainbow") {
            element.style.backgroundColor = hsl_col_perc((colIndex + 1) / colCount * 100, 0, 360);
        } else if (selectedTheme === "opacity") {
            element.style.backgroundColor = ((colIndex + 1) / colCount).toString();
        } else if (selectedTheme === "heatmap") {
            element.style.backgroundColor = hsl_col_perc(100 - randInt / colCount * 100, 0, 120);
        }
    }
    return element;
}

function renderCheckbox(colIndex, colCount, randInt, rowIndex, rowCount) {
    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = true;
    checkbox.style.accentColor = "black";
    checkbox.style.width = sizeInput.value + "px";
    checkbox.style.height = sizeInput.value + "px";

    if(randInt >= colIndex) {
        if (!selectedTheme) {
            //    if theme is null
            checkbox.style.accentColor = "deeppink"
        } else if (selectedTheme === "rainbow") {
            checkbox.style.accentColor = hsl_col_perc((colIndex + 1) / colCount * 100, 0, 360);
        } else if (selectedTheme === "opacity") {
            checkbox.style.opacity = ((colIndex + 1) / colCount).toString();
        } else if (selectedTheme === "heatmap") {
            checkbox.style.accentColor = hsl_col_perc(100 - randInt / colCount * 100, 0, 120);
        }
    }
    return checkbox;
}

function render() {
    // console.log("--- RENDER! ---");
    // console.log("rowsInput: " + rowsInput.value.toString());
    // console.log("colsInput: " + colsInput.value.toString());
    // console.log("rangeInput: " + rangeInput.value.toString());
    renderDiv.innerHTML = "";
    let colCount = colsInput.value;
    let rowCount = rowsInput.value;

    for (let rowIndex = 1; rowIndex <= rowCount; rowIndex++) {
        let randInt = Math.floor(Math.random() * colCount);
        for (let colIndex = 1; colIndex <= colCount; colIndex++) {

            // render checkbox
            // let element = renderCheckbox(colIndex, colCount, randInt, rowIndex, rowCount);
            let element = renderSquare(colIndex, colCount, randInt, rowIndex, rowCount);

            renderDiv.appendChild(element);
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