define([
  "components/signup_form",
  "components/login_form"
], function(SignUpForm, LoginForm) {

  function render() {
    return (
      <div className="clearfix padding-tb-15">
        <div className="row">
          <div className="column large-6 text-display">
            <h4>The art of debate - perfected.</h4>
            <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec eget velit at risus scelerisque tincidunt sit amet non tortor. In laoreet luctus dui. Curabitur finibus aliquam enim, sit amet congue magna. Phasellus in orci faucibus, convallis ipsum at, cursus mi. Pellentesque vehicula lorem nec bibendum fermentum. Vivamus nec odio non ante bibendum tempor. Maecenas in nisi commodo, eleifend lectus sed, commodo velit. Quisque eget magna imperdiet, sollicitudin arcu vel, congue dolor. Nulla vel elit sollicitudin eros auctor gravida. Quisque efficitur risus vel ligula dictum eleifend. Aliquam erat volutpat.</p>
            <p>Ut ut mollis lectus, at ultricies ex. In quis dui porta, molestie augue in, consequat mauris. Fusce suscipit sem eu enim mollis, egestas tristique est feugiat. Pellentesque ac tincidunt libero. Aliquam ut lacus nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Duis elit quam, euismod eget sollicitudin a, facilisis euismod augue. Morbi cursus metus erat, in auctor nisi accumsan eu. Sed vitae ligula tincidunt, ultricies erat eu, tincidunt tellus. Vivamus sit amet pellentesque nulla, vel eleifend nulla.</p>
          </div>
          <div className="column large-6">
            <SignUpForm />
            <LoginForm />
          </div>
        </div>
      </div>
    )
  }

  return React.createClass({render});

});
