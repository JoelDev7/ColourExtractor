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
                if (dim.width < 1024 || dim.height < 610) {
                    canvasContainer.style.overflow = "visible"
                } else {
                    canvasContainer.style.overflow = "scroll"
                }
            }
            canvas.setAttribute('data-src', `${reader.result}`)
            APP.init()
            document.getElementById('canvas-container').style.display = "block";
        }
    })
    canvas.setAttribute('data-src', 'example.jpg')
    APP.init()
    APP.canvas.width = 1024
    APP.canvas.height = 600;
    document.getElementById('canvas-container').style.display = "block";
    canvasContainer.style.overflow = "hidden"
}