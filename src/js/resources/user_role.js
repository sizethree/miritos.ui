import Resource from "services/resource";

const {ENV} = window;

let Role = Resource(`${ENV.API_HOME}/user-roles/:id`, {id: "@id"});

export default Role;
