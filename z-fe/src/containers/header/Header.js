import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { checkExpiredStatus } from '../../utils/auth';
import LoginBefore from './LoginBefore';
import LoginAfter from './LoginAfter';
import logoPNG from '../../statics/logo.png';

const styles = () => ({

  root: {
    position: 'absolute',
    left: 0,
    top: 0,
    width: '100%',
    color: '#fff',
    height: 54,
    fontSize: 14,
    fontFamily: 'microsoft Yahei',
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
    onOpenLoginForm: PropTypes.func,
    onOpenRegisterForm: PropTypes.func
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
    const { user, onOpenLoginForm, onOpenRegisterForm, style } = this.props;
    const {
      root, rootInner,
      logo, logoImg, logoText,
      nav, navItem, navItemText, navBottomLine
    } = styles();

    return (
      <div style={{ ...root, ...style }}>
        <div style={ rootInner }>

          <Link to="/" style={ logo } >
            <img style={ logoImg } src={ logoPNG } />
            <span style={ logoText }>LIANGZIVFX</span>
          </Link>

          <ul style={ nav }>
            <li style={ navItem } onMouseOver={ this.handleShowBottomLine } onMouseOut={ this.handleHideBottomLine }>
              <Link to="/#intro" style={ navItemText }>网站介绍</Link>
              <span style={ navBottomLine }></span>
            </li>
            <li style={ navItem } onMouseOver={ this.handleShowBottomLine } onMouseOut={ this.handleHideBottomLine }>
              <Link to="/#use" style={ navItemText }>如何使用</Link>
              <span style={ navBottomLine }></span>
            </li>
            <li style={ navItem } onMouseOver={ this.handleShowBottomLine } onMouseOut={ this.handleHideBottomLine }>
              <Link to="/#about" style={ navItemText }>联系我们</Link>
              <span style={ navBottomLine }></span>
            </li>
          </ul>

          {checkExpiredStatus() ?
            <LoginBefore onOpenLoginForm={ onOpenLoginForm } onOpenRegisterForm={ onOpenRegisterForm }  /> :
            <LoginAfter userInfo={ user.user } />
          }

        </div>
        <style>{`
          a:link {
            text-decoration: none;
          }
        `}</style>
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
