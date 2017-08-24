export const ADD_SHOW = 'ADD_SHOW';
export const REMOVE_SHOW = 'REMOVE_SHOW';
export const TOGGLE_EPISODE = 'TOGGLE_EPISODE';
export const USER_DATA_REQUEST = 'USER_DATA_REQUEST';
export const USER_DATA_RECEIVE = 'USER_DATA_RECEIVE';
export const USER_DATA_FAILURE = 'USER_DATA_FAILURE';


export const userDataRequest = (token) => ({
  type: USER_DATA_REQUEST,
  token,
});

export const userDataReceive = (data) => ({
  type: USER_DATA_RECEIVE,
  data,
});

export const userDataFailure = (error) => ({
  type: USER_DATA_FAILURE,
  error,
});
