import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { checkExpiredStatus } from '../../utils/auth';
import LoginBefore from './LoginBefore';
import LoginAfter from './LoginAfter';
import style from './style.css';

class Header extends Component {
  static propTypes = {
    onOpenLogin: PropTypes.func.isRequired,
    onOpenRegister: PropTypes.func.isRequired
  };

  render() {
    const { user, onOpenLogin, onOpenRegister } = this.props;

    return (
      <div className={ style.wrapper }>
        <div className={ style.wrapperInner }>
          <div className={ style.logo }></div>
          <ul className={ style.nav }></ul>
          {checkExpiredStatus() ?
            <LoginBefore onOpenLogin={ onOpenLogin } onOpenRegister={ onOpenRegister }  /> :
            <LoginAfter userInfo={ user.user } />
          }
        </div>
      </div>
    );
  }
}

function mapStateToProps (state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(Header);
