import i18n from "services/i18n";
import Modals from "services/modals";
import InputField from "components/forms/input_field";
import Table from "components/admin/domain_table";

import * as ReactDOM from "react-dom";
import * as React from "react";

class Addition extends React.Component {


  constructor(props) {
    super(props);
  }

  render() {
    let {state, props} = this;

    function update({target}) {
      let {value: domain} = target;
      this.setState({domain});
    }

    let input_props = {
      type: "text",
      name: "domain",
      label: i18n("domain"),
      update: update.bind(this),
      value: state ? state.domain : ""
    };

    function save() {
      props.save(state.domain);
    }

    return (
      <div className="clearfix padding-10">
        <div className="clearfix">
          <InputField {...input_props} />
        </div>
        <div className="clearfix margin-top-10">
          <a className="btn" onClick={save}>{i18n("save")}</a>
        </div>
      </div>
    );
  }
}

class Editor extends React.Component {

  constructor(props) {
    super(props);
    let {delegate} = props;

    function update() {
      this.setState({updated: Date.now()});
    }

    delegate.on("update", update, this);
  }

  render() {
    let {delegate, store} = this.props;
    let adder = null;

    function save(domain) {
      Modals.close(adder);

      function success() {
      }

      function failed() {
      }

      delegate.add(domain).then(success).catch(failed);
    }

    function openNew() {
      let domain = {};
      let title  = i18n("new_domain");
      adder = Modals.open(<Addition save={save.bind(this)} />, {title});
    }

    return (
      <div className="clearfix padding-10 align-left">
        <div className="clearfix margin-bottom-10">
          <Table delegate={delegate} store={store} />
        </div>
        <div className="clearfix collapse">
          <div className="float-left">
            <a className="btn" onClick={openNew}>{i18n("add")}</a>
          </div>
        </div>
      </div>
    );
  }
}

export default Editor;
