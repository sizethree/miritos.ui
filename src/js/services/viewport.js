import uuid from "./uuid";

/* viewport service
 *
 * This service binds viewport-level events to the dom so that other
 * components/modules needing that information may and and remove these
 * listeners at will; the module binds all of its events at application
 * startup to handlers that find matching events and call them as needed.
 * It is likely that there will be events fired that have no active 
 * listeners, but that is ok.
 *
 * The management (addition/removal) of the listeners is handled the same
 * way as the popup/note/event engines - a unique identifier handler is 
 * create for each listener.
 *
 */

let listeners = [];
let bound = false;

function on(event_name, handler) {
  var id = uuid();
  listeners.push({event_name, id, handler});
  return id;
}

function off(id) {
  let count = listeners.length;

  for(let i = 0; i < count; i++) {
    let l = listeners[i];
    if(l.id !== id) continue;
    listeners.splice(i, 1);
    return id;
  }

  return -1;
}

function trigger(event) {
  return function handler(e) {
    let count = listeners.length;
    for(let i = 0; i < count; i++) {
      let l = listeners[i];
      if(l.event_name !== event) continue;
      l.handler(e);
    }
    return true;
  };
}

function bind() {
  if(bound) { return false; }
  bound = true;

  document.addEventListener("click", trigger("click"));
  document.addEventListener("mousedown", trigger("mousedown"));
  document.addEventListener("mousemove", trigger("mousemove"));
  document.addEventListener("mouseup", trigger("mouseup"));
}

export default {on, off, bind};
