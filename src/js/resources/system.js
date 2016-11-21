import Resource from "services/resource";

const {ENV} = window;

export default Resource(`${ENV.API_HOME}/system`);
