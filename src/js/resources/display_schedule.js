import Resource from "../services/resource";

const {ENV} = window;

let DisplaySchedule = Resource(`${ENV.API_HOME}/display-schedules/:id`, {id: "@id"});

export default DisplaySchedule;
