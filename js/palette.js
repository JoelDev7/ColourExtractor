let start;
let end;
let currentPalette;
function palette(startColor, endColor, numColors) {
    start = startColor;
    end = endColor;
    let colour1 = document.getElementById('colour1')
    let colour2 = document.getElementById('colour2')
    colour1.style.backgroundColor = startColor;
    colour2.style.backgroundColor = endColor;
    let palette = chroma.scale([`${startColor}`, `${endColor}`]).mode('lch').colors(numColors)
    currentPalette = palette;
    let container = document.querySelector('.palette-container')
    const element = document.querySelectorAll('.color-holder')
    element.forEach((element) => {
        element.remove()
    })
    palette.map((color) => {
        let colorHolder = document.createElement('div')
        colorHolder.style.width = `${100 / numColors}%`
        colorHolder.style.backgroundColor = `${color}`
        colorHolder.setAttribute('class', 'color-holder')
        if (chroma(color).luminance() > .3) {
            colorHolder.setAttribute('class', 'color-holder text-dark')
        }
        colorHolder.innerHTML = `${color}`
        container.append(colorHolder)
    })
}

window.onload = () => {
    palette('#593F62', '#009FB7', 6)
    loadColors()
}


function elementExist() {
    const element = document.querySelectorAll('.color-holder')
    console.log(element.length)
}

function selected() {
    const num = document.getElementById('number').value
    palette(start, end, num)
}

function resetPalette() {
    palette('#593F62', '#009FB7', 6);
    document.getElementById('number').value = 6;
}

function loadColors() {
    if (localStorage.getItem('start') !== null && localStorage.getItem('end') !== null) {
        palette(localStorage.getItem('start'), localStorage.getItem('end'), 6)
    }
}

function saveCurrentPalette() {
    let palettes = {};
    if (localStorage.getItem('savedPalettes') !== null) {
        let aux = {};
        aux[Date.now()] = currentPalette;
        let container = JSON.parse(localStorage.getItem('savedPalettes'));
        const join = Object.assign(container, aux); /* Object.assign() merges two or more objects but 
        it mainstains a reference to the original objects so if you modify one of the original objects
        your object result will be modified too.
        */
        localStorage.setItem('savedPalettes', JSON.stringify(join));
    } else {
        palettes[Date.now()] = currentPalette;
        localStorage.setItem('savedPalettes', JSON.stringify(palettes));
    }
}