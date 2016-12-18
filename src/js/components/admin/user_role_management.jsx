import Modals from "services/modals";
import tableStore from "services/store_factories/paged_table";
import i18n from "services/i18n";

import ROLES from "var/user_roles";
import RoleSelection from "components/admin/role_selection";
import Delegate from "services/delegates/admin/role_selection";
import Manager from "services/managers/user_roles";

function Mapping({mapping, manager}) {
  let role_label = null;

  switch(mapping.role) {
    case ROLES.ADMIN:
      role_label = i18n("admin");
      break;
    case ROLES.CONTRIBUTOR:
      role_label = i18n("contributor");
      break;
    default:
      role_label = i18n("unknown");
      break;
  }

  function remove() {
    manager.remove({id: mapping.role});
  }

  return (
    <li className="collection-item">
      <div className="display-table display-table--fixed width-50 height-50">
        <div className="display-table-cell v-align-center">
          <p>{role_label}</p>
        </div>
        <div className="display-table-cell v-align-center align-right">
          <a onClick={remove} className="btn lh-1-1 fs-1-1">{i18n("remove")}</a>
        </div>
      </div>
    </li>
  );
}

class UserRoleManagement extends React.Component {

  constructor(props) {
    super(props);
    let {manager} = props;

    let update = this.forceUpdate.bind(this);
    manager.on("update", update);
  }

  render() {
    let {manager, delegate, store} = this.props;
    let items = [];

    for(let i = 0, c = manager.mappings.length; i < c; i++) {
      let mapping = manager.mappings[i];
      items.push(<Mapping mapping={mapping} key={mapping.id} manager={manager} />);
    }

    if(items.length == 0)
      items = [<li className="collection-item" key="empty"><p>{i18n("empty")}</p></li>];

    function open() {
      let title = i18n("edit_roles");
      let store = tableStore("name", 10);
      let delegate = new Delegate(manager);

      function closed() {
        this.setState({updated: Date.now()});
      }

      let actions   = {closed: closed.bind(this)};
      let selection = <RoleSelection delegate={delegate} manager={manager} store={store} />;
      Modals.open(selection, {title, actions});
    }

    return (
      <div className="admin-user-role-management">
        <div className="clearfix">
          <a className="btn float-right" onClick={open.bind(this)}>{i18n("add")}</a>
        </div>
        <ul className="collection">{items}</ul>
      </div>
    );
  }

}

export default UserRoleManagement;
