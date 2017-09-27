import { connect } from 'react-redux'
import Login from '../components/login'
import {loginSuc} from '../actions'

// const mapStateToProps=(state)=>{
//     return{
//         userInfo:state.userInfo,
//     }
//   }
export default connect(null, {loginSuc})(Login)