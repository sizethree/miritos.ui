import TableFactory from "components/hoc/table";
import PaginationFactory from "components/hoc/pagination";
import util from "services/util";
import uuid from "services/uuid";

function PagedTableFactory(RowTransclusion, ColumnTransclusion, PageTransclusion) {
  let Table      = TableFactory(RowTransclusion, ColumnTransclusion);
  let Pagination = PaginationFactory(PageTransclusion);

  class PagedTable extends React.Component {

    constructor(props) {
      super(props);
      let {store, delegate} = props;
      let cache = props.cache || [];
      this.total = 0;

      function rows(store, callback) {
        let {temp, total} = this;

        // if we're being called because the paged table is re-rendering - e.g it received 
        // a new "total" from the api - we know to use the previously loaded data.
        if(temp === true)
          return callback(cache, total);

        // once the real delegate has finished loading it's data, we should update our cache
        // of the row data, send that along to the waiting table, and let the paged table know
        // that it has a new total.
        function loaded(rows, total) {
          this.total = total;
          util.replace(cache, rows);
          this.temp = true;
          callback(rows, total);
          this.forceUpdate();
          this.temp = false;
        }

        delegate.rows(store, loaded.bind(this));
      }

      function columns() {
        return delegate.columns();
      }

      // create a proxy delegate that is smart about letting this component know
      // when it has loaded in new rows, and is able to be told to use cached data.
      this.proxy = {rows: rows.bind(this), columns, uuid: uuid()};
    }

    componentWillUnmount() {
    }

    render() {
      // reference the props, proxy and state (which has the total)
      let {props, proxy, state, total} = this;

      // get the shared state store from the props
      let {store} = props;

      // get the current page and the page size from our pagination store
      let {pagination: {size, current}} = store.getState();

      // create a tiny proxy for the pagination hoc we'll be using
      let pagination_store = {
        getState() { return {size, current, total}; },
        dispatch(payload) { return store.dispatch(payload); }
      };

      // create the two composed components we need to render
      let table = <Table delegate={proxy} store={store} />;
      let pager = <Pagination store={pagination_store} />;

      return (
        <div className="hoctable-paged-table">
          <div className="hoctable-paged-table__table">{table}</div>
          <div className="hoctable-paged-table__pagination">{pager}</div>
        </div>
      );
    }

  }

  return PagedTable;
}

export default PagedTableFactory;
