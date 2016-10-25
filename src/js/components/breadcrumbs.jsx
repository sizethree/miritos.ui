function item({href, text}) {
  return (
    <div className="breadcrumbs__crumb" key={href}>
      <div className="clearfix">
        <div className="float-right margin-left-5">
          <i className="icon ion-chevron-right"></i>
        </div>
        <div className="overflow-hidden height-auto">
          <a href={href}>{text}</a>
        </div>
      </div>
    </div>
  );
}

function Breadcrumbs({crumbs}) {
  let items = [];

  for(let i = 0, c = crumbs.length; i < c; i++) {
    items.push(item(crumbs[i]));
  }

  return (<div className="clearfix breadcrumbs">{items}</div>);
}

export default Breadcrumbs;
