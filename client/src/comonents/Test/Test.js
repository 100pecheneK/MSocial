import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {getTest} from '../../actions/test'
import {Link} from 'react-router-dom'

const Test = ({test: {loading, test}, getTest}) => {
  useEffect(() => {
    getTest()
  }, [getTest])
  return loading ? <p>Loading...</p> : (
    <>
      <Link to='/'>Home</Link>
      <h1>{test}</h1>
    </>
  )
}

Test.propTypes = {
  test: PropTypes.object.isRequired,
  getTest: PropTypes.func.isRequired,
}

const mapStateToProps = state => ({
  test: state.test
})
export default connect(
  mapStateToProps,
  {getTest}
)(Test)
