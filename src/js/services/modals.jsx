import uuid from "services/uuid";
import util from "services/util";
import Modal from "components/hoc/modal"
import {services} from "hoctable"

import * as React from "react";
import * as ReactDOM from "react-dom";

let root        = null;
let stack       = [];
let view_events = [];
const ESCAPE    = 27;

function open(component, options) {
  let id        = uuid();
  let modal     = (<Modal options={options}>{component}</Modal>);
  let container = util.dom.create("div");

  container.setAttribute("data-modal-id", id);

  // render the modal into the newly created container
  ReactDOM.render(modal, container);

  // add that container to the modal root
  root.appendChild(container);

  if(stack.length !== 0)
    stack[0].container.style.display = "none";

  stack.push({id, container, options});

  document.body.style.overflow = "hidden";

  return id;
}

function close(target_id) {
  let found = null;

  for(let i = 0, c = stack.length; i < c; i++) {
    let {id, container, options} = stack[i];

    if(target_id !== id) continue;

    found = {options, container, index: i};
    break;
  }

  if(found === null)
    return -1;

  let {index, container, options} = found;

  // get the dom node from the react component
  let node = ReactDOM.findDOMNode(container)

  // unmount the react component
  ReactDOM.unmountComponentAtNode(node);

  // remove the parent node (container)
  node.parentNode.removeChild(node);

  if(index >= 1)
    stack[index - 1].container.style.display = "block";

  // remove this item and return the id
  stack.splice(index, 1);

  if(stack.length === 0)
    document.body.style.overflow = "";

  if(!options || !options.actions)
    return target_id;

  let {actions} = options;

  if("function" === typeof actions.closed) actions.closed();

  return target_id;
}

function closeOpen(e) {
  let {target} = e;
  if(stack.length === 0) return;

  let {container, id} = stack[stack.length - 1];
  let node  = ReactDOM.findDOMNode(container);

  // if this node is inside the target of the click - continue
  if(util.dom.contains(node, target)) return;

  // otherwise close it
  close(id);
  return true;
}

function checkEscape({keyCode: key}) {
  let {length: latest} = stack;
  return key === ESCAPE && stack.length >= 1 ? close(stack[latest - 1].id) : true;
}

function mount(target) {
  root = target;

  for(let i = 0, c = view_events.length; i < c; i++) {
    services.Viewport.off(view_events[i]);
  }

  view_events = [
    services.Viewport.on("isoclick", closeOpen),
    services.Viewport.on("keyup", checkEscape)
  ];
}

export default {open, close, mount};
