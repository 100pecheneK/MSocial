import {
  GET_TEST,
  GET_TEST_LOADING,
  GET_TEST_ERROR
} from '../actions/types'

const initialState = {
  test: null,
  loading: true,
}

export default (state = initialState, action) => {
  const {type, payload} = action
  switch (type) {
    case GET_TEST:
      return {
        ...state,
        test: payload,
        loading: false
      }
    case GET_TEST_LOADING:
      return {
        ...state,
        loading: true
      }
    case GET_TEST_ERROR:
      return {
        ...state,
        test: null,
        loading: false,
        error: payload
      }
    default:
      return state
  }
}