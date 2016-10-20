function px(amt) {
  return `${amt}px`;
}

function remove(element) {
  return element.parentNode.removeChild(element);
}

function contains(target, child) {
  let head = child.parentNode;

  while(head != null) {
    if (head == target) return true;
    head = head.parentNode;
  }

  return false;
}

function create(tag, {style} = {}) {
  let element = document.createElement(tag);

  element.setAttribute("util-dom", "true");

  if(!style)
    return element;

  let rules = Object.keys(style);

  for(let i = 0, c = rules.length; i < c; i++) {
    let rule  = rules[i];
    element.style[rule] = style[rule];
  }

  return element;
}

export default {contains, create, px, remove};
