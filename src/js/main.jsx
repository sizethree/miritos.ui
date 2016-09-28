require([
  "routes",
  "router",
  "services/popups",
  "services/notes",
  "services/viewport",
  "components/header"
], function(routes, router, Popups, Notes, Viewport, Header) {

  function e(id) {
    return document.getElementById(id);
  }

  Notes.mount(e("notes"));
  Popups.mount(e("popups"));
  Viewport.bind();


  function onRoute() {
    ReactDOM.render(<Header />, e("header"));
  }

  router.init(routes, {onRoute});

});
