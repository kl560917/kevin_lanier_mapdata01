//Followed in class code of mfranz mapbox 
//This data shows the top ten golf courses in the U.S. according to golf digest

const key = 'pk.eyJ1IjoicG9zdHBsYXN0aWMiLCJhIjoiY2tpamJyNm1zMDE0OTJ0czU5cDkyNjE3ciJ9.VRXSaQR1sQoWudM3Bgp9Lg';

const options = {
  lat: 39.329239,
  lng: -82.101257,
  zoom: 2,
  style: 'mapbox://styles/postplastic/ckm2eo8wbakp217l5n95zbvvb',
  pitch: 0
};

const mappa = new Mappa('MapboxGL', key);
let myMap;
let canvas;

function setup() {
  canvas = createCanvas(windowWidth, windowHeight);
  myMap = mappa.tileMap(options);
  myMap.overlay(canvas);
  gcs = loadTable('top_ten_gc_usa.csv','csv','header');
}


function draw() {
 clear();
  fill(255);
 stroke(0);
 strokeWeight(0);
  const zoom = myMap.zoom();
 const athens = myMap.latLngToPixel(39.3292,-82.1013);


  for (let i = 0; i < gcs.getRowCount(); i++) {
    const latitude = Number(gcs.getString(i,'latitude'));
    const longitude = Number(gcs.getString(i,'longitude'));
    const pos = myMap.latLngToPixel(latitude,longitude);
    
         let address = gcs.getString(i,'location');

    
         ellipse(pos.x,pos.y,1 * myMap.zoom(),1 * myMap.zoom());
    strokeWeight(2);
    stroke(255);
    
 if(dist(pos.x,pos.y,mouseX,mouseY) < 1 * myMap.zoom()){
    textSize(25);
   noStroke();
     text(address,pos.x,pos.y);
  }
    
  }
  
  
  
  
  print(zoom);

}


$(window).bind('resize', function(e)
{
  if (window.RT) clearTimeout(window.RT);
  window.RT = setTimeout(function()
  {
    this.location.reload(false); /* false to get page from cache */
  }, 200);
});


