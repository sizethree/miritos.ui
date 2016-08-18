define([
  "components/signup_form",
  "components/login_form"
], function(SignUpForm, LoginForm) {

  function render() {
    return (
      <div className="clearfix padding-tb-15">
        <div className="row">
          <div className="column large-6 large-offset-6">
            <SignUpForm />
            <LoginForm />
          </div>
        </div>
      </div>
    )
  }

  return React.createClass({render});

});
