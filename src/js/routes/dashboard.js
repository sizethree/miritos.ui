define([
  "services/auth"
], function(Auth) {

  function resolve() {
    let {promise, resolve, reject} = Q.defer();
    return promise;
  }

  resolve.$inject = [
  ];

  let path = "/dashboard";
  let view = "views/dashboard";
  let before = Auth.prep;

  return {resolve, view, path, before};

});
