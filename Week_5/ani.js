var rowsInput = document.getElementById("rows");
var colsInput = document.getElementById("cols");
var rendering = document.getElementById("rendering");
var rangeInput = document.getElementById("rangeInput");
var sizeInput = document.getElementById("sizeInput");
var themeSelect = document.getElementById("themeSelect");
var selectedTheme = null;
var userName = window.localStorage.getItem("name");

const isLocalStorageEmpty = (item) => {
    if(!item || item == 'null'){
        return true; 
    }

    return false;
}

if(isLocalStorageEmpty(userName)){
    window.localStorage.setItem("name", "Not Jake")
}

console.log(isLocalStorageEmpty(userName));

rowsInput.addEventListener('change', function() {
    window.localStorage.setItem('rows', rowsInput.value);
});
rowsInput.value = window.localStorage.getItem('rows');
colsInput.addEventListener('change', function (e) {console.log(e.target.value)});

var nameObject = {name: "Jake"};
console.log(JSON.stringify(nameObject));


rangeInput.addEventListener('change', function(e){
    clearInterval(renderInterval);
    renderInterval = setInterval(render, e.target.value);
});

themeSelect.addEventListener("change", function(e){
    selectedTheme = e.target.options[e.target.selectedIndex].value;
});


function render() {
    rendering.innerHTML = '';
    var colsCount = colsInput.value;

    for(r = 1; r <= rowsInput.value; r++){
        for(c = 1; c <= colsCount; c++){
            createChecked(c, colsCount);
        }
        rendering.appendChild (document.createElement('br'));
    }
}

function createSquare(v, colsCount){
    var element = document.createElement('div');
    element.type = 'checkbox';
    element.checked = true;
    element.style.width = sizeInput.value + 'px';
    element.style.height = sizeInput.value + 'px';

    changeElementTheme(selectedTheme, element, v, randomNumber, colsCount);

    rendering.appendChild(element);
    var randomNumber = Math.floor(Math.random() * colsCount);
}

//I didn't realize I made this below
function styleElement(element, rand, colIndex, cols_count) {
    switch(theme){
        case 'rainbow':
            element.style.accentColor = hsl_col_perc((colNum + 1) / colsInput.value * 100, 0, 360);
            break;

        case 'opacity':
            element.style.opacity = (colNum) / cols_count;
            break;

        case 'heatmap':
            element.style.accentColor = hsl_col_perc(100 - random / colNum * 100, 0, 120);
            break;
    }
}

function createChecked(v, colsCount) {
    var checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.checked = true;
    checkBox.style.width = sizeInput.value + 'px';
    checkBox.style.height = sizeInput.value + 'px';

    changeTheme(selectedTheme, checkBox, v, randomNumber, colsCount);

    rendering.appendChild(checkBox);
    var randomNumber = Math.floor(Math.random() * colsCount);

    if (randomNumber >= v){
        checkBox.style.accentColor = hsl_col_perc(100 - randomNumber / v * 100, 0, 120);
    }
}

const hsl_col_perc = (percent, start, end) => {
    const a = percent / 100,
      b = (end - start) * a,
      c = b + start;
    return 'hsl(' + c + ', 100%, 50%)';
  }

//This is the best one 
const changeElementTheme = (theme, element, colNum, random, cols_count) => {
    switch(theme){
        case 'rainbow':
            element.style.backgroundColor = hsl_col_perc((colNum + 1) / colsInput.value * 100, 0, 360);
            element.style.accentColor = hsl_col_perc((colNum + 1) / colsInput.value * 100, 0, 360);

            break;

        case 'opacity':
            element.style.opacity = (colNum) / cols_count;
            break;

        case 'heatmap':
            element.style.backgroundColor = hsl_col_perc(100 - random / colNum * 100, 0, 120);
            element.style.accentColor = hsl_col_perc(100 - random / colNum * 100, 0, 120);
            break;
        default:
            element.style.backgroundColor = "black";
            break;
    }
}

var renderInterval = setInterval(render, 1000);
clearInterval();



