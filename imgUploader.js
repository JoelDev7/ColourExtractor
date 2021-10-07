window.onload = () => {
    //document.getElementById('canvas-container').style.display = "none";
    let image = document.getElementById('input');
    let canvas = document.getElementById('canvas')
    let canvasContainer = document.getElementById('canvas-container')
    image.addEventListener('change', () => {
        let img = image.files[0];
        console.log(img)
        let reader = new FileReader;
        reader.readAsDataURL(img);
        reader.onload = () => {
            let dim = new Image;
            dim.src = reader.result
            dim.onload = () => {
                console.log(dim.width, dim.height)
                APP.canvas.width = dim.width
                APP.canvas.height = dim.height
                if (dim.width < 1024, dim.height < 700) {
                    canvasContainer.style.overflow = "visible"
                }
            }
            canvas.setAttribute('data-src', `${reader.result}`)
            APP.init()
            document.getElementById('canvas-container').style.display = "block";
        }
    })

    let button = document.getElementById('btn')
    button.addEventListener('click', () => {
        //canvas.setAttribute('data-src', '900flores.jpg')
        //APP.init()
    })
}