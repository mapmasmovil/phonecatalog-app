export const FETCH_PHONES = 'phones/FETCH_PHONES'
export const FETCH_PHONES_SUCCESS = 'phones/FETCH_PHONES_SUCCESS'
export const FETCH_PHONES_FAIL = 'phones/FETCH_PHONES_FAIL'


const initialState = {
  phones: [],
}

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case FETCH_PHONES:
      return {
        ...state,
        loading: true,
      }

    case FETCH_PHONES_SUCCESS:
      return {
        ...state,
        loading: false,
        phones: action.payload.data.phones,
      }

    case FETCH_PHONES_FAIL:
      return {
        ...state,
        loading: false,
        error: 'Error while fetching phones'
      }

    default:
      return state
  }
}

export function fetchPhones() {
  return {
    type: FETCH_PHONES,
    payload: {
      request: {
        url: `phones/`
      }
    }
  }
}
