import classes from "services/util/dom/classes";
import fx from "services/util/dom/fx";

function remove(element : HTMLElement) : Node {
  return element.parentNode.removeChild(element);
}

function contains(target : HTMLElement, child : HTMLElement) : boolean {
  let head = child.parentNode;

  while(head != null) {
    if (head == target) return true;
    head = head.parentNode;
  }

  return false;
}

function create(tag : string, style? : React.CSSProperties) : HTMLElement {
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

export default {classes, contains, create, remove, fx};
