import routes from "./routes"
import Router from "./router";
import Popups from "./services/popups";
import Modals from "./services/modals";
import Notes from "./services/notes";
import Viewport from "./services/window";
import Header from "./components/header"

function e(id) {
  return document.getElementById(id);
}

export function Start() {
  Viewport.bind();

  Notes.mount(e("notes"));
  Popups.mount(e("popups"));
  Modals.mount(e("modals"));

  function onRoute() {
    ReactDOM.render(<Header />, e("header"));
  }

  Router.init(routes, {onRoute});
}
