
let width=650;
let height=500;
let ctx=document.getElementById("canvas1").getContext("2d");
let ctx2=document.getElementById("canvas2").getContext("2d");

$("#getImgBtn").on("click", getImg);
$("#getImage").on("change", uploadImg);
$("#saveImg").on("click", saveImg);
$("#filter_byn").on("click", imgByN);
$("#sliderByN").on("change", imgByN);
$("#filter_gris").on("click", imgGris);
$("#sliderGris").on("change", imgGris);
$("#filter_sepia").on("click", imgSepia);
$("#sliderSepia").on("change", imgSepia);
$("#filter_blur").on("click", imgBlur);
$("#filter_negativo").on("click", imgNegativa);
$("#filter_verde").on("click", imgVerde);
$("#filter_rojo").on("click", imgRojo);
$("#filter_azul").on("click", imgAzul);
$("#filter_amarillo").on("click", imgAmarillo);


function getImg(){
  ctx=document.getElementById('canvas1').getContext("2d");
  routeImg=document.getElementById('getImage').files[0],
  url=window.URL || window.webkitURL,
  src = url.createObjectURL(routeImg);
  return src;
}


/*CARGAR IMAGEN AL CANVAS1*/

function uploadImg(){
  let img=new Image();
  img.src = getImg();
  img.onload = function(){
    ctx.drawImage(this,0,0,width,height);
  }
}

/*OBTIENE COLORES*/
function getRed(imageData,x,y){
  index = (x+y*imageData.width)*4;
  return imageData.data[index];
}

function getGreen(imageData,x,y){
  index = (x+y*imageData.width)*4;
  return imageData.data[index+1];
}

function getBlue(imageData,x,y){
  index = (x+y*imageData.width)*4;
  return imageData.data[index+2];
}


/*MODIFICA EL PIXEL*/

function setPixel(imageData,x,y,r,g,b){
  index = (x+y*imageData.width)*4;
  imageData.data[index]=r;
  imageData.data[index+1]=g;
  imageData.data[index+2]=b;
}


/*FILTRO BLANCO Y NEGRO*/

function imgByN(){
  imageData = ctx.getImageData(0, 0, width, height);
  let sliderByN = $("#sliderByN").val();
  for (x=0; x < width; x++){
    for (y=0; y < height; y++){
      r = getRed(imageData, x, y);
      g = getGreen(imageData, x, y);
      b = getBlue(imageData, x, y);
      promedio = (r+g+b)/4;
      if (promedio >= sliderByN) {
        console.log (sliderByN);
        promedio = 255;
      }
      else {
        promedio = 0;
      }
      setPixel(imageData, x, y, promedio, promedio, promedio);
    }
  }
  ctx2.putImageData(imageData, 0, 0);
}


/*FILTRO ESCALA DE GRISES*/

function imgGris(){
  let sliderGris = $("#sliderGris").val();
  imageData = ctx.getImageData(0, 0, width, height);
  for (x=0; x < width; x++){
    for (y=0; y < height; y++){
      r = getRed(imageData, x, y);
      g = getGreen(imageData, x, y);
      b = getBlue(imageData, x, y);
      promedio = (r+g+b)/sliderGris;
      setPixel(imageData, x, y, promedio, promedio, promedio);
    }
  }
  ctx2.putImageData(imageData, 0, 0);
}


/*FILTRO SEPIA*/

function imgSepia(){
  let sliderSepia = $("#sliderSepia").val();
  imageData = ctx.getImageData(0, 0, width, height);
  for (x=0; x < width; x++){
    for (y=0; y < height; y++){
      r = getRed(imageData, x, y);
      g = getGreen(imageData, x, y);
      b = getBlue(imageData, x, y);
      r = ( r * .400 + (sliderSepia*0.100)) + ( g *.700 + (sliderSepia*0.100)) + ( b * .200 + (sliderSepia*0.100));
      g = ( r * .250 + (sliderSepia*0.100)) + ( g *.590 + (sliderSepia*0.100)) + ( b * .080 + (sliderSepia*0.100));
      b = ( r * .180 + (sliderSepia*0.100)) + ( g *.440 + (sliderSepia*0.100)) + ( b * .040 + (sliderSepia*0.100));
      setPixel(imageData, x, y, r, g, b);
    }
  }
  ctx2.putImageData(imageData, 0, 0);
}

/*FILTRO BLUR*/

