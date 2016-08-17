define([
  "services/popups"
], function(Popups) {

  const TARGET_TOP_BUFFER = 3;

  function ActionMenu(ButtonComponent, PopupComponent) {

    function getInitialState() {
      return {popup: null};
    }

    function componentWillUnmount() {
      Popups.close(this.state.popup);
    }

    function open(event) {
      let target    = event.currentTarget;
      let bounding  = target.getBoundingClientRect();
      let top       = bounding.top + bounding.height + TARGET_TOP_BUFFER;
      let placement = {top};

      if(bounding.left > window.innerWidth * 0.5) {
        placement.right = window.innerWidth - (bounding.left + bounding.width);
      } else {
        placement.left = bounding.left;
      }

      // open the popup component with all of the props that were given to us
      let popup = Popups.open(<PopupComponent {...this.props} />, placement);

      // update our state with the popup id so we may close it on unmount
      this.setState({popup});
    }

    function render() {
      return (
        <div className="action-menu clearfix display-inline-block">
          <div className="display-inline-block" onClick={this.open}><ButtonComponent /></div>
        </div>
      )
    }

    return React.createClass({render, open, getInitialState, componentWillUnmount});
  }

  return ActionMenu;

});
