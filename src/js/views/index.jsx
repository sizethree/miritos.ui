define([
  "components/header",
], function(Header) {

  function componentDidMount() {
  }

  function componentWillUnmount() {
  }

  function render() {
    return (
      <div className="clearfix">
        <Header />
        <div className="padding-tb-50 clearfix row"></div>
      </div>
    );
  }

  return React.createClass({render, componentDidMount, componentWillUnmount})

});
