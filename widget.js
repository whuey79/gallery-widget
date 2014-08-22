var ns = ns || {};  // create namespace
ns.Widget1 = new Widget(['pic1.jpg', 'pic2.jpg', 'pic3.jpg'],1);  // create Thumbnail Widget
ns.Widget2 = new Widget(['pic4.jpg', 'pic5.jpg', 'pic6.jpg'],2);  // create Single Image Widget

ns.Widget3 = new Widget(['pic1.jpg', 'pic2.jpg', 'pic3.jpg', 'pic4.jpg', 'pic5.jpg', 'pic6.jpg'],1);  // create Single Image Widget

/*
* Creates a Gallery Widget - Currently shows 3 images, but should continue scaling images > 3 
* @param {array} images - array of image path and names (assume in same directory)
* @param {int} mode - 1 = Thumbnail mode, 2 = Single Image Widget
*/
function Widget(images,mode) {

  var defaultWidth = mode === 1 ? '70%' : '100%',
      defaultHeight = mode === 1 ? "400px" : '100%',
      css = document.createElement('style'),
      container = document.createElement('div'),
      viewer = document.createElement('div'),
      thumb = document.createElement('div'),
      nodes,itags;
  
  // create style tag and add a couple classes for active and hidden attributes
  // not sure if it would interfere with on page classes (maybe use more abstract naming)
  css.innerHTML = ".viewer .hide{display:none;} .viewer .active{display:block;}";
  
  // set defaults styles for container (possibly change to init function in future)
  container.style["width"]="1000px";
  container.style["height"]=defaultHeight;
  container.style.margin="20px";
  container.style.overflow="hidden";

  // default main viewer  
  viewer.style["width"]=defaultWidth;
  viewer.style["height"]=defaultHeight; 
  viewer.className = "viewer";
  viewer.style.float='left';
  buildImageTags(images,viewer);

  // default thumbnail viewer  
  thumb.style["width"] = '29%';
  thumb.style["height"] = '100%';
  thumb.style.float="right";
  thumb.style.overflowY = "scroll";
  buildImageTags(images,thumb);

  // add event handler click for thumbnails or main viewer
  // I decided to use .onclick to preserve 'this' from trigger element
  if (mode === 1) {   
    itags = thumb.getElementsByTagName('img');
  
    for (var i = 0; i< itags.length; i++) {
      itags[i].onclick = sendToMain;
    }
    
    // create parent/child tree for thumb
    container.appendChild(thumb);
  }
  else {
    viewer.onclick = rotateImg;
  }

  // cache node list of viewer img tags
  nodes = viewer.getElementsByTagName('img');
  
  // create parent/child tree for viewer
  container.appendChild(viewer); 

  // append to DOM at the end for optimization
  document.head.appendChild(css); 
  document.body.appendChild(container); 

  // takes image array from constructor and builds image elements
  function buildImageTags(images,parent) {
    var imgElement = [];
    for ( var i = 0; i< images.length; i++) {
      imgElement[i] = document.createElement('img');
      imgElement[i].src = images[i];
      imgElement[i].style['width'] = '100%';
      imgElement[i].dataset.num = i;
      i === 0 ? imgElement[i].className = 'active' : imgElement[i].className = 'hide';
      parent.appendChild(imgElement[i]);      
    }
  }
  
  // returns index of active class in viewer
  function getIndexOfActive(nodes) {
    for (var i =0; i< nodes.length; i++) {
      if (nodes[i].className === "active") {
        return i;
      }
    }
  }

  // toggle class between active and hide
  function toggleClass(node) {
    if (node.className === 'active') {
      node.className = 'hide';
    }
    else {
      node.className = 'active';
    }
  }

  // uses data attribute to determine which thumb and viewer match
  function sendToMain() {
    var dataNum = this.dataset.num;
    var act = getIndexOfActive(nodes);
    
    if ( dataNum !== act ) {
      toggleClass(nodes[act]);
      toggleClass(nodes[dataNum]);
    }
  }
  
  // rotate image in viewer
  function rotateImg() {
    var active = getIndexOfActive(nodes);
    toggleClass( nodes[active] );
    active = (active + 1) % nodes.length;
    toggleClass( nodes[active] );
  }
}  