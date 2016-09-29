import Auth from "../services/auth";
import UserMenu from "./user_menu";

export default function render() {
  let right = Auth.user() ? <UserMenu /> : <div></div>;

  return (
    <div className="clearfix padding-tb-5 lime lighten-3">
      <div className="clearfix row position-relative">
        <div className="display-table display-table--fixed width-50 height-50">
          <div className="display-table-cell v-align-middle align-left">
            <h5>CAAP</h5>
          </div>
          <div className="display-table-cell padding-tb-4 v-align-middle">
            <div className="float-right">{right}</div>
          </div>
        </div>
      </div>
    </div>
  )
};
