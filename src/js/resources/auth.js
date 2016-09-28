define([
], function() {

  const {ENV} = window;

  return Flyby(`${ENV.API_HOME}/auth`);

});
