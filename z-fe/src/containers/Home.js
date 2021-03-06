import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Modal } from 'antd';
import jsfeat from 'jsfeat'

/* 自定义组件 */
import Header from './header/Header';
import Footer from './footer/Footer';
import Login from '../components/auth/Login';
import Register from '../components/auth/Register';

/* 资源（后续将写入css文件中） */
import hdJPG from '../statics/zr_bg.jpg';
import introJPG from '../statics/intro_sumary.jpg';
import introCategoryJPG from '../statics/intro_category.jpg';
import useOneJPG from '../statics/use_one.jpg';
import useTwoSSPNG from '../statics/ss.png';
import useTwoPNG from '../statics/use_two.png';
import useThreePNG from '../statics/use_three.png';

import config from '../config';
import { scrollToAnchor } from '../utils/link';

const style = () => ({
  root: {
    position: 'relative'
  },
  hd: {
    height: 750,
    position: 'relative'
  },
  hdImg: {
    display: 'block',
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  },
  makeBtn: {
    position: 'absolute',
    left: 0,
    right: 0,
    width: 150,
    margin: '0 auto',
    border: '0 none',
    borderRadius: 65,
    bottom: 235,
    lineHeight: '50px',
    color: '#000',
    background: '#FEF200',
    fontSize: 14,
    textAlign: 'center'
  },
  intro: {
    background: '#fff',
    height: 265,
    padding: '63px 0 60px',
    textAlign: 'center',
    boxSizing: 'border-box'
  },
  introCaption: {
    fontFamily: 'microsoft yahei',
    color: '#000',
    fontSize: 32,
    fontWeight: 500,
    marginBottom: 34,
    letterSpacing: 7,
    lineHeight: 1
  },
  introSumary: {
    display: 'inline-block',
    width: 521,
    height: 77
  },
  introCategory: {
    background: '#f6f6f6'
  },
  introCategoryInner: {
    padding: '79px 0 93px',
    width: 979,
    margin: '0 auto'
  },
  introCategoryImg: {
    display: 'block',
    width: '100%',
    height: 193
  },

  use: {
    background: '#fff'
  },

  useOne: {
    width: 881,
    height: 309,
    margin: '90px auto 0'
  },

  useImg: {
    display: 'block',
    width: '100%',
    height: '100%'
  },

  useTwo: {
    position: 'relative',
    marginTop: 40,
    height: 781
  },

  useTwoInner: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 134,
    width: 611,
    height: 454,
    margin: '0 auto'
  },

  useThree: {
    width: 930,
    height: 318,
    margin: '100px auto'
  }

});

class Home extends Component {

  handleOpenLoginForm = () => {
    this.setState({ visibleLoginForm: true });
  };
  handleCloseLoginForm = () =>
    this.setState({ visibleLoginForm: false });
  handleOpenRegisterForm = () =>
    this.setState({ visibleRegisterForm: true });
  handleCloseRegisterForm = () =>
    this.setState({ visibleRegisterForm: false })

  state = {
    visibleLoginForm: false,
    visibleRegisterForm: false
  };

