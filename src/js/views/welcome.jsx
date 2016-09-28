define([
  "components/login_form"
], function(LoginForm) {

  return function({resolved}) {
    return (
      <div className="clearfix row">
        <div className="columns large-6">
          <h1>Login</h1>
          <br />
          <LoginForm />
        </div>
      </div>
    );
  }

});
