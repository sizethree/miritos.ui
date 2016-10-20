import welcome from "./routes/welcome";
import dashboard from "./routes/dashboard";

// oauth bundle
import oauth from "./routes/oauth/index";

// admin bundle
import admin from "./routes/admin/index";

import index from "./routes/index";
import error from "./routes/error";

import missing from "./routes/missing";

let routes = [
  welcome,
  index,
  error,
  dashboard
];

routes = routes.concat(oauth).concat(admin);

export default routes.concat(missing);
