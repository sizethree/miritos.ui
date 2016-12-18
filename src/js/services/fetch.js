function fetch(url) {
  let xhr = new XMLHttpRequest();
  let {promise, resolve, reject} = Q.defer();

  xhr.open("GET", url);

  function loaded() {
    let {status, response} = xhr;

    if(status !== 200) 
      return reject(new Error(response));

    try {
      let json = JSON.parse(response);
      return resolve(json);
    } catch(e) {
      return reject(e);
    }
  }

  function failed(err) {
    return reject(new Error(err));
  }

  xhr.addEventListener("load", loaded);
  xhr.addEventListener("error", failed);
  xhr.send();
  return promise;
}

export default fetch;

