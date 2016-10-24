import Resource from "../services/resource";

const {ENV} = window;

let Activity = Resource(`${ENV.API_HOME}/activity/:id`, {id: "@id"});

export default Activity;
