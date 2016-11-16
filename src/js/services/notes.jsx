import uuid from "services/uuid";
import util from "services/util";
import Notification from "components/hoc/notification";

const DEFAULT_FLASH_TIME = 2500;
const REMOVAL_DELAY      = 800;

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

function add(component, options) {
  let note_id   = uuid();
  let container = util.dom.create("div");
  container.setAttribute("data-note-id", note_id);

  // render the modal into the newly created container
  ReactDOM.render(<Notification options={options}>{component}</Notification>, container);

  // add that container to the modal root
  mountpoint.appendChild(container);

  stack.push({id: note_id, container});

  return note_id;
}

function remove(target_id, callback) {
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

  // prepare for removal
  let removal = {timeout: setTimeout(fade, REMOVAL_DELAY)};

  function exec() {
    // get the dom node from the react component
    let node = ReactDOM.findDOMNode(container)

    // unmount the react component
    ReactDOM.unmountComponentAtNode(node);

    // remove the parent node (container)
    node.parentNode.removeChild(node);

    if("function" === typeof removal.closed) removal.closed();
  }

  function closer(closed) {
    removal.closed = closed;
  }

  // fade starts the motion ui animation
  function fade() {
    // add the motion ui classes that will "lift" it off screen
    util.dom.fx.slideOut(container).then(exec);
  }

  // remove this item and return the id
  stack.splice(index, 1);

  function abort() {
    clearTimeout(removal.timeout);
    stack.push({id: target_id, container});
  }

  if("function" === typeof callback)
    callback(abort, closer);

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
