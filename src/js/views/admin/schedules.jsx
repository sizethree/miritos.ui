import Table from "../../components/admin/schedule_table";

class Schedules extends React.Component {

  constructor(props) {
    super(props)

    function update() {
      this.forceUpdate();
    }

    let {resolved} = props;
    let {table_delegate} = resolved;

    table_delegate.on("update", update.bind(this));
  }

  render() {
    let {resolved} = this.props;
    let {table_delegate, table_store} = resolved;

    return (
      <div className="clearfix row collapse">
        <h5>Schedule Management</h5>
        <div className="margin-top-5 clearfix">
          <Table delegate={table_delegate} store={table_store} />
        </div>
      </div>
    );
  }

}

export default Schedules;
