import Auth from "../services/auth";
import ActionMenu from "./hoc/action_menu";

function Button() {
  return (
    <div className="display-inline-block">
      <a className="waves-effect waves-light btn"><i className="icon ion-navicon-round"></i></a>
    </div>
  )
}

function Menu({close}) {
  function logout() {
    window.location = "/api/logout";
    close();
  }

  let items = [(
    <li className="position-relative margin-top-0" key="logout">
      <a onClick={logout} className="upper">logout</a>
    </li>
  )];

  if(true === Auth.isAdmin()) {
    let admin_link = (
      <li className="position-relative margin-top-0" key="admin">
        <a href="/admin/schedules" onClick={close} className="upper">admin</a>
      </li>
    );
    items.push(admin_link);
  }

  return (
    <div className="clearfix display-inline-block">
      <ul className="user-menu clearfix dropdown-content active display-block">{items}</ul>
    </div>
  )
}

export default ActionMenu(Button, Menu);
