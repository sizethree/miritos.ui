define([
  "services/notes"
], function(Notification) {

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
  let note_id = null;

  // route
  //
  // @param {object} definition - an object with `resolve`, `view` and `path`
  function route(definition) {
    let {view, resolve, path} = definition;
    let resolution   = null;
    let dependencies = [];

    // render
    //
    // called once the route's view module has been loaded in. responsible for
    // rendering out the loaded view, providing it with the information from 
    // the route's resolve function
    function render(ViewModule) {
      let container = document.getElementById("main");
      Notification.remove(note_id);
      ReactDOM.render(<ViewModule resolved={resolution} />, container);
      note_id = null;
    }

    // simple fail here. if any route rejects, or is unable to load the view 
    // module, this function will log out the reason and send the user to the
    // error route.
    function failed(e) {
      let {code, url} = e || {};
      Notification.remove(note_id);
      note_id = null;

      console.error(e.stack);

      if(code === 300 && url && url.length >= 1) {
        return page(url);
      }

      page("/error");
    }

    // success
    //
    // called once the route finished it's resolution. responsible for then 
    // loading in the view module defined on the route and rendering out.
    function success(data) {
      resolution = data;
      require([view], render, failed);
    }

    function handler(page_route_context) {
      if(note_id === null) note_id = Notification.add("Loading");

      resolve.apply(null, dependencies.concat([page_route_context]))
        .then(success)
        .catch(failed);
    }

    function inject(context) {
      note_id = Notification.add("Loading");

      require(resolve.$inject, function(...deps) {
        dependencies = deps;
        handler(context);
      });
    }

    let has_deps = resolve.$inject instanceof Array;
    return has_deps ? inject : handler;
  }

  function init(routes) {
    // bind all of the routes provided by the routes module
    for(let count = routes.length, i = 0; i < count; i++) {
      let r = routes[i];
      let {path} = r;
      page(path, route(r));
    }

    page({popstate: true, click: true});
  }


  return {init};

});
