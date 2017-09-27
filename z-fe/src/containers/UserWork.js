import { connect } from 'react-redux'
import Works from '../components/user/works'

const mapStateToProps=(state)=>{
  return{
      worksInfo:state.worksInfo
  }
}

export default connect(mapStateToProps )(Works)