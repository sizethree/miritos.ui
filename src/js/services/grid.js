import util from "services/util";

export default class Grid {

  constructor(width, height, columns) {
    let box  = Math.floor(width / columns);
    let rows = Math.floor(height / box);

    this.dimensions = {width, height};
    this.size       = {x: columns, y: rows, box};
    this.store      = new Array(this.size.x * this.size.y);
  }

  occupy(colspan, rowspan, symbol) {
    let {dimensions, store, size} = this;
    let cursor = null;

    // loop over the store, finding the next available block we can use
    for(let i = 0, c = store.length; i < c; i++) {
      let column = i % size.x;

      // if there is no more room for on this row, move on
      if(column + colspan > size.x)
        continue;

      let safe = true;

      // at this point we have enough "x" space, we need to check y space
      for(let x = 0; x < rowspan && safe; x++) {
        let row_offset = x * size.x;

        // check this rows columns
        for(let y = 0; y < colspan; y++) {
          let cell = i + (y + row_offset);
          if(!store[cell]) continue;

          // we've hit a cell that has stuff, stop with this row
          safe = false;
          break;
        }
      }

      if(!safe) continue;

      // if this group is available, store it and move on
      cursor = i;
      break;
    }

    if(cursor == null)
      return cursor;

    // now that we have a valid starting cell, loop over the grid filling in the places
    for(let i = 0; i < rowspan; i++) {
      let row_offset = i * size.x;

      for(let j = 0; j < colspan; j++) {
        let cell = cursor + (j + row_offset);
        store[cell] = symbol || true;
      }
    }

    let column = cursor % size.x;
    let row    = Math.floor(cursor / size.x);

    let width  = colspan * size.box;
    let height = rowspan * size.box;
    let left   = column * size.box;
    let top    = row * size.box;

    return {width, height, left, top};
  }

  print(writer) {
    let {store, size} = this;
    let message = "-----\n";

    for(let i = 0, c = store.length; i < c; i++) {
      let column = i % size.x;

      message += `[${store[i] ? store[i] : "      "}]`;

      if(column === size.x - 1)
        message += "\n";
    }

    message += "\n-----\n";
    writer(message);
  }

  get rows() {
    return this.size.y;
  }

  get columns() {
    return this.size.x;
  }

}
