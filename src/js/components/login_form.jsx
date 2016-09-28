define([
], function() {

  let {API_HOME} = window.ENV;

  return function render(props) {
    let google_url = `${API_HOME}/login/google`;

    function navigate() {
      window.location = google_url;
    }

    return (
      <div className="login-form clearfix">
        <a className="white-outline-button float-left" onClick={navigate}>login with google</a>
      </div>
    );
  }

});
