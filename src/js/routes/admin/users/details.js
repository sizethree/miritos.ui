import defer from "services/defer";
import filters from "services/routing/filters";

function resolve() {
  let {params, dependencies} = this;
  let [{default: User}, {default: Manager}] = dependencies;

  let role_manager = new Manager({id: params.id});

  function success([[user]]) {
    return defer.resolve({user, role_manager});
  }

  let user_request = {"filter[id]": `eq(${params.id})`};

  return defer.all([
    User.get(user_request),
    role_manager.refresh()
  ]).then(success);
}

resolve.$inject = [
  "resources/user",
  "services/managers/user_roles"
];

let path = "/admin/users/:id";
let view = "views/admin/users/details";

export default {resolve, path, view};
