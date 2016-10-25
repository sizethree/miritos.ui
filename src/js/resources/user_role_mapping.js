import Resource from "../services/resource";

const {ENV} = window;

let Mapping = Resource(`${ENV.API_HOME}/user-role-mappings/:id`, {id: "@id"});

export default Mapping;
