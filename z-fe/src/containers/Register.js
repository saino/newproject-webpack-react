import { connect } from 'react-redux'
import Register from '../components/register'
import { register } from '../actions'

export default connect(undefined, {register})(Register)