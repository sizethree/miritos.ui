import filters from "services/routing/filters";
import defer from "services/defer";
import Auth from "services/auth";

function resolve() {
  let user = Auth.user();
  let {dependencies} = this;
  let [{default: AccountDelegate}] = dependencies;
  let account_delegate = new AccountDelegate(user);

  function finish() {
    return defer.resolve({account_delegate});
  }

  return account_delegate.refresh().then(finish);
}

resolve.$inject = [
  "services/delegates/account"
]

let view = "views/account";
let path = "/account";
let before = filters.authenticated;

export default {resolve, path, view, before};

