import transforms from "./util/transforms";

const {ENV} = window;
const {response} = transforms;

let get = {
  method: "GET",
  transform: {response}
};

let DisplaySchedule = Flyby(`${ENV.API_HOME}/display-schedules`, null, {get});

export default DisplaySchedule;
