import Resource from "../services/resource";

const {ENV} = window;

let Client = Resource(`${ENV.API_HOME}/clients`, {});

export default Client;
