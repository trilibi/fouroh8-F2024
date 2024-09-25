var rowsInput = document.getElementById("rows");
var colsInput = document.getElementById("cols");
var rendering = document.getElementById("rendering");
var rangeInput = document.getElementById("rangeInput");

rowsInput.addEventListener('change', function() {console.log(rowsInput.value)});
colsInput.addEventListener('change', function (e) {console.log(e.target.value)});
rangeInput.addEventListener('change', function(e){
    console.log(e.target.value); 
    clearInterval(renderInterval);
    renderInterval = setInterval(render, e.target.value);
});

function render() {
    rendering.innerHTML = '';

    for(r = 1; r <= rowsInput.value; r++){
        for(c = 1; c <= colsInput.value; c++){
            createChecked(c);
        }
        rendering.appendChild (document.createElement('br'));
    }
}

function createChecked(v) {
    var checkBox = document.createElement('input');

    checkBox.type = 'checkbox';
    checkBox.checked = true;
    rendering.appendChild(checkBox);

    var randomNumber = Math.floor(Math.random() * colsInput.value);

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

      /*  if (colorMode === 'opacity') {
          div.style.opacity = (j + 1) / colCount;
        } else if (colorMode === 'heatmap') {
          div.style.accentColor = hsl_col_perc(100 - rand / colCount * 100, 0, 120);
        } else if (colorMode === 'rainbow') {
          div.style.accentColor = hsl_col_perc((j + 1) / colCount * 100, 0, 360);
        }*/
          
var renderInterval = setInterval(render, 1000);
clearInterval();



