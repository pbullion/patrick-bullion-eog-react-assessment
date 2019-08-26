import * as actions from "../actions";

const initialState = {
  names: []
};

const dataNameReceived = (state, action) => {
  const { getDataNamesSelected } = action;
  const { names } = getDataNamesSelected;

  return {
    names
  };
};

const dataNameAdded = (state, action) => {
  if (action.dataNames.length > 0) {
    let names = [];
    action.dataNames.forEach(item => {
      names.push({ name: item });
    });
    console.log(names);
    return {
      names
    };
  }
  return {
    state
  };
};

const handlers = {
  [actions.DATA_NAME_RECEIVED]: dataNameReceived,
  [actions.DATA_NAME_ADDED]: dataNameAdded
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
