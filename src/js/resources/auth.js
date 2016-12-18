const {ENV} = window;

let tokens = {
  url: `${ENV.API_HOME}/auth/tokens`,
  method: "GET"
};

let user = {
  url: `${ENV.API_HOME}/auth/user`,
  method: "GET"
};

let Auth = Flyby(`${ENV.API_HOME}/auth`, null, {user, tokens});

export default Auth;
