import fetch from "services/fetch";
import utils from "services/util";
import TYPES from "var/object_types";
import defer from "services/defer";

import instagramLoader from "services/loaders/instagram";
import photoLoader     from "services/loaders/photo";
import clientLoader    from "services/loaders/client";

function objectUrl(s) {
  return `/object?url=${encodeURIComponent(s)}`;
}

function pass() {
  return defer.resolve([]);
}

function all(objects) {
  let groups   = {};
  let requests = [];

  function normalize(group_results) {
    let flat   = utils.flatten(group_results);
    let result = [];

    for(let i = 0, c = flat.length; i < c; i++) {
      let {object, meta} = flat[i];
      let [match] = objects.filter(function({uuid}) { return uuid === object.uuid; });

      if(!match)
        continue;

      let {uuid, type} = match;
      result.push({object, meta, uuid, type});
    }

    return defer.resolve(result);
  }

  for(let i = 0, c = objects.length; i < c; i++) {
    let {type, uuid} = objects[i];

    if(groups[type] === undefined)
      groups[type] = [];

    groups[type].push(uuid);
  }

  for(let type in groups) {
    let id_list = groups[type];

    if(id_list.length == 0)
      continue;

    let loader = pass;

    switch(type) {
      case TYPES.PHOTO:
        loader = photoLoader;
        break;
      case TYPES.INSTAGRAM:
        loader = instagramLoader;
        break;
      case TYPES.CLIENT:
        loader = clientLoader;
        break;
    }

    requests.push(loader(id_list));
  }


  return defer.merge(requests).then(normalize);
}

export default {all};
