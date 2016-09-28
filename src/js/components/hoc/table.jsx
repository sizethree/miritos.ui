define([
], function() {

  class ColumnHead extends React.Component {

    sort() {
      let {delegate} = this.props;
    }

    render() {
      let {col, delegate} = this.props;

      return (
        <th onClick={this.sort.bind(this)}>{col.name}</th>
      );
    }

  }

  function Factory(RowComponent) {
    class Table extends React.Component {

      constructor(props) {
        super(props);
        console.log(this.props);
      }

      render() {
        let {delegate} = this.props;
        let columns = delegate.columns();
        let th_list = [];

        for(let i = 0, c = columns.length; i < c; i++) {
          th_list.push(<ColumnHead delegate={delegate} col={columns[i]} key={columns[i].rel} />);
        }

        return (
          <table>
            <thead><tr>{th_list}</tr></thead>
            <tbody></tbody>
          </table>
        )
      }

    }

    return Table;
  }

  return Factory;

});
