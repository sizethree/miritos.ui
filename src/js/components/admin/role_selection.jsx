import i18n from "services/i18n";
import Notes from "services/notes";
import Table from "components/hoc/paged_table";

class RoleRow extends React.Component {

  constructor(props) {
    super(props)
  }

  removeMapping() {
    let {row} = this.props;
    let {manager, role} = row;

    function success() {
      // this.setState({updated: Date.now()});
    }

    manager.remove(role).then(success.bind(this));
  }

  addMapping() {
    let {row} = this.props;
    let {manager, role} = row;

    function success() {
      // this.setState({updated: Date.now()});
    }

    manager.add(role).then(success.bind(this));
  }

  render(){ 
    let {row} = this.props;
    let {role, manager} = row;

    function action(handler, lang) {
      return (<a className="btn" onClick={handler}>{i18n(lang)}</a>);
    }

    let remove = this.removeMapping.bind(this);
    let add    = this.addMapping.bind(this);

    let button = manager.contains(role) ? action(remove, "remove") : action(add, "add");

    return (
      <tr className="admin-role-row">
        <td className="admin-role-row__name">
          <p>{role.label}</p>
        </td>
        <td className="admin-role-row__description">
          <p>{role.description}</p>
        </td>
        <td className="admin-role-row__action">
          <div className="align-center">{button}</div>
        </td>
      </tr>
    );
  }
}

const RoleTable = Table(RoleRow);

class RoleSelection extends React.Component {

  constructor(props) {
    super(props);
    let {manager, store} = props;

    function update() {
      store.dispatch({type: "REFRESH", date: Date.now()});
    }

    manager.on("update", update.bind(this));
  }

  render() {
    let {store, delegate} = this.props;

    return (
      <div className="padding-10 bg-white display-inline-block">
        <div className="clearfix"><RoleTable delegate={delegate} store={store} /></div>
      </div>
    );
  }

}

export default RoleSelection;
