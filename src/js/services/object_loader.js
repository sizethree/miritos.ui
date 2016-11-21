import fetch from "services/fetch";
import TYPES from "var/object_types";
import defer from "services/defer";
import instagram from "services/loaders/instagram";

function objectUrl(s) {
  return `/object?url=${encodeURIComponent(s)}`;
}

function pass() {
  return defer.resolve({});
}


function load({type, url}) {
  let {promise, resolve, reject} = defer.defer();

  let meta;

  switch(type) {
    case TYPES.INSTAGRAM:
      meta = instagram;
      break;
    default:
      meta = pass;
  }

  function normalize({results}) {
    let [object] = results;
    return meta(object).then(function(meta) { return defer.resolve({type, object, url, meta}); });
  }

  return fetch(objectUrl(url)).then(normalize);
}

load.all = function(objects) {
  return defer.all(objects.map(load));
}

export default load;
