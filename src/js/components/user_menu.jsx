import ActionMenu from "./hoc/action_menu";

function logout() {
  window.location = "/api/logout";
}

function Button() {
  return (
    <div className="clearfix">
      <div className="float-left margin-right-6">
        <a className="waves-effect waves-light btn" onClick={logout}>logout</a>
      </div>
      <div className="float-left">
        <a className="waves-effect waves-light btn"><i className="ion-plus-round"></i></a>
      </div>
    </div>
  );
}

function Menu() {
  return (
    <div className="clearfix">
      <ul className="clearfix dropdown-content active display-block">
        <li><a>Photo</a></li>
        <li><a>Event</a></li>
      </ul>
    </div>
  )
}

export default ActionMenu(Button, Menu);
