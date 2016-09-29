import welcome from "./routes/welcome";
import dashboard from "./routes/dashboard";

// oauth bundle
import oauth from "./routes/oauth/index";

import index from "./routes/index";
import error from "./routes/error";

import missing from "./routes/missing";

let routes = [
  welcome,
  index,
  error,
  dashboard
];

routes = routes.concat(oauth);

export default routes.concat(missing);
