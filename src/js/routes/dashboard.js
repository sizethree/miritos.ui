define([
  "services/auth"
], function(Auth) {

  function resolve() {
    let user = Auth.user();
    return Q.resolve({user});
  }

  resolve.$inject = [
  ];

  let path = "/dashboard";
  let view = "views/dashboard";
  let before = Auth.prep;

  return {resolve, view, path, before};

});
