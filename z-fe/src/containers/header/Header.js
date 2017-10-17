import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkExpiredStatus } from '../../utils/auth';
import LoginBefore from './LoginBefore';
import LoginAfter from './LoginAfter';
import logoPNG from '../../statics/logo.png';

const style = () => ({

  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    color: '#fff',
    fontSize: 14,
    fontFamily: 'microsoft Yahei',
    background: 'rgba(30,30,30,.5)',
    zIndex: 1
  },

  rootInner: {
    display: 'flex',
    flexFlow: 'row nowrap',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: 1170,
    margin: '0 auto',
    height: 54
  },

  logo: {
    display: 'inline-block',
  },

  logoImg: {
    display: 'inline-block',
    width: 36,
    height: 31,
    verticalAlign: 'middle'
  },

  logoText: {
    marginLeft: 10,
    fontSize: 20,
    verticalAlign: 'middle',
    color: '#fff'
  },

  nav: {
    display: 'flex'
  },

  navItem: {
    position: 'relative',
    margin: '0 15px',
    padding: '8px 10px'
  },

  navItemText: {
    color: '#fff'
  },

  navBottomLine: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    width: 0,
    margin: '0 auto',
    height: 1,
    background: '#ff6b00',
    transition: 'width .2s ease'
  }

});

function getEl (fn) {
  return e => {
    const el = e.currentTarget;
    const lineEl = el.querySelector('span');
    const textEl = el.querySelector('a');

    fn(lineEl, textEl);
  };
}

class Header extends Component {
  static propTypes = {
    onOpenLoginForm: PropTypes.func.isRequired,
    onOpenRegisterForm: PropTypes.func.isRequired
  };

  handleShowBottomLine = getEl((lineEl, textEl) => {
    lineEl.style.width = '80%';
    textEl.style.color = '#ff6b00';
  });
  handleHideBottomLine = getEl((lineEl, textEl) => {
    lineEl.style.width = 0;
    textEl.style.color = '#fff';
  });

  render() {
    const { user, onOpenLoginForm, onOpenRegisterForm } = this.props;
    const {
      root, rootInner,
      logo, logoImg, logoText,
      nav, navItem, navItemText, navBottomLine
    } = style();

    return (
      <div style={ root }>
        <div style={ rootInner }>

          <Link to="/" style={ logo } >
            <img style={ logoImg } src={ logoPNG } />
            <span style={ logoText }>LIANGZIVFX</span>
          </Link>

          <ul style={ nav }>
            <li style={ navItem } onMouseOver={ this.handleShowBottomLine } onMouseOut={ this.handleHideBottomLine }>
              <a href="#intro" style={ navItemText }>网站介绍</a>
              <span style={ navBottomLine }></span>
            </li>
            <li style={ navItem } onMouseOver={ this.handleShowBottomLine } onMouseOut={ this.handleHideBottomLine }>
              <a href="#use" style={ navItemText }>如何使用</a>
              <span style={ navBottomLine }></span>
            </li>
            <li style={ navItem } onMouseOver={ this.handleShowBottomLine } onMouseOut={ this.handleHideBottomLine }>
              <a href="#about" style={ navItemText }>联系我们</a>
              <span style={ navBottomLine }></span>
            </li>
          </ul>

          {checkExpiredStatus() ?
            <LoginBefore onOpenLoginForm={ onOpenLoginForm } onOpenRegisterForm={ onOpenRegisterForm }  /> :
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
