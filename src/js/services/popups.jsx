define([
  "services/uuid",
  "services/viewport"
], function(UUID, Viewport) {

  /* popups service
   *
   * Very similar to the Notes services, this module takes care of adding
   * components to the DOM as popups - fixed-position elements that must
   * have a higher z-index than the rest of the content.
   *
   * Additionally, this service is responsible for closing popups when the
   * user clicks outside them, making sure the popups remain bounded within
   * the viewport, etc..
   *
   * Like the Event class and the Notes service, addition and removal of popups
   * is handled through a unique identifier handle.
   */ 

  let root        = null;
  let open_popups = [];
  let mouse       = {start: {}, end: {}};

  const GUTTER_WIDTH = 100;

  function px(amt) {
    return `${amt}px`;
  }

  function create(placement) {
    let div = document.createElement("div");
    div.style.position = "fixed";
    div.style.top = px(placement.top);

    // a right placement trumps a left one
    if(placement.right) {
      div.style.right = px(placement.right);
    } else {
      div.style.left = px(placement.left);
    }
    return div;
  }

  function open(component, placement) {
    let id    = UUID();
    let popup = create(placement);
    ReactDOM.render(component, popup);
    root.appendChild(popup);


    // now we need to make sure the popup remains inside the bounds
    let bounding = popup.getBoundingClientRect();
    let ldist    = (bounding.left + bounding.width) - (window.innerWidth - GUTTER_WIDTH);

    if(ldist > 0)
      popup.style.left = px(placement.left - GUTTER_WIDTH);

    if(bounding.left < GUTTER_WIDTH)
      popup.style.left = px(placement.left + GUTTER_WIDTH);

    open_popups.push({id, popup});
    return id;
  }

  function close(popup_id) {
    let count = open_popups.length;

    for(let i = 0; i < count; i++) {
      let p = open_popups[i];
      if(p.id !== popup_id) continue;
      let node = ReactDOM.findDOMNode(p.popup)
      ReactDOM.unmountComponentAtNode(node);
      node.parentNode.removeChild(node);
      open_popups.splice(i, 1);
      return popup_id;
    }

    return -1;
  }

  function mount(target) {
    root = target;
  }

  // contains
  //
  // checks to see if a given child node is a descendant of a given parent
  // node (target)
  function contains(target, child) {
    let head = child.parentNode;

    while(head != null) {
      if (head == target) return true;
      head = head.parentNode;
    }

    return false;
  }

  function closeOpen(e) {
    let count  = open_popups.length;
    let target = e.target;

    // if this was a drag event - do nothing
    if(mouse.start.x !== mouse.end.x || mouse.start.y !== mouse.end.y)
      return true;

    // loop over our open popups closing those that are not associated with this event
    for(let i = 0; i < count; i++) {
      let popup = open_popups[i];
      let node = ReactDOM.findDOMNode(popup.popup)

      // if this node is inside the target of the click - continue
      if(contains(node, target)) continue;

      // otherwise close it
      close(popup.id);
    }

    return true;
  }

  Viewport.on("mousedown", function(e) {
    mouse.start = {x: e.clientX, y: e.clientY};
  });

  Viewport.on("mouseup", function(e) {
    mouse.end = {x: e.clientX, y: e.clientY};
  });

  Viewport.on("click", closeOpen);

  return {open, close, mount};

});
