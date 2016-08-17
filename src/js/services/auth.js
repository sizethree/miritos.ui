define([
], function() {

  let current_user = null;

  function shallow(x, y) {
    return Object.assign(x, y);
  }

  function user() {
    return current_user === null ? null : shallow({}, current_user);
  }

  return {user};

});
