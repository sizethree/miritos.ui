define([
], function() {

  function resolve() {
    return Q.resolve({});
  }

  let path = "/welcome";
  let view = "views/welcome";

  return {resolve, view, path};

});
