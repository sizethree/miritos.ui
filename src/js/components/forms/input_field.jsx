import i18n from "services/i18n";


class InputField extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const {update, label, name, value, type} = this.props;
    let label_class = value || (this.state && this.state.focused) ? "active" : null;

    let extra = {type};

    if(this.props.disabled === true)
      extra.disabled = true;

    function focused() {
      this.setState({focused: true});
    }

    function blur() {
      this.setState({focused: false});
    }

    function click() {
      if(extra.disabled) return;
      let {input_el} = this.refs;
      input_el.focus();
      this.setState({focused: true});
    }

    return (
      <div className="input-field columns col large-12">
        <input ref="input_el" name={name} value={value} {...extra} onChange={update} onFocus={focused.bind(this)} onBlur={blur.bind(this)}/>
        <label className={label_class} htmlFor={name} onClick={click.bind(this)}>{label}</label>
      </div>
    );
  }

}

export default InputField;

