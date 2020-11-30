const initialState = {
  status: 'All',
  colors: [],
};

export default function filtersReducer(state = initialState, action) {
  switch (action.type) {
    case 'filters/statusFilterChanged': {
      return {
        ...state,
        status: action.payload
      }
    }
    case 'filters/colorFilterChanged':
      return {
        ...state,
        colors: action.changeType === 'add' 
          ? [...state.colors, action.color]
          : state.colors.filter(color => color !== action.color),
      };
    default:
      return state
  }
}
