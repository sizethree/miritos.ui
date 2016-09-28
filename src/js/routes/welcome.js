define([
], function() {

  function resolve() {
    return Q.resolve({new_user: true});
  }

  let path = "/welcome";
  let view = "views/welcome";

  return {resolve, view, path};

});
