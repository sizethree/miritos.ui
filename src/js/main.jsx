import routes from "./routes"
import Router from "./router";
import Popups from "./services/popups";
import Notes from "./services/notes";
import Viewport from "./services/window";
import Header from "./components/header"

function e(id) {
  return document.getElementById(id);
}

export function Start() {
  Notes.mount(e("notes"));
  Popups.mount(e("popups"));
  Viewport.bind();

  function onRoute() {
    ReactDOM.render(<Header />, e("header"));
  }

  Router.init(routes, {onRoute});
}
