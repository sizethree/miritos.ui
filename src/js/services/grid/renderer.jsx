import utils from "services/util";

class Renderer {

  constructor(container) {
    this.container = container;
    this.nodes     = [];
  }

  render(items, allocator) {
    let {container, nodes, columns} = this;
    let rendered = [];

    nodes.length = 0;

    for(let i = 0, c = items.length; i < c; i++) {
      let item = items[i];

      if(!item.display)
        continue;

      // create a container element and render the item into it
      let {top, left, width, height} = allocator.occupy(1,1);

      let style = {
        top    : top ? `${top}px` : "",
        left   : left ? `${left}px` : "", 
        width  : width ? `${width}px` : "", 
        height : height ? `${height}px` : ""
      };

      let child = utils.dom.create("div", style, ["feed-display__grid-item"]);
      let node  = <item.display {...item} />;
      ReactDOM.render(node, child);

      // append the child container into the list element
      container.appendChild(child);

      // add the child to our result array
      rendered.push(child);
      nodes.push({child, node});
    }

    return rendered;
  }

}

export default Renderer;
