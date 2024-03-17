export const ApiReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        data: action.payload,
      };
    default:
      return state;
  }
};

export const visitorTypeReducer = (state = {}, action) => {
  switch (action.type) {
    case 'GET_DATA':
      return {
        data: action.payload,
      };
    default:
      return state;
  }
};
