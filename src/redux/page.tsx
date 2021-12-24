export const pageName = (
  state: 'home' | 'favorites' = 'home',
  action: {
    type: 'SET_PAGE_NAME';
    value: 'home' | 'favorites';
  }
) => {
  switch (action.type) {
    case 'SET_PAGE_NAME':
      return action.value;

    default:
      return state;
  }
};

export const setPageName = (value: 'home' | 'favorites') => {
  return {
    type: 'SET_PAGE_NAME',
    value,
  };
};