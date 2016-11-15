import util from "services/util";
import UserRoleMapping from "resources/user_role_mapping";
import defer from "services/defer";
import {Engine} from "services/events";

function exec(action, role) {

}

class UserRoleManager extends Engine {

  constructor(user) {
    super()
    this.user     = user;
    this.mappings = [];
  }

  refresh() {
    let {mappings, user} = this;

    function success(results) {
      util.replace(mappings, results);
      return defer.resolve(mappings);
    }

    return UserRoleMapping.get({"filter[user]": `eq(${user.id})`}).then(success);
  }

  contains(role_target) {
    let {mappings} = this;

    for(let i = 0, c = mappings.length; i < c; i++) {
      let {role} = mappings[i];
      if(role === role_target.id) return true;
    }

    return false;
  }

  add(role) {
    let {user, mappings} = this;
    let found = null;

    for(let i = 0; i < mappings.length; i++) {
      let {role: role_id} = mappings[i];
      if(role_id === role) found = mappings[i]
    }

    if(found)
      return defer.reject(new Error("INVALID_CALL"));

    function finished() {
      this.trigger("update");
      return defer.resolve(true);
    }

    function success() {
      return this.refresh().then(finished.bind(this));
    }

    return UserRoleMapping.create({user: user.id, role: role.id}).then(success.bind(this));
  }

  remove(target) {
    let {user, mappings} = this;
    let found = null;

    for(let i = 0; i < mappings.length; i++) {
      let {role} = mappings[i];
      if(role === target.id) found = mappings[i]
    }

    if(found === null)
      return defer.reject(new Error("INVALID_CALL"));

    function finished() {
      this.trigger("update");
      return defer.resolve(true);
    }

    function success() {
      return this.refresh().then(finished.bind(this));
    }

    return UserRoleMapping.destroy({id: found.id}).then(success.bind(this));
  }

}

export default UserRoleManager;
