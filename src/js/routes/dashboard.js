import Auth from "../services/auth";
import defer from "../services/defer";
import filters from "../services/routing/filters";

import * as ReactDOM from "react-dom";
import * as React from "react";

function resolve() {
  let {dependencies} = this;
  let [{default: Delegate}] = dependencies;
  let current_user = Auth.user();

  // create the feed delegate
  let feed_delegate = new Delegate();

  function finish(cache) {
    return defer.resolve({feed_delegate, cache});
  }

  return feed_delegate.items(finish).then(finish);
}

resolve.$inject = [
  "services/delegates/feed"
];

let path = "/dashboard";
let view = "views/dashboard";
let before = filters.authenticated;

export default {resolve, view, path, before};
