import fetch from "services/fetch";
import TYPES from "var/object_types";
import defer from "services/defer";
import instagram from "services/loaders/instagram";
import photo from "services/loaders/photo";

function objectUrl(s) {
  return `/object?url=${encodeURIComponent(s)}`;
}

function pass() {
  return defer.resolve({});
}

function load({type, url}) {
  let {promise, resolve, reject} = defer.defer();
  let meta, object = null;

  switch(type) {
    case TYPES.INSTAGRAM:
      meta = instagram;
      break;
    case TYPES.PHOTO:
      meta = photo;
      break;
    default:
      meta = pass;
  }

  function finished({meta, display}) {
    return defer.resolve({type, object, url, meta, display});
  }

  function loadMeta({results}) {
    object = results[0];
    return meta(object).then(finished);
  }

  return fetch(objectUrl(url)).then(loadMeta);
}

load.all = function(objects) {
  return defer.all(objects.map(load));
}

export default load;
