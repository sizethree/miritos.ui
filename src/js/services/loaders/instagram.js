import defer from "services/defer";
import Photo from "resources/photo";
import display from "components/feed/instagram";

function success([photo]) {
  let meta    = {photo};
  return defer.resolve({meta, display});
}

function load(instagram) {
  let req = {"filter[id]": `eq(${instagram.photo})`};
  return Photo.get(req).then(success);
}

export default load;

