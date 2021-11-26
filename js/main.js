const APP = {
  canvas: null,
  ctx: null,
  data: [],
  img: null,
  colors: [],
  init() {
    APP.canvas = document.querySelector('main canvas');
    APP.ctx = APP.canvas.getContext('2d');
    APP.img = document.createElement('img');
    APP.img.src = APP.canvas.getAttribute('data-src');
    //once the image is loaded, add it to the canvas
    APP.img.onload = (ev) => {
      APP.ctx.drawImage(APP.img, 0, 0);
      //call the context.getImageData method to get the array of [r,g,b,a] values
      let imgDataObj = APP.ctx.getImageData(
        0,
        0,
        APP.canvas.width,
        APP.canvas.height
      );
      APP.data = imgDataObj.data; //data prop is an array
      // console.log(APP.data.length, 900 * 600 * 4); //  has 2,160,000 elements
      APP.canvas.addEventListener('mousemove', APP.getPixel);
      APP.canvas.addEventListener('click', APP.addBox);
    };
  },
  getPixel(ev) {
    //as the mouse moves around the image
    // let canvas = ev.target;
    let cols = APP.canvas.width;
    // let rows = canvas.height;
    let { offsetX, offsetY } = ev;
    //call the method to get the r,g,b,a values for current pixel
    let c = APP.getPixelColor(cols, offsetY, offsetX);
    //build a colour string for css
    let clr = `rgb(${c.red}, ${c.green}, ${c.blue})`; //${c.alpha / 255}
    document.getElementById('pixelColor').style.backgroundColor = clr;
    //save the string to use elsewhere
    APP.pixel = clr;
    //now get the average of the surrounding pixel colours
    APP.getAverage(ev);
  },
  getAverage(ev) {
    //create a 41px by 41px average colour square
    //replace everything in the canvas with the original image
    // let canvas = ev.target;
    let cols = APP.canvas.width;
    let rows = APP.canvas.height;
    //remove the current contents of the canvas to draw the image and box again
    APP.ctx.clearRect(0, 0, cols, rows);
    //add the image from memory
    APP.ctx.drawImage(APP.img, 0, 0);
    let { offsetX, offsetY } = ev;
    const inset = 20;
    //inset by 20px as our workable range
    offsetX = Math.min(offsetX, cols - inset);
    offsetX = Math.max(inset, offsetX);
    offsetY = Math.min(offsetY, rows - inset);
    offsetY = Math.max(offsetY, inset);
    //create a 41 x 41 pixel square for the average
    let reds = 0; //total for all the red values in the 41x41 square
    let greens = 0;
    let blues = 0;
    //for anything in the range (x-20, y-20) to (x+20, y+20)
    for (let x = -1 * inset; x <= inset; x++) {
      for (let y = -1 * inset; y <= inset; y++) {
        let c = APP.getPixelColor(cols, offsetY + y, offsetX + x);
        reds += c.red;
        greens += c.green;
        blues += c.blue;
      }
    }
    let nums = 41 * 41; //total number of pixels in the box
    let red = Math.round(reds / nums);
    let green = Math.round(greens / nums);
    let blue = Math.round(blues / nums);
    //create a colour string for the average colour
    let clr = `rgb(${red}, ${green}, ${blue})`;
    //now draw an overlaying square of that colour
    //make the square twice as big as the sample area
    APP.ctx.fillStyle = clr;
    APP.ctx.strokeStyle = '#FFFFFF';
    APP.ctx.strokeWidth = 2;
    //save the average colour for later
    APP.average = clr;
    APP.ctx.strokeRect(offsetX - inset, offsetY - inset, 41, 41);
    APP.ctx.fillRect(offsetX - inset, offsetY - inset, 41, 41);
  },
  getPixelColor(cols, x, y) {
    //see grid.html as reference for this algorithm
    let pixel = cols * x + y;
    let arrayPos = pixel * 4;
    return {
      red: APP.data[arrayPos],
      green: APP.data[arrayPos + 1],
      blue: APP.data[arrayPos + 2],
      alpha: APP.data[arrayPos + 3],
    };
  },
  addBox(ev) {
    //user clicked. Let's add boxes below with the pixel and the average
    let colours = document.querySelector('.colours');
    let pixel = document.createElement('span');
    pixel.className = 'box';
    //pixel.setAttribute('data-label', 'Exact pixel');
    pixel.setAttribute('data-color', chroma(APP.pixel).hex());
    let average = document.createElement('span');
    average.className = 'box';
    //average.setAttribute('data-label', 'Average');
    average.setAttribute('data-color', chroma(APP.average).hex());
    pixel.style.backgroundColor = APP.pixel;
    average.style.backgroundColor = APP.average;
    pixel.addEventListener('click', () => {
      localStorage.setItem('start', pixel.getAttribute('data-color'))
    })
    average.addEventListener('click', () => {
      localStorage.setItem('end', average.getAttribute('data-color'))
    })
    let p = pixel.getAttribute('data-color')
    let a = average.getAttribute('data-color')
    APP.colors.push({ px: p, avg: a })
    // console.log(APP.colors)
    let controlStart = document.createElement('a')
    controlStart.addEventListener('click',
      localStorage.setItem('start', pixel.getAttribute('data-color'))
    )
    controlStart.setAttribute('href', 'javascript:;')
    controlStart.setAttribute('class', 'controls')
    controlStart.innerHTML = 'start'
    let controlEnd = document.createElement('a')
    controlEnd.addEventListener('click',
      localStorage.setItem('end', pixel.getAttribute('data-color'))
    )
    controlEnd.setAttribute('href', 'javascript:;')
    controlEnd.setAttribute('class', 'controls')
    controlEnd.innerHTML = 'end'
    let control1Start = document.createElement('a')
    control1Start.addEventListener('click',
      localStorage.setItem('start', average.getAttribute('data-color'))
    )
    control1Start.setAttribute('href', 'javascript:;')
    control1Start.setAttribute('class', 'controls')
    control1Start.innerHTML = 'start'
    let control1End = document.createElement('a')
    control1End.addEventListener('click',
      localStorage.setItem('end', average.getAttribute('data-color'))
    )
    control1End.setAttribute('href', 'javascript:;')
    control1End.setAttribute('class', 'controls')
    control1End.innerHTML = 'end'
    pixel.append(controlStart)
    pixel.append(controlEnd)
    average.append(control1Start)
    average.append(control1End)
    colours.append(pixel, average);
  },
};

// window.addEventListener('unload', () => {
//   APP.colors.length > 0 ? localStorage.setItem('colors', APP.colors) : localStorage.setItem('colors', null);
//   console.log('unloading')
// })

// window.addEventListener('load', () => {
//   if (localStorage.getItem('colors') !== null) {
//     console.log(localStorage.getItem('colors'));
//   }
//   // console.log('loading');
// })