export const StatusFilters = {
  All: 'All',
  Active: 'Active',
  Completed: 'Completed',
};

export const ColorsFilters = {
  Green: 'green',
  Blue: 'blue',
  Orange: 'orange',
  Purple: 'purple',
  Red: 'red',
};

const initialState = {
  status: StatusFilters.All,
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
        colors: action.payload.changeType === 'selected' 
          ? [...state.colors, action.payload.color]
          : state.colors.filter(color => color !== action.payload.color),
      };
    default:
      return state
  }
}
