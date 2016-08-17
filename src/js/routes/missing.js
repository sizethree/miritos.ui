define([
], function() {

  function resolve() {
    return Q.resolve(true);
  }

  let view = "views/missing";
  let path = "*";

  return {resolve, view, path};

});
