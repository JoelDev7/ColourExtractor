function palette(startColor, endColor, numColors) {
    let colour1 = document.getElementById('colour1')
    let colour2 = document.getElementById('colour2')
    colour1.style.backgroundColor = startColor;
    colour2.style.backgroundColor = endColor;
    //console.log(startColor, endColor)
    let palette = chroma.scale([`${startColor}`, `${endColor}`]).mode('lch').colors(numColors)
    let container = document.querySelector('.palette-container')
    palette.map((color) => {
        let colorHolder = document.createElement('div')
        colorHolder.style.width = `${100 / numColors}%`
        colorHolder.style.backgroundColor = `${color}`
        colorHolder.setAttribute('class', 'color-holder')
        colorHolder.innerHTML = `${color}`
        container.append(colorHolder)
    })
}

window.onload = () => {
    palette('#593F62', '#009FB7', 8)
}