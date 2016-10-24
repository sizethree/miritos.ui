import Resource from "../services/resource";

const {ENV} = window;

let GoogleAccount = Resource(`${ENV.API_HOME}/google-accounts/:id`, {id: "@id"});

export default GoogleAccount;
