define([
  "resources/auth"
], function(AuthResource) {

  let session = null;

  function shallow(x, y) {
    return Object.assign(x, y);
  }

  function user() {
    return !session || !session.user ? null : shallow({}, session.user);
  }

  function prep() {
    let {promise, resolve, reject} = Q.defer()

    if(!session || !session.token)
      return Q.resolve(false);

    let {token} = session;

    // once the GET request against the auth api endpoint has finished, we are prepared.
    // if there was an error during the request resolve w/o setting the current user. if 
    // however, the api responded with a 500 of storts, reject w/ error.
    function loaded(err, result, {status}) {
      if(status >= 500)
        return reject(new Error("BAD_API_STATUS"));

      if(err)
        return resolve(false);

      console.log(result);
    }

    AuthResource.get({token}, loaded);

    return promise;
  }

  function token(token) {
    if(arguments.length === 0) return session.token;
    session = Object.assign({}, {token});
  }

  return {user, prep, token};

});
