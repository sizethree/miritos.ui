export default function Factory(Transclusion) {
  let displayName = "list-view";

  function render() {
    let {delegate, classes} = this.props;
    let items = delegate.items();
    let nodes = [];
    let count = items.length;

    if(!classes)
      classes = "list-view clearfix";

    for(let i = 0; i < count; i++) {
      let item = items[i];
      nodes.push(<Transclusion item={item} delegate={delegate} key={i} />);
    }

    return (
      <div className={classes}>{nodes}</div>
    );
  }

  return React.createClass({render, displayName});
};
