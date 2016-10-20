import Auth from "../services/auth";
import defer from "../services/defer";

function resolve() {
  let {dependencies} = this;
  let [{default: Delegate}] = dependencies;

  // create the feed delegate
  let feed_delegate = new Delegate();

  function finish() {
    return defer.resolve({feed_delegate});
  }

  return feed_delegate.load().then(finish);
}

resolve.$inject = [
  "services/delegates/feed"
];

let path = "/dashboard";
let view = "views/dashboard";
let before = Auth.prep;

export default {resolve, view, path, before};
