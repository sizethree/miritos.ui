import defer from "services/defer";
import Photo from "resources/photo";

function load(instagram) {
  let req = {"filter[id]": `eq(${instagram.photo})`};
  return Photo.get(req).then(function([photo]) { return defer.resolve({photo}); });
}

export default load;

