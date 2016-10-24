import Resource from "../services/resource";

const {ENV} = window;

let Token = Resource(`${ENV.API_HOME}/client-tokens`, {});

export default Token;
