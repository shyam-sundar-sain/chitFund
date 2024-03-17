export const getDataMethod = Data => {
  // console.log('getDataMethod-action', Data);
  return {
    type: 'GET_DATA',
    payload: Data,
  };
};

export const getVisitorData = Data => {
  // console.log('getVisitorData-actionn', Data);
  return {
    type: 'GET_DATA',
    payload: Data,
  };
};
