import transforms from "./util/transforms";

const {ENV} = window;
const {response} = transforms;

let get = {
  method: "GET",
  transform: {response}
};

export default Flyby(`${ENV.API_HOME}/activity`, null, {get});
