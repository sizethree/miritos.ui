import * as promises from "Q";

function defer() : promises.Deferred<any> {
  return promises.defer();
}

function resolve(x) : promises.Promise<any> {
  return promises.resolve(x);
}

function reject(x) : promises.Promise<any> {
  return promises.reject(x);
}

function merge(x : Array<any>) : promises.Promise<any> {
  return promises.all(x);
}

function props(x : Object) : promises.Promise<any> {
  let keys = Object.keys(x);
  let out  = [];

  function store(value : any) : any {
    let {key} = this;
    return resolve({key, value});
  }

  for(let i = 0, c = keys.length; i < c; i++) {
    let key = keys[i];
    let val = x[key];
    let def = promises(val).then(store.bind({key}));
    out.push(def);
  }

  function join(results : Array<any>) : promises.Promise<any> {
    let result = {};

    for(let i = 0, c = results.length; i < c; i++) {
      let {key, value} = results[i];
      result[key] = value;
    }

    return resolve(result);
  }

  return merge(out).then(join);
}

export default {defer, resolve, reject, merge, props};
