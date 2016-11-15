import i18n from "services/i18n";
import Breadcrumbs from "components/breadcrumbs";
import RoleManagement from "components/admin/user_role_management";


const CRUMBS = [{
  href: "/admin", 
  text: i18n("admin")
}, {
  href: "/admin/users", 
  text: i18n("user_management")
}];

class Details extends React.Component {

  constructor(props) {
    super(props)
  }

  render() {
    let {resolved} = this.props;
    let {user, role_manager} = resolved;

    let crumbs = CRUMBS.concat([{href: `/admin/users/${user.id}`, text: `${user.name} [#${user.id}]`}]);

    return (
      <div className="row">
        <div className="margin-bottom-10"><Breadcrumbs crumbs={crumbs} /></div>
        <div className="row">
          <div className="columns large-6">
            <div className="margin-bottom-5">
              <h5 className="fg-white-darken-20">{i18n("role_management")}</h5>
            </div>
            <RoleManagement manager={role_manager} user={user} />
          </div>
        </div>
      </div>
    );
  }

}

export default Details;
