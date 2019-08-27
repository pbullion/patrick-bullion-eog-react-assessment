import * as actions from "../actions";

const initialState = {
  heartbeat: null
};

const heartbeatUpdated = (state, action) => {
  return {
    heartbeat: action.heartbeat
  };
};

const handlers = {
  [actions.HEARTBEAT_UPDATED]: heartbeatUpdated,
};

export default (state = initialState, action) => {
  const handler = handlers[action.type];
  if (typeof handler === "undefined") return state;
  return handler(state, action);
};
