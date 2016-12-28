import Auth from "../services/auth";
import defer from "../services/defer";
import filters from "../services/routing/filters";

function resolve() {
  let {dependencies} = this;
  let [{default: Delegate}] = dependencies;
  let current_user = Auth.user();
  let {resolve: done, reject, promise} = defer.defer();

  // create the feed delegate
  let feed_delegate = new Delegate();

  function finish(cache) {
    done({feed_delegate, cache});
  }

  feed_delegate.feed(finish);

  return promise;
}

resolve.$inject = [
  "services/delegates/feed"
];

let path = "/dashboard";
let view = "views/dashboard";
let before = filters.authenticated;

export default {resolve, view, path, before};
