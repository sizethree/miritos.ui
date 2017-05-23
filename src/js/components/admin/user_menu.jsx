import i18n from "services/i18n";
import {hoc} from "hoctable";
import Notes from "services/notes";

import * as ReactDOM from "react-dom";
import * as React from "react";

function Button() {
  return (
    <div className="display-inline-block">
      <a className="waves-effect waves-light btn"><i className="icon ion-navicon-round"></i></a>
    </div>
  )
}

function option(key, a) {
  return (<li key={key} className="position-relative margin-top-0">{a}</li>);
}

function Menu({close, signals, user}) {
  let detail_url = `/admin/users/${user.id}`;
  let items      = [option("roles", <a href={detail_url} onClick={close}>{i18n("view")}</a>)];

  return (
    <section className="dropdown">
      <ul className="dropdown__option-list">{items}</ul>
    </section>
  );
}

export default hoc.ActionMenu(Menu, Button);
