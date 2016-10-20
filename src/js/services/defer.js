function defer() {
  return Q.defer();
}

function resolve(x) {
  return Q.resolve(x);
}

function reject(x) {
  return Q.reject(x);
}

function all(x) {
  return Q.all(x);
}

module.exports = {defer, resolve, reject, all};
