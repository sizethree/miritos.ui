import Auth from "../services/auth";
import UserMenu from "./user_menu";

export default function render() {
  let [right, home_link] = Auth.user() ? [<UserMenu />, "/dashboard"] : [null, "/welcome"];

  return (
    <div className="header">
      <div className="header__left">
        <div className="display-block float-left margin-left-5">
          <h5><a href={home_link} className="white-text"><span className="fw-300">Corporate </span><span className="fw-700">ActivityAggregation</span><span className="fw-300"> Platform</span></a></h5>
        </div>
      </div>
      <div className="header__right">{right}</div>
    </div>
  )
};
