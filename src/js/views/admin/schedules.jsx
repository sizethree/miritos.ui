import Table from "../../components/admin/schedule_table";

export default function Schedules({resolved: {table_delegate, table_store}}) {
  return (
    <div className="clearfix row collapse">
      <h5>Schedule Management</h5>
      <div className="margin-top-5 clearfix">
        <Table delegate={table_delegate} store={table_store} />
      </div>
    </div>
  );
}
