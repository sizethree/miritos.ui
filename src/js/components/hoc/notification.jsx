function Factory({children, options}) {
  let {type} = options || {type: "standard"};
  let className = `truncate notification notification--${type}`;

  return (<div className={className}>{children}</div>);
}

export default Factory;
