import Auth from "services/auth"
import defer from "services/defer";

const authenticated_redirect = {code: 300, url: "/dashboard"};
const guest_redirect         = {code: 300, url: "/welcome"};

function resolve() {
  return defer.reject(Auth.user() ? authenticated_redirect : guest_redirect);
}

export default {resolve, path: "/"};
