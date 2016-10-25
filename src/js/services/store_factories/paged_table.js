import reducers from "../reducers";

const {sorting, pagination} = reducers;

export default function store(rel, size) {
  let initial  = {
    sorting: {rel}, 
    pagination: {size, current: 0}
  };
  return Redux.createStore(Redux.combineReducers({sorting, pagination}), initial);
}
