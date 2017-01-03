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

export default {defer, resolve, reject, merge};
