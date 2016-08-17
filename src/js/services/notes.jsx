define([
  "services/uuid"
], function(Uuid) {

  /* Notes service
   *
   *
   * This service allows components, routes, and any other module to add notifications
   * to the screen. Each call to `add` returns a unique id string similar to the Event
   * class' `on` function.
   *
   * The notifications themselves are then added to the single NotificationBar instance
   * which gets mounted during application startup.
   */

  let opened = [];
  let update = null;
  let mounted = false;

  let NotificationBar = React.createClass({

    componentDidMount() {
      update = latest_id => this.setState({latest_id})
    },

    render() {
      let notes = [];
      let count = opened.length;

      for(let i = 0; i < count; i++)
        notes.push(<Notification text={opened[i].text} key={opened[i].id} />)

      return (
        <div className="position-fixed top-0 left-0 width-50">
          <div className="clearfix">{notes}</div>
        </div>
      )
    }

  });

  let Notification = React.createClass({

    componentDidMount() {
    },

    render() {
      return (
        <div className="align-center display-block">
          <div className="padding-tb-4 padding-lr-18 display-inline-block bg-white">
            <p className="fg-black">{this.props.text}</p>
          </div>
        </div>
      );
    }

  });

  function add(text) {
    let id   = Uuid();
    let note = null;
    opened.push({note, id, text});
    update(id);
    return id;
  }

  function remove(target_id) {
    let count = opened.length;
    let found = null;

    for(let i = 0; i < count; i++) {
      let {note, id} = opened[i];
      if(id !== target_id) continue;
      found = i;
      break;
    }

    if(found === null) return -1;

    opened.splice(found, 1);
    update(null);
    return target_id;
  }

  function mount(target) {
    if(mounted) {
      console.warning("already mounted the notification engine");
      return
    }

    mounted = true;
    ReactDOM.render(<NotificationBar />, target)
  }

  return {add, remove, mount};

});
