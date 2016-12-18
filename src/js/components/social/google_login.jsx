import i18n from "services/i18n";

let {API_HOME} = window.ENV;

export default function render(props) {
  let google_url = `${API_HOME}/login/google`;

  function navigate() {
    window.location = google_url;
  }

  return(
    <div className="cursor-pointer btn white clearfix" onClick={navigate}>
      <div className="display-table display-table--cell">
        <div className="display-table-cell v-align-middle padding-right-5">
          <img src="/assets/img/google.svg" height="35px" />
        </div>
        <div className="display-table-cell v-align-middle padding-left-5">
          <p className="grey-text tt-none darken-3">{i18n("google_login")}</p>
        </div>
      </div>
    </div>
  );
}
