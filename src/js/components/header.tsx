import Auth from "services/auth";
import UserMenu from "components/user_menu";
import i18n from "services/i18n";

export default function render() {
  let [right, home_link] = Auth.user() ? [<UserMenu />, "/dashboard"] : [null, "/welcome"];

  return (
    <div className="header">
      <div className="header__left">
        <div className="display-block float-left margin-left-5">
          <h5><a href={home_link} className="white-text">{i18n("title")}</a></h5>
        </div>
      </div>
      <div className="header__right">{right}</div>
    </div>
  )
};
