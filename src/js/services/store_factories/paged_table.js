function sorting(state, action) {
  let result = Object.assign({}, state);

  if(action.type !== "COLUMN_CLICK")
    return result;

  result.rel = action.column.rel;

  if(result.rel === state.rel)
    result.order = !state.order;

  return result;
}

function pagination(state, action) {
  let result = Object.assign({}, state);

  if(action.type === "PAGINATION_TOTAL")
    result.total = action.total;

  if(action.type === "PAGINATION_MOVEMENT")
    result.current += action.amt;

  if(action.type === "PAGINATION_GOTO")
    result.current = action.page;

  return result;
}

export default function store(rel, size) {
  let initial  = {
    sorting: {rel}, 
    pagination: {size, current: 0}
  };
  return Redux.createStore(Redux.combineReducers({sorting, pagination}), initial);
}
