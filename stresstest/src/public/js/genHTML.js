function genHTML(obj) {
  if(!obj.elem) return console.error('Element type not specified');
  const elem = document.createElement(obj.elem);



  if(obj.text) {
    elem.innerText = obj.text;
  }

  if(obj.child) {
    obj.child.remove();
    elem.appendChild(obj.child);
  }

  if(obj.id) {
    elem.id = obj.id;
  }

  if(obj.class) {
    for(let className of obj.class) {
      elem.classList.add(className);
    }
  }



  if(obj.parent && !obj.insertBefore) {
    obj.parent.appendChild(elem);

  }else if(obj.insertBefore === true) {
    const childNodes = obj.parent.childNodes;
    obj.parent.insertBefore(elem, childNodes[0])
  }else if(!obj.parent) {
    document.body.appendChild(elem);
  }


  if(obj.style) {
    for(let style of Object.keys(obj.style)) {
      elem.style[style] = obj.style[style];
    }
  }


  if(obj.attr) {
    for(let attr of Object.keys(obj.attr)) {
      elem.setAttribute(attr, obj.attr[attr]);
    }
  }

  return elem;
}