  render() {
    // console.log("homeLLLLLLL");
    var columns = 640, rows = 480, levels = 3;
    var data_type = jsfeat.U8_t | jsfeat.C1_t;
    var my_pyramid = new jsfeat.pyramid_t(levels);
    my_pyramid.allocate(columns, rows, data_type);
    console.log(my_pyramid);
    
    // console.log(dd,my_pyramid);
    // var data_buffer = new jsfeat.data_t(columns * rows*4);
    // console.log(data_buffer);
    // var my_matrix = new jsfeat.matrix_t(columns, rows, data_type, data_buffer);
    // // var my_matrix = new jsfeat.matrix_t(columns, rows, data_type);
    // var newInput = document.createElement("input"); 
    // newInput.type = "file",
    // newInput.src = "http://localhost:3000" + useThreePNG;
    // newInput.value = "http://localhost:3000" + useThreePNG;
    // console.log(newInput, newInput.files, newInput.files[0]);

    // console.log("data_type---->",data_type);
    // console.log("data_buffer---->", data_buffer);
    // console.log("my_matrix---->", my_matrix);
    // console.log("imgage_data---->", useThreePNG);

    // var image = new Image();
    // image.src = "http://localhost:3000"+useThreePNG;
    // image.onload = () => {
    //   console.log(image, "ddddd");
    //   console.log(image.files);
    //   console.log(image.files[0]);
      // var reader = new FileReader(image);
      // var data = reader.readAsDataURL();
      // console.log(data);
      // console.log(reader);
      // reader
    // }

    // var reader  = new FileReader();
    // console.log(reader);
    // var dd = reader.readAsArrayBuffer(useThreePNG);
    // console.log(dd);
    // jsfeat.optical_flow_lk.track(prev_pyr: pyramid_t, curr_pyr: pyramid_t,
    //   prev_xy: Array, curr_xy: Array, count,
    //   win_size, max_iter = 30, status: Array = null,
    //   eps = 0.01, min_eigen_threshold = 0.0001);
    console.log(jsfeat);
    const {
      root,
      hd, hdImg, makeBtn,
      intro, introCaption, introSumary,
      introCategory, introCategoryInner, introCategoryImg,
      use, useOne, useImg, useTwo, useTwoInner, useThree } = style();
    const { visibleLoginForm, visibleRegisterForm } = this.state;

    return (
      <div className="wrapper" style={ root }>

        <Header style={{ background: 'rgba(30,30,30,.5)' }} onOpenLoginForm={ this.handleOpenLoginForm } onOpenRegisterForm={ this.handleOpenRegisterForm } />

        <div className="main">

          {/* 广告 */}
          <div style={ hd }>
            <img src={ hdJPG } style={ hdImg } />
            <Link to="/works" style={ makeBtn }>开始制作</Link>
          </div>

          {/* 产品介绍 */}
          <div id='intro' style={ intro }>
            <h3 style={ introCaption }>产品介绍</h3>
            <img src={ introJPG } style={ introSumary } />
          </div>
          <div style={ introCategory }>
            <div style={ introCategoryInner }>
              <img src={ introCategoryJPG } style={ introCategoryImg } />
            </div>
          </div>

          {/* 如何使用 */}
          <div id='use' style={ use }>
            <div style={ useOne }>
              <img src={ useOneJPG } style={ useImg } />
            </div>
            <div style={ useTwo }>
              <img src={ useTwoSSPNG } style={ useImg } />
              <div style={ useTwoInner }>
                <img src={ useTwoPNG } style={ useImg } />
              </div>
            </div>
            <div style={ useThree }>
              <img src={ useThreePNG } style={ useImg } />
            </div>
          </div>

        </div>

        <Footer />

        {/* 登录\注册 对话框 */}
        <Modal
          title="登录"
          onCancel={ this.handleCloseLoginForm }
          footer={ config.dialog.footerVisible }
          wrapClassName={ config.dialog.wrapClassName }
          width={ config.dialog.width }
          visible={ visibleLoginForm }>
          <Login onLogin={ this.handleCloseLoginForm } />
        </Modal>
        <Modal
          title="注册"
          onCancel={ this.handleCloseRegisterForm }
          footer={ config.dialog.footerVisible }
          wrapClassName={ config.dialog.wrapClassName }
          width={ config.dialog.width }
          visible={ visibleRegisterForm }>
          <Register onRegister={ this.handleCloseRegisterForm } />
        </Modal>

        {/* 对话框样式 */}
        <style>{ config.dialog.centerStyle }</style>
      </div>
    );
  }

  componentDidUpdate() {
    scrollToAnchor();
  }

  componentDidMount() {
    scrollToAnchor();
  }
}

function mapStateToProps ({ app }) {
  return {
    app
  };
}
function mapDispatchToProps (dispatch) {

}

export default connect(mapStateToProps)(Home);
