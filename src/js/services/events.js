import uuid from "../services/uuid"

/* Engine
 *
 * Defines a class that maintains an array of "listener" objects which consist of
 * an id, an event, a handler function and (optionally) a context that will be used
 * during triggering in an `apply` call that will allow the `this` inside the scope
 * of the handler to be the `context`.
 *
 * Unlike other engines, here we are using a unique id as a "handle" that the listener
 * must keep track of and ultimately send into an `off` call. This 
 *
 * Typically delegate classes will extend this class in order for components to have
 * a form of communication across the application.
 */

class Engine {

  constructor() {
    this.$listeners = [];
  }

  on(event, handler, context) {
    if(typeof handler !== "function") return -1;
    let id = UUID();
    this.$listeners.push({id, handler, event, context});
    return id;
  }

  off(id) {
    let {$listeners: listeners} = this;

    for(let i = 0, c = listeners.length; i < c; i++) {
      let item = listeners[i];
      if(item.id !== id) continue;
      listeners.splice(i, 1);
      return id;
    }

    return -1;
  }

  trigger(event_name, ...args) {
    let {$listeners: listeners} = this;

    for(let i = 0, c = listeners.length; i < c; i++) {
      let item = listeners[i];
      if(item.event !== event_name) continue;
      let {handler, context} = item;
      handler.apply(context, args);
    }

    return true;
  }

}

export default {Engine};
