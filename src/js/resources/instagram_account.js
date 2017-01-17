import Resource from "services/resource";

const {ENV} = window;
let Account = Resource(`${ENV.API_HOME}/instagram-accounts/:id`, {id: "@id"});

export default Account;
