import defer from "./defer";
import transforms from "../resources/util/transforms";

let {response} = transforms;

const DEFAULT_ACTIONS = {
  get     : {method: "GET", has_body: false, transform: {response}},
  update  : {method: "PATCH", has_body: true, transform: {response}},
  create  : {method: "POST", has_body: true, transform: {response}},
  destroy : {method: "DELETE", has_body: true, transform: {response}}
};

export default function Resource(url_template, params, user_actions) {
  let actions  = Object.assign({}, DEFAULT_ACTIONS, user_actions);
  let resource = {};
  let impl     = Flyby(url_template, params, actions);
  let names    = Object.keys(actions);

  function wrap(action_name) {
    let fn = impl[action_name];

    return function exec(body) {
      let {promise, resolve, reject} = defer.defer();

      function finished(err, response) {
        if(err) return reject(err);
        resolve(response);
      }

      fn(body, finished);

      return promise;
    }
  }

  for(let i = 0, c = names.length; i < c; i++) {
    let name = names[i];
    resource[name] = wrap(name);
  }

  return resource;
}
