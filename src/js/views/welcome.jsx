define([
  "components/hoc/table",
  "components/signup_form",
  "components/login_form"
], function(TableFactory, SignUpForm, LoginForm) {

  class Row extends React.Component {

    constructor(props) {
      super(props)
    }

  }

  let Table = TableFactory(Row);

  class Delegate {

    columns() {
      return [{
        name: "Name",
        rel: "name"
      }, {
        name: "Age",
        rel: "age"
      }];
    }

    rows(callback) {
    }

  }

  class Welcome extends React.Component {

    constructor(props) {
      super(props);
      this.delegate = new Delegate();
    }

    render() {
      return (
        <div className="row">
          <Table delegate={this.delegate} />
        </div>
      );
    }

  };

  return Welcome;

});
