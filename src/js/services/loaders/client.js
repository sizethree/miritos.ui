import Client from "resources/client";
import defer from "services/defer";

function normalize(results) {
  let clients = [];

  for(let i = 0, c = results.length; i < c; i++) {
    let client = results[i];
    clients.push({object: client});
  }

  return defer.resolve(clients);
}

function load(id_list) {
  return Client.get({"filter[uuid]": `in(${id_list.join()})`}).then(normalize);
}

export default load;
