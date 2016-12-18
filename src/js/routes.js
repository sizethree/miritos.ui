import welcome from "./routes/welcome";
import dashboard from "./routes/dashboard";
import account from "./routes/account";

// oauth bundle
import oauth from "./routes/oauth/index";

// admin bundle
import admin from "./routes/admin/index";

import index from "./routes/index";
import error from "./routes/error";

import missing from "./routes/missing";

let routes = [
  dashboard,
  welcome,
  account,
  index,
  error
];

routes = routes.concat(oauth).concat(admin);

export default routes.concat(missing);
