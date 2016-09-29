let {API_HOME} = window.ENV;

export default function render(props) {
  let google_url = `${API_HOME}/login/google`;

  function navigate() {
    window.location = google_url;
  }

  return (
    <div className="login-form clearfix">
      <a className="waves-effect waves-light btn float-left" onClick={navigate}>login with google</a>
    </div>
  );
};
