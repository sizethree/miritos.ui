import Photo from "resources/photo";
import defer from "services/defer";

function normalize(results) {
  let photo_objects = [];

  for(let i = 0, c = results.length; i < c; i++) {
    let photo = results[i];
    photo_objects.push({object: photo});
  }

  return defer.resolve(photo_objects);
}

function load(id_list) {
  return Photo.get({"filter[uuid]": `in(${id_list.join()})`}).then(normalize);
}

export default load;
