import util from "../util";
import defer from "../defer";

import User from "../../resources/user";
import ClientToken from "../../resources/client_token";
import Client from "../../resources/client";

export default class AccountDelegate {

  constructor(user) {
    this.user    = user;
    this.clients = [];
    this.tokens  = [];
  }

  refresh() {
    let {user, tokens, clients} = this;

    function finish(client_data) {
      util.replace(clients, client_data)
      return defer.resolve(true);
    }

    function success([user_results, client_tokens]) {
      let [user_data] = user_results;

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
      ClientToken.get({"filter[user]": `eq(${user.id})`})
    ]).then(success);
  }

}
