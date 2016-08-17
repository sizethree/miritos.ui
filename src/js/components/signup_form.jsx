define([
], function() {

  function render() {
    return (
      <div className="m-signup-form">
        <div className="margin-bottom-10">
          <h5>Sign Up</h5>
        </div>
        <div className="clearfix">
          <div className="m-signup-form__input-container">
            <input type="text" className="bordered-input" placeholder="Email" />
          </div>
          <div className="m-signup-form__input-container">
            <input type="text" className="bordered-input" placeholder="Name" />
          </div>
          <div className="m-signup-form__input-container">
            <input type="password" className="bordered-input" placeholder="Password" />
          </div>
        </div>
        <div className="clearfix">
          <div className="float-right">
            <a className="rounded-button rounded-button--blue">Submit</a>
          </div>
        </div>
      </div>
    )
  }

  return React.createClass({render});

});
