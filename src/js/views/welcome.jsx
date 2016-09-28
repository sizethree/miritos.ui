define([
  "components/login_form"
], function(LoginForm) {

  return function render({resolved}) {
    return (
      <div className="clearfix row">
        <div className="columns large-6">
          <h5>login</h5>
          <br />
          <LoginForm />
        </div>
      </div>
    );
  };

});
