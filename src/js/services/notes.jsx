import uuid from "./uuid";
import util from "./util";
import Notification from "../components/hoc/notification";

const DEFAULT_FLASH_TIME = 2500;

/* Notes service
 *
 *
 * This service allows components, routes, and any other module to add notifications
 * to the screen. Each call to `add` returns a unique id string similar to the Event
 * class' `on` function.
 *
 * The notifications themselves are then added to the single NotificationBar instance
 * which gets mounted during application startup.
 */

let stack      = [];
let mountpoint = false;

function add(component) {
  let note_id   = uuid();
  let container = util.dom.create("div");
  container.setAttribute("data-note-id", note_id);

  // render the modal into the newly created container
  ReactDOM.render(<Notification>{component}</Notification>, container);

  // add that container to the modal root
  mountpoint.appendChild(container);

  stack.push({id: note_id, container});

  return note_id;
}

function remove(target_id) {
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

  return target_id;
}

function flash(component, time = DEFAULT_FLASH_TIME) {
  let id = add(component);

  setTimeout(function() { remove(id); }, time);

  return true;
}

function mount(target) {
  mountpoint = target;
}

export default {add, remove, mount, flash};
