import Auth from "../services/auth";
import UserMenu from "./user_menu";

export default function render() {
  let right = Auth.user() ? <UserMenu /> : <div></div>;

  return (
    <div className="clearfix row position-relative display-flex items-center">
      <div className="float-left">
        <img className="display-block float-left" src="/assets/img/logo-blue.svg" height="40px" />
        <div className="display-block float-left margin-left-5">
          <h5 className="upper"><a href="/">miritos</a></h5>
        </div>
      </div>
      <div className="float-right margin-left-auto">{right}</div>
    </div>
  )
};
