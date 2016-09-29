import Auth from "../services/auth"

/* index route
 *
 * This is an example of what a route looks like that uses the "route resolution"
 * mechanism that was introduced by angularjs. During the route's `resolve` 
 * function, the route creates a new instance of the poke list delegate, attempts
 * to load it's data, and then resolves the delegate should thaat succeed.
 *
 * To see how the router handlers this see the src/js/router.js file.
 */
let authenticated_redirect = {code: 300, url: "/dashboard"};
let guest_redirect         = {code: 300, url: "/welcome"};


function resolve() {
  return Q.reject(Auth.user() ? authenticated_redirect : guest_redirect);
}

// here we have a special case where the route is defining an array of dependencies
// that it does not want loaded into the application until the route is in the 
// process of resolving. In this way, dependencies of the route are able to "skip" 
// the optimization process.
resolve.$inject = [
];

let path = "/";
let before = Auth.prep;

export default {resolve, path, before};
