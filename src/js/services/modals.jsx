import uuid from "./uuid";
import util from "./util";
import Viewport from "./window"
import Modal from "../components/hoc/modal"

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

  stack.push({id, container});

  document.body.style.overflow = "hidden";

  return id;
}

function close(target_id) {
  let found = null;

  for(let i = 0, c = stack.length; i < c; i++) {
    let {id, container} = stack[i];

    if(target_id !== id) continue;

    found = {container, index: i};
    break;
  }

  if(found === null)
    return -1;

  let {index, container} = found;

  // get the dom node from the react component
  let node = ReactDOM.findDOMNode(container)

  // unmount the react component
  ReactDOM.unmountComponentAtNode(node);

  // remove the parent node (container)
  node.parentNode.removeChild(node);

  // remove this item and return the id
  stack.splice(index, 1);

  if(stack.length === 0)
    document.body.style.overflow = "";

  return target_id;
}

function closeOpen(e) {
  let {target} = e;

  // loop over our open modals closing those that are not associated with this event
  for(let i = 0, count = stack.length; i < count; i++) {
    let {container, id} = stack[i];
    let node  = ReactDOM.findDOMNode(container);

    // if this node is inside the target of the click - continue
    if(util.dom.contains(node, target)) continue;

    // otherwise close it
    close(id);
  }

  return true;
}

function checkEscape({keyCode: key}) {
  return key === ESCAPE && stack.length >= 1 ? close(stack[0].id) : true;
}

function mount(target) {
  root = target;

  for(let i = 0, c = view_events.length; i < c; i++) {
    Viewport.off(view_events[i]);
  }

  view_events = [
    Viewport.on("isoclick", closeOpen),
    Viewport.on("keyup", checkEscape)
  ];
}

export default {open, close, mount};
