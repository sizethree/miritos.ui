import defer from "../services/defer";

function resolve() {
  return defer.resolve(true);
}

let view = "views/error";
let path = "/error"

export default {resolve, view, path};
