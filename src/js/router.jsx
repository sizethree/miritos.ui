import Notification from "./services/notes";

/* router
 *
 * Heavily influence by angularjs, this module defines a routing engine using 
 * pagejs to handle the url/html5/pushstate logic. Each route defined by the 
 * application is made up of 3 main things:
 *
 * 1. a path - this is the url patter that, when the router sees it, will tell 
 * the router it is working with this route
 *
 * 2. a resolve function - this is a function that allows the route to load in
 * any arbitrary amount of information before the router attempts to load and 
 * render the view associate with the route.
 *
 * 3. a view - this is a react component that the router will mount onto the 
 * main view container, sending along the resolved data as properties of the
 * component.
 */ 

// scope a variable that will hold our loading notification id
let listeners = [];

// route
//
// @param {object} definition - an object with `resolve`, `view` and `path`
function route(definition) {
  let {view, resolve, path, before} = definition;
  let context      = null;

  // render
  //
  // called once the route's view module has been loaded in. responsible for
  // rendering out the loaded view, providing it with the information from 
  // the route's resolve function
  function render({default: View}) {
    let container = document.getElementById("main");
    Notification.remove(context.note_id);

    for(let i = 0, c =  listeners.length; i < c; i++) {
      let {event, fn} = listeners[i];
      if(event === "route") fn();
    }

    ReactDOM.render(<View resolved={context.resolution} />, container);
  }

  // simple fail here. if any route rejects, or is unable to load the view 
  // module, this function will log out the reason and send the user to the
  // error route.
  function failed(e) {
    let {code, url} = e || {};
    Notification.remove(context.note_id);

    // rejecton w/ redirect
    if(code === 300 && url && url.length >= 1)
      return page(url);

    console.error(e.stack);

    page("/error");
  }

  // success
  //
  // called once the route finished it's resolution. responsible for then 
  // loading in the view module defined on the route and rendering out.
  function success(data) {
    context.resolution = data;
    require([view], render, failed);
  }

  function handler() {
    let {note_id, dependencies} = context;

    if(!note_id)
      context.note_id = Notification.add("Loading");

    resolve.call(context)
      .then(success)
      .catch(failed);
  }

  function injected(...deps) {
    context.dependencies = deps;
    return handler();
  }

  function inject() {
    context.note_id = Notification.add("Loading");
    require(resolve.$inject, injected);
  }

  function start(page_context) {
    let has_before = "function" === typeof before;
    let has_deps = resolve.$inject instanceof Array && resolve.$inject.length >= 1;
    context = Object.assign({}, page_context)
    return (has_before ? before() : Q.resolve()).then(has_deps ? inject : handler).catch(failed);
  }

  return start;
}

function init(routes, {onRoute}) {
  if("function" === typeof onRoute)
    listeners.push({event: "route", fn: onRoute});

  // bind all of the routes provided by the routes module
  for(let count = routes.length, i = 0; i < count; i++) {
    let r = routes[i];
    let {path} = r;
    page(path, route(r));
  }

  page({popstate: true, click: true});
}


export default {init, route};
