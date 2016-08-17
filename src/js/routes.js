define([
  "routes/index",
  "routes/error",
  "routes/welcome",
  "routes/missing"
], function(...routes) {

  // this is really a shim to allow the codebase to have a single place to define all routes
  // used by the application, converting that list into an array usable by the router.
  return routes;

});
