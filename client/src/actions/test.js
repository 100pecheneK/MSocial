import axios from 'axios'
import {
  GET_TEST,
  GET_TEST_LOADING,
  GET_TEST_ERROR
} from "./types"

export const getTest = () => async dispatch => {
  dispatch({type: GET_TEST_LOADING})
  try {
    const res = await axios.get('/api/test')
    dispatch({
      type: GET_TEST,
      payload: res.data
    })
  } catch (e) {
    const errors = e.response.data.errors.map(error => error.msg)
    dispatch({
      type: GET_TEST_ERROR,
      payload: errors
    })
  }
}