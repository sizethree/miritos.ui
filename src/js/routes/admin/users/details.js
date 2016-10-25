import defer from "services/defer";
import filters from "services/routing/filters";

function resolve() {
  let {params, dependencies} = this;
  let [{default: User}, {default: Mapping}] = dependencies;

  function success([[user], role_mappings]) {
    return defer.resolve({user, role_mappings});
  }

  let user_request = {"filter[id]": `eq(${params.id})`};
  let role_request = {"filter[user]": `eq(${params.id})`};

  return defer.all([
    User.get(user_request),
    Mapping.get(role_request)
  ]).then(success);
}

resolve.$inject = [
  "resources/user",
  "resources/user_role_mapping"
];

let path = "/admin/users/:id";
let view = "views/admin/users/details";

export default {resolve, path, view};
