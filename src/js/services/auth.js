import AuthResource from "../resources/auth"

let session = null;

function shallow(x, y) {
  return Object.assign(x, y);
}

function user() {
  return !session || !session.user ? null : shallow({}, session.user);
}

function prep() {
  let {promise, resolve, reject} = Q.defer()

  if(session  && !(session.token || session.user))
    return Q.resolve(false);

  let {token} = session || {};

  // once the GET request against the auth api endpoint has finished, we are prepared.
  // if there was an error during the request resolve w/o setting the current user. if 
  // however, the api responded with a 500 of storts, reject w/ error.
  function loaded(err, response, {status}) {
    if(status >= 500)
      return reject(new Error("BAD_API_STATUS"));

    if(err || !response || response.status !== "SUCCESS")
      return resolve(false);

    let [user] = response.results;

    session = shallow({}, {user});
    resolve(true);
  }

  let request = token ? {token} : {};

  AuthResource.get(request, loaded);
  return promise;
}

function token(token) {
  if(arguments.length === 0) return session.token;
  session = shallow({}, {token});
}

const Auth = {user, prep, token};
export default Auth;
