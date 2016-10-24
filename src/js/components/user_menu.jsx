import Auth from "../services/auth";
import i18n from "../services/i18n";
import ActionMenu from "./hoc/action_menu";

function Button() {
  return (
    <div className="display-inline-block">
      <a className="waves-effect waves-light btn"><i className="icon ion-navicon-round"></i></a>
    </div>
  )
}

function option(key, child) { 
  return (<li className="position-relative margin-top-0" key={key}>{child}</li>); 
}

function Menu({close}) {
  function logout() {
    window.location = "/api/logout";
    close();
  }

  let items = [
    option("logout", (<a onClick={logout}>{i18n("logout")}</a>)),
    option("account", (<a href="/account" onClick={close}>{i18n("account")}</a>)),
    option("dashboard", (<a href="/dashboard" onClick={close}>{i18n("dashboard")}</a>))
  ];

  if(true === Auth.isAdmin()) {
    let admin_link = option("admin", (<a href="/admin" onClick={close}>{i18n("admin")}</a>));
    items.push(admin_link);
  }

  return (
    <div className="clearfix display-inline-block">
      <ul className="user-menu clearfix dropdown-content active display-block">{items}</ul>
    </div>
  )
}

export default ActionMenu(Button, Menu);
