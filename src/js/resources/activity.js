import Resource from "../services/resource";
import transform from "./util/transforms";

const {ENV} = window;
const {response} = transform;

let feed = {
  method: "GET",
  url: `${ENV.API_HOME}/activity/live`,
  transform: {response}
};

let Activity = Resource(`${ENV.API_HOME}/activity/:id`, {id: "@id"}, {feed});

export default Activity;
