import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Menu, Dropdown, Avatar } from 'antd';
import { getUserInfo, logout } from '../../reducers/user';
const MenuItem = Menu.Item;

class LoginAfter extends Component {
  handleLogout = () => {
    this.props.logout();
  };

  getMenu() {
    return (
      <Menu>
        <MenuItem><a href="javascript:;" onClick={ this.handleLogout }>退出</a></MenuItem>
      </Menu>
    );
  }

  componentWillMount() {
    this.props.getUserInfo();
  }

  render() {
    const { user } = this.props;

    return (
      <div>
        <span className="lf-usernick">{ user.user.usernick }</span>
        <span className="lf-dropdown">
        <Dropdown overlay={ this.getMenu() }>
          <Avatar src={ user.user.avatar }></Avatar>
        </Dropdown>
        </span>
        <style>{`
          .lf-usernick {
            margin-right: 10px;
            font-size: 16px;
            vertical-align: middle;
          }
          .lf-dropdown {
            display: inline-block!important;
            background: transparent!important;
            border-color: transparent!important;
            vertical-align: middle;
          }
          `}</style>
      </div>
    );
  }
}

function mapStateToProps ({ user }) {
  return { user };
}

function mapDispatchToProps (dispatch) {
  return {
    logout: bindActionCreators(logout, dispatch),
    getUserInfo: bindActionCreators(getUserInfo, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginAfter);
