import Auth from "../services/auth"

function resolve() {
  let {dependencies} = this;
  let [{Delegate}]  = dependencies;
  let user          = Auth.user();
  let feed_delegate = new Delegate();

  function finish() {
    return Q.resolve({feed_delegate});
  }

  return feed_delegate.load().then(finish);
}

resolve.$inject = [
  "components/feed_display"
];

let path = "/dashboard";
let view = "views/dashboard";
let before = Auth.prep;

export default {resolve, view, path, before};
