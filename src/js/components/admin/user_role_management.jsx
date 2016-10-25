import i18n from "services/i18n";
import ROLES from "var/user_roles";

function mapping(role_mapping) {
  let role_label = null;

  switch(role_mapping.role) {
    case ROLES.ADMIN:
      role_label = i18n("admin");
      break;
  }

  return (
    <li className="collection-item" key={role_mapping.id}>
      <div className="display-table display-table--fixed width-50 height-50">
        <div className="display-table-cell v-align-center">
          <p>{role_label}</p>
        </div>
        <div className="display-table-cell v-align-center align-right">
          <a className="btn lh-1-1 fs-1-1">{i18n("remove")}</a>
        </div>
      </div>
    </li>
  );
}

function UserRoleManagement({mappings: role_mappings, user}) {
  let items = role_mappings.map(mapping);

  if(role_mappings.length == 0)
    items = [<li className="collection-item" key="empty"><p>{i18n("empty")}</p></li>];

  return (
    <div className="admin-user-role-management">
      <div className="clearfix">
        <a className="btn float-right">{i18n("add")}</a>
      </div>
      <ul className="collection">{items}</ul>
    </div>
  );
}

export default UserRoleManagement;
