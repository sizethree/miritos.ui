import i18n from "../../services/i18n";
import Table from "../../components/admin/user_table"; 

class Users extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    let {table_delegate, table_store} = this.props.resolved;

    return (
      <div className="clearfix row">
        <h5>{i18n("user_management")}</h5>
        <div className="margin-top-5 clearfix"><Table delegate={table_delegate} store={table_store} /></div>
      </div>
    );
  }

}

export default Users;
