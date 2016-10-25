import Table from "../hoc/paged_table";
import date from "../../services/formatters/date";
import Menu from "./user_menu";

function Row({row: {user}}) {
  let detail_url = `/admin/users/${user.id}`;

  return (
    <tr className="admin-user-row">
      <td className="admin-user-row__id">
        <span>{user.id}</span>
      </td>
      <td className="admin-user-row__name">
        <a href={detail_url}><span>{user.name}</span></a>
      </td>
      <td className="admin-user-row__email">
        <span>{user.email}</span>
      </td>
      <td className="admin-user-row__date-created">
        <span>{date(user.created_at)}</span>
      </td>
      <td className="admin-user-row__date-updated">
        <span>{user.updated_at ? date(user.updated_at) : ""}</span>
      </td>
      <td className="admin-user-row__user-menu">
        <Menu user={user} />
      </td>
    </tr>
  );
}

export default Table(Row);
