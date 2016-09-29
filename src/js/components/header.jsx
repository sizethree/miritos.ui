import Auth from "../services/auth"

function logout() {
  window.location = "/api/logout";
}

function UserMenu() {
  return (
    <div className="clearfix">
      <a className="waves-effect waves-light btn" onClick={logout}>logout</a>
    </div>
  );
}

export default function render() {
  let right = Auth.user() ? <UserMenu /> : <div></div>;

  return (
    <div className="clearfix padding-tb-5 amber lighten-3">
      <div className="clearfix row position-relative">
        <div className="overflow-hidden display-table display-table--fixed width-50 height-50">
          <div className="display-table-cell v-align-middle align-left">
            <h5>CAAP</h5>
          </div>
          <div className="display-table-cell v-align-middle">
            <div className="float-right">{right}</div>
          </div>
        </div>
      </div>
    </div>
  )
};
