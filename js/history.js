window.onload = () => {
    loadPalettes()
}


function loadPalettes() {
    let dates;
    let values;
    if (localStorage.getItem('savedPalettes') !== null) {
        let palettes = JSON.parse(localStorage.getItem('savedPalettes'));
        dates = Object.keys(palettes);
        values = Object.values(palettes);
        let container = document.querySelector('.container');
        values.forEach((element, index) => {


            let generalCont = document.createElement('div');
            generalCont.setAttribute('class', 'gen-cont');
            let date = document.createElement('span');
            let paletteCont = document.createElement('div');
            let formatedDate = moment(dates[index], "x").format("DD MMM YYYY hh:mm a");
            //console.log(dates[index]);
            date.innerHTML = formatedDate;
            values[index].forEach(color => {
                let colorCont = document.createElement('div');
                let hexcode = document.createElement('span');
                hexcode.innerHTML = color
                colorCont.setAttribute('class', 'color-box col-cont');
                if (chroma(color).luminance() > .3) {
                    colorCont.setAttribute('class', 'color-box col-cont text-dark')
                }
                hexcode.addEventListener('click', () => {
                    const col = hexcode.innerHTML;
                    navigator.clipboard.writeText(hexcode.innerHTML);
                    hexcode.innerHTML = "Copied!"
                    setTimeout(() => {
                        hexcode.innerHTML = col;
                    }, 700);
                });
                colorCont.addEventListener('click', () => {
                    const col = hexcode.innerHTML;
                    navigator.clipboard.writeText(hexcode.innerHTML);
                    hexcode.innerHTML = "Copied!"
                    setTimeout(() => {
                        hexcode.innerHTML = col;
                    }, 700);
                });
                colorCont.style.backgroundColor = color;
                colorCont.style.width = `${100 / values[index].length}%`;
                paletteCont.setAttribute('class', 'pal-cont')
                paletteCont.append(colorCont);
                colorCont.append(hexcode);
            });
            generalCont.append(date);
            generalCont.append(paletteCont);

            container.append(generalCont);
        });
    }
}