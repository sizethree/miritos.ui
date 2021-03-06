import uuid from "services/uuid";
import util from "services/util";
import Notification from "components/hoc/notification";

import * as ReactDOM from "react-dom";
import * as React from "react";

const DEFAULT_FLASH_TIME = 2500;
const REMOVAL_DELAY      = 800;

let stack      = [];
let mountpoint = false;

/**
 * This function takes a react component and will add it into the `notes` layer.
 *
 * @method add
 */
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

/**
 * This function takes a react component and will add it into the `notes` layer.
 *
 * @method remove
 */
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

function info(text) {
  return add(<p className="">{text}</p>);
}

export default {add, remove, mount, flash, info};
