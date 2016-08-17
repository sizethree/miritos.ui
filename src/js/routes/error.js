define([
], function() {

  function resolve() {
    return Q.resolve(true);
  }

  view = "views/error";
  path = "/error"

  return {resolve, view, path};

});
