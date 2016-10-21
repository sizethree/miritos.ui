import Popups from "../../services/popups";
import uuid from "../../services/uuid";
import util from "../../services/util";

const TARGET_TOP_BUFFER = 3;
const DATE_FORMAT       = "MMM Do, YYYY";

function format(v) {
  return moment(v).format(DATE_FORMAT);
}

function DatePickerFactory() {
  class DatePicker extends React.Component {

    constructor(props) {
      super(props);
      this.picker_id = uuid();
    }

    render() {
      let {picker_id} = this;
      let {delegate} = this.props;

      let label = "function" == typeof delegate.label ? delegate.label() : null;
      let value = delegate.value() ? format(delegate.value()) : "Not Set";

      // prepare an array that will hold the min and max values of our range
      let range = [];

      let children = [
        <input key="input" name={picker_id} placeholder={value} type="text" disabled />
      ];

      if(label)
        children.push(<label key="label" htmlFor={picker_id} className="active left-0">{delegate.label()}</label>);

      function updated() {
        this.forceUpdate();
      }

      function select(e, new_day) {
        Popups.close(this.popup);
        delegate.select(new_day).then(updated.bind(this));
      }

      function disabled(day) {
        let [min, max] = range;

        // if there is neither a min nor a max, don't filter
        if(!min && !max)
          return false;

        let time = day.getTime();

        // if this date is behind the minimum, filter it out
        if(min && time < min)
          return true;

        return max ? time >= max : false;
      }

      function open({currentTarget: target}) {
        let bounding  = target.getBoundingClientRect();
        let top       = util.dom.px(bounding.top + bounding.height + TARGET_TOP_BUFFER);
        let placement = {top};

        if(bounding.left > window.innerWidth * 0.5) {
          placement.right = util.dom.px(window.innerWidth - (bounding.left + bounding.width));
        } else {
          placement.left = util.dom.px(bounding.left);
        }

        if("function" === typeof delegate.range)
          range = delegate.range();

        let picker = (<DayPicker onDayClick={select.bind(this)} disabledDays={disabled} />);

        this.popup = Popups.open(picker, placement);
      }

      return (
        <div className="hoctable-date-picker input-field clearfix margin-top-0 pointer" onClick={open.bind(this)}>
          <div className="display-table display-table--fixed width-50">
            <div className="hoctable-date-picker__input pointer">{children}</div>
            <div className="hoctable-date-picker__toggle">
              <i className="icon pointer fg-white-darken-20 ion-edit"></i>
            </div>
          </div>
        </div>
      );
    }
  }

  return DatePicker;
}

export default DatePickerFactory;
