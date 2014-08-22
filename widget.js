var ns = ns || {};
ns.Widget = new Widget(['pic1.jpg','pic2.jpg','pic3.jpg'],1);
//ns.Widget = new Widget();
//ns.Widget = new Widget(['pic1.jpg','pic2.jpg','pic3.jpg'],2);

function Widget(images,mode) {

  var w = mode === 1 ? '70%' : '100%';
  //var w = '70%';
  var h = "400px";
  var css = document.createElement('style');
  css.innerHTML = ".viewer .hide{display:none;} .viewer .active{display:block;} .clearfix:after { content: '.'; display: block; clear: both; visibility: hidden; line-height: 0; height: 0; }";

  var container = document.createElement('div');
  var viewer = document.createElement('div');
  var thumb = document.createElement('div');
  
  var nodes;

  container.style["width"]="1000px";
  container.style["height"]=h;
  container.style.margin="20px";
  container.style.overflow="hidden";
      
  viewer.style["width"]=w;
  viewer.style["height"]=h; 
  viewer.className = "viewer clearfix";
  viewer.style.float='right';
  //viewer.style.overflow="hidden";
  buildImageTags(images,viewer);
  
  
  thumb.style["width"] = '29%';
  thumb.style["height"] = '100%';
  thumb.style.float="left";
  thumb.style.overflowY = "scroll";
  thumb.className = "clearfix";
  buildImageTags(images,thumb);
  
  //  element.addEventListener('click', this.onclick2.bind(this), false); // Trick   
  container.appendChild(thumb);
  
  
  container.appendChild(viewer);
  
  nodes = viewer.getElementsByTagName('img');

  function buildImageTags(images,parent) {
    var imgElement = [];
    for ( var i = 0; i< images.length; i++) {
      imgElement[i] = document.createElement('img');
      imgElement[i].src = images[i];
      //imgElement[i].style['height'] = '100%';
      imgElement[i].style['width'] = '100%';
      imgElement[i].dataset.num = i;
      i === 0 ? imgElement[i].className = 'active' : imgElement[i].className = 'hide';
      parent.appendChild(imgElement[i]);      
    }
  }
  
  var getIndexOfActive = function(nodes) {
    for (var i =0; i< nodes.length; i++) {
      if (nodes[i].className === "active") {
        return i;
      }
    }
  }

  var toggleClass = function(node) {
    if (node.className == 'active') {
      node.className = 'hide';
    }
    else {
      node.className = 'active';
    }
  }

  function sendToMain() {
    var id = this.dataset.num;
    var act = getIndexOfActive(nodes);
    
    if ( id !== act ) {
      toggleClass(nodes[act]);
      toggleClass(nodes[id]);
    }
  }
  
  var rotateImg = function() {
    var active = getIndexOfActive(nodes);
    toggleClass( nodes[active] );
    active = (active + 1) % nodes.length;
    toggleClass( nodes[active] );
  }
 
  itags = thumb.getElementsByTagName('img');
  
  for (var i = 0; i< itags.length; i++) {
    itags[i].onclick = sendToMain;
  }
    
  viewer.onclick = rotateImg;

  document.head.appendChild(css); 
  document.body.appendChild(container); 
}  