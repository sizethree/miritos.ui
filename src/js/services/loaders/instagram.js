import defer from "services/defer";
import utils from "services/util";
import Photo from "resources/photo";
import InstagramPhoto from "resources/instagram_photo";
import display from "components/feed/instagram";

const BATCH_SIZE = 10;

function load(id_list) {
  let batches = [];
  let results = {};

  function finish(photo_results) {
    results.photos = utils.flatten(photo_results);
    let output = [];

    for(let i = 0, c = results.instagram.length; i < c; i++) {
      let gram = results.instagram[i];
      let [photo] = results.photos.filter(function({id}) { return id === gram.photo; });
      output.push({object: gram, meta: {photo}});
    }

    return defer.resolve(output);
  }

  function normalize(instagram_results) {
    let flat      = utils.flatten(instagram_results);
    let photo_ids = flat.map(function({photo}) { return photo; });
    let batches   = [];

    results.instagram = flat;

    while(photo_ids.length > 0) {
      let batch = photo_ids.splice(0, BATCH_SIZE);
      batches.push(Photo.get({"filter[id]": `in(${batch.join()})`}));
    }

    return defer.merge(batches);
  }

  while(id_list.length > 0) {
    let batch = id_list.splice(0, BATCH_SIZE);
    batches.push(InstagramPhoto.get({"filter[uuid]": `in(${batch.join()})`}));
  }

  function failed(e) {
    console.error(e);
    return defer.reject(e);
  }

  return defer.merge(batches)
    .then(normalize)
    .then(finish)
    .catch(failed);
 }

export default load;