function imgBlur(){
let imageData = ctx.getImageData(0,0,width,height);
let px = imageData.data;
let tmpPx = new Uint8ClampedArray(px.length);
tmpPx.set(px);
for (i=0; i<px.length; i++) {
   if (i % 4 === 3) {
     continue;
   }
   px[i] = ( tmpPx[i]
      + (tmpPx[i - 8] || tmpPx[i])
      + (tmpPx[i + 8] || tmpPx[i])
      + (tmpPx[i - 8 * imageData.width] || tmpPx[i])
      + (tmpPx[i + 8 * imageData.width] || tmpPx[i])
      + (tmpPx[i - 8 * imageData.width - 8] || tmpPx[i])
      + (tmpPx[i + 8 * imageData.width + 8] || tmpPx[i])
      + (tmpPx[i + 8 * imageData.width - 8] || tmpPx[i])
      + (tmpPx[i - 8 * imageData.width + 8] || tmpPx[i])
    )/9;
}
ctx2.putImageData(imageData,0,0);
}

/*FILTRO NEGATIVO*/

function imgNegativa(){
  imageData = ctx.getImageData(0, 0, width, height);
  for (x=0; x < width; x++){
    for (y=0; y < height; y++){
      r = getRed(imageData, x, y);
      g = getGreen(imageData, x, y);
      b = getBlue(imageData, x, y);
      r = 255 - r;
      g = 255 - g;
      b = 255 - b;
      setPixel(imageData, x, y, r, g, b);
    }
  }
  ctx2.putImageData(imageData, 0, 0);
}

/*FILTRO VERDE*/
function imgVerde(){
  imageData = ctx.getImageData(0,0,width,height);
  for (x=0; x<width; x++){
    for (x=0; x < width; x++){
      for (y=0; y < height; y++){
        r = getRed(imageData, x, y);
        g = getGreen(imageData, x, y);
        b = getBlue(imageData, x, y);
        r = ( r * .2 ) + ( g *.2 ) + ( b * .2 );
        g = ( r * .9 ) + ( g *.9 ) + ( b * .9 );
        b = ( r * .2 ) + ( g *.2 ) + ( b * .2 );
        setPixel(imageData, x, y, r, g, b);
      }
    }
  }
  ctx2.putImageData(imageData,0,0);
}


/*FILTRO ROJO*/
function imgRojo(){
  imageData = ctx.getImageData(0,0,width,height);
  for (x=0; x<width; x++){
    for (x=0; x < width; x++){
      for (y=0; y < height; y++){
        r = getRed(imageData, x, y);
        g = getGreen(imageData, x, y);
        b = getBlue(imageData, x, y);
        r = ( r * .9 ) + ( g *.9 ) + ( b * .9 );
        g = ( r * .2 ) + ( g *.2 ) + ( b * .2 );
        b = ( r * .2 ) + ( g *.2 ) + ( b * .2 );
        setPixel(imageData, x, y, r, g, b);
      }
    }
  }
  ctx2.putImageData(imageData,0,0);
}


/*FILTRO AZUL*/
function imgAzul(){
  imageData = ctx.getImageData(0,0,width,height);
  for (x=0; x<width; x++){
    for (x=0; x < width; x++){
      for (y=0; y < height; y++){
        r = getRed(imageData, x, y);
        g = getGreen(imageData, x, y);
        b = getBlue(imageData, x, y);
        r = ( r * .2 ) + ( g *.2 ) + ( b * .2 );
        g = ( r * .2 ) + ( g *.2 ) + ( b * .2 );
        b = ( r * .9 ) + ( g *.9 ) + ( b * .9 );
        setPixel(imageData, x, y, r, g, b);
      }
    }
  }
  ctx2.putImageData(imageData,0,0);
}

/*FILTRO AMARILLO*/
function imgAmarillo(){
  imageData = ctx.getImageData(0,0,width,height);
  for (x=0; x<width; x++){
    for (x=0; x < width; x++){
      for (y=0; y < height; y++){
        r = getRed(imageData, x, y);
        g = getGreen(imageData, x, y);
        b = getBlue(imageData, x, y);
        r = ( r * .9 ) + ( g *.9 ) + ( b * .9 );
        g = ( r * .9 ) + ( g *.9 ) + ( b * .9 );
        b = ( r * .2 ) + ( g *.2 ) + ( b * .2 );
        setPixel(imageData, x, y, r, g, b);
      }
  }
}
  ctx2.putImageData(imageData,0,0);
}


/*GUARDAR IMAGEN*/
function saveImg(){
      let link = window.document.createElement( 'a' );
      let  url = canvas2.toDataURL();
      let filename = 'NuevaImagen.png';
      link.setAttribute( 'href', url );
      link.setAttribute( 'download', filename );
      window.document.body.appendChild( link );
      link.click();
      window.document.body.removeChild( link );
}
