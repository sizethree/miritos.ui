import routes from "routes";
import i18n from "services/i18n";
import Router from "router";
import Modals from "services/modals";
import Notes from "services/notes";
import Header from "components/header";
import {services} from "hoctable";

import * as ReactDOM from "react-dom";
import * as React from "react";

function e(id) {
  return document.getElementById(id);
}

/**
 * @method start
 */
export function Start() {
  services.Viewport.bind();
  services.Popups.mount(e("popups"));
  Notes.mount(e("notes"));
  Modals.mount(e("modals"));

  let {search: query_string} = window.location;

  if('?' === query_string.charAt(0))
    query_string = query_string.substr(1);

  let parts  = query_string.split("&");
  let locale = "en";

  for(let i = 0, c = parts.length; i < c; i++) {
    let [name, value] = parts[i].split("=");
    if(name === "locale") locale = value;
  }

  function onRoute() {
    ReactDOM.render(<Header />, e("header"));
  }


  function init() {
    ReactDOM.render(<Header />, e("header"));
    Router.init(routes, {onRoute});
  }

  function fallback(e) {
    console.error("bad locale, defaulting back to \"en\"");
    return i18n.locale("en").then(init);
  }

  function failed(e) {
    console.error(e);
  }

  i18n.locale(locale).catch(fallback).then(init).catch(failed);
}
