require([
  "routes",
  "router",
  "services/popups",
  "services/notes",
  "services/viewport"
], function(routes, router, Popups, Notes, Viewport) {

  function e(id) {
    return document.getElementById(id);
  }

  Notes.mount(e("notes"));
  Popups.mount(e("popups"));
  Viewport.bind();

  router.init(routes);

});
