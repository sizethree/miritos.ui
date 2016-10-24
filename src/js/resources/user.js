import Resource from "../services/resource";

const {ENV} = window;

let User = Resource(`${ENV.API_HOME}/users`, {});

export default User;
