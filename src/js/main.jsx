import routes from "./routes";
import i18n from "./services/i18n";
import Router from "./router";
import Popups from "./services/popups";
import Modals from "./services/modals";
import Notes from "./services/notes";
import Viewport from "./services/window";
import Header from "./components/header";

function e(id) {
  return document.getElementById(id);
}

/**
 * @method start
 */
export function Start() {
  Viewport.bind();
  let {search: query_string} = window.location;

  if('?' === query_string.charAt(0))
    query_string = query_string.substr(1);

  let parts  = query_string.split("&");
  let locale = "en";

  for(let i = 0, c = parts.length; i < c; i++) {
    let [name, value] = parts[i].split("=");
    if(name === "locale") locale = value;
  }

  Notes.mount(e("notes"));
  Popups.mount(e("popups"));
  Modals.mount(e("modals"));

  function onRoute() {
    ReactDOM.render(<Header />, e("header"));
  }

  ReactDOM.render(<Header />, e("header"));

  function init() {
    i18n("hello_world");
    i18n("account.email");
    Router.init(routes, {onRoute});
  }

  i18n.locale(locale).then(init).catch(function(e) {
    console.error("bad locale, defaulting back to \"en\"");
    return i18n.locale("en").then(init);
  });
}
