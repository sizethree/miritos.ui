import util from "../util";
import defer from "../defer";

import User from "resources/user";
import ClientToken from "resources/client_token";
import Client from "resources/client";
import GoogleAccount from "resources/google_account";

function store(initial) {
  function reduce(state, payload) {
    let result = Object.assign({revisions: state.revisions || 0}, state);
    let {type} = payload;
    let {user} = state;

    if(type === "CLEAR_REVISIONS")
      return Object.assign({revisions: 0}, initial);

    if(type === "USER_UPDATE") {
      let {field, value} = payload;
      result.user = Object.assign({}, user, {[field]: value});
      result.revisions += 1;
      return result;
    }

    return result;
  }

  return Redux.createStore(reduce, initial);
}

export default class AccountDelegate {

  constructor(user) {
    this.user            = user;
    this.clients         = [];
    this.tokens          = [];
    this.linked_accounts = {};
    this.store   = store({user});
  }

  get latest() {
    return this.store.getState();
  }

  subscribe(fn) {
    return this.store.subscribe(fn);
  }

  dispatch(payload) {
    return this.store.dispatch(payload);
  }

  save() {
    let {latest, store} = this;
    let {user} = latest;
    let refresh = this.refresh.bind(this);

    function finished() {
      store.dispatch({type: "CLEAR_REVISIONS"});
      return defer.resolve(true);
    }

    function success() {
      return refresh().then(finished);
    }

    return User.update(user).then(success);
  }

  refresh() {
    let {user, tokens, clients, linked_accounts} = this;

    function finish(client_data) {
      util.replace(clients, client_data)
      return defer.resolve(true);
    }

    function success([user_results, client_tokens, google_accounts]) {
      let [user_data] = user_results;
      linked_accounts.google = google_accounts;

      // update our user object with the fresh user data
      Object.assign(user, user_data);

      // update our token array w/ new information
      util.replace(tokens, client_tokens);

      // get a list of the client ids and fetch the associated clients
      let client_ids = [];
      for(let i = 0, c = tokens.length; i < c; i++) {
        client_ids.push(tokens[i].client);
      }

      return Client.get({"filter[id]": `in(${client_ids.join()})`}).then(finish);
    }

    return defer.all([
      User.get({"filter[id]": `eq(${user.id})`}),
      ClientToken.get({"filter[user]": `eq(${user.id})`}),
      GoogleAccount.get({"filter[user]": `eq(${user.id})`})
    ]).then(success);
  }

}
