var TEST_REGEXP = /spec\.js$/;
var tests       = [];
var file_names  = Object.keys(window.__karma__.files);

function pathToModule(path) {
  return path.replace(/^\/base\//, '').replace(/\.js$/, '');
};

for(var i =  0, c = file_names.length; i < c; i++) {
  var file = file_names[i];
  if(TEST_REGEXP.test(file)) tests.push(pathToModule(file));
}

require.config({
  baseUrl: '/base',
  paths: {
    "views"      : "/base/src/js/views",
    "fixtures"   : "/base/test/fixtures",
    "services"   : "/base/src/js/services",
    "components" : "/base/src/js/components",
    "routes"     : "/base/src/js/routes",
    "Q"          : "/base/bower_components/q/q"
  },
  shim: {},
  deps: tests,
  callback: window.__karma__.start
});
