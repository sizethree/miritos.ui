define([
  "services/auth"
], function(Auth) {

  function logout() {
    window.location = "/api/logout";
  }

  function UserMenu() {
    return (
      <div className="clearfix">
        <a className="white-outline-button" onClick={logout}>logout</a>
      </div>
    );
  }

  function render() {
    let right = Auth.user() ? <UserMenu /> : <div></div>;

    return (
      <div className="clearfix padding-tb-5 bg-black-lighten-10">
        <div className="clearfix row">
          <div className="float-right">{right}</div>
        </div>
      </div>
    )
  }

  return React.createClass({render});

});
