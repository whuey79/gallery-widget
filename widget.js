var ns = ns || {};
ns.Widget = new Widget();

function Widget(images,mode) {
  var container = document.createElement('div');
  var viewer = document.createElement('div');

  container.style["width"]="1000px";
  container.style["height"]="400px";
  
  
  var w = '800px';
  var h = '400px';
  viewer.id="viewer";  
  viewer.style["width"]=w;
  viewer.style["height"]=h; 
  viewer.innerHTML = '<img src = "pic1.PNG" style="width:100%" class="active" id="p1"><img src = "pic2.PNG" style="width:100%" class="hide" id="p2"><img src = "pic3.PNG" style="width:100%" class="hide" id="p3">';

//  element.addEventListener('click', this.onclick2.bind(this), false); // Trick   

  container.appendChild(viewer);

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

  var rotateImg = function() {
    var nodes = this.getElementsByTagName('img');
    var active = getIndexOfActive(nodes);
    toggleClass( nodes[active] );
    active = (active + 1) % nodes.length;
    toggleClass( nodes[active] );
  }
  
  viewer.onclick = rotateImg;
  //document.body.appendChild(viewer); 
  document.body.appendChild(container); 
}  