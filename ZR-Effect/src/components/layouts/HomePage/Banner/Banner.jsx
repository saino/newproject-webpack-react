import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import bannerStyle from './banner.css';
import effTxtPNG from './eff-txt.png';
import makeTxtPNG from './make-txt.png';
import defPosterPNG from './def-poster.png';
import advertMP4 from './advert.mp4';

export default class Banner extends Component {
  render() {
    const { style } = this.props;

    return (
      <div className={ bannerStyle[ 'banner' ] } style={ style }>
        <div className={ bannerStyle[ 'banner-inner' ] }>
          <video className={ bannerStyle[ 'banner-advert-video' ] } src={ advertMP4 } controls poster={ defPosterPNG }></video>
          <div className={ bannerStyle[ 'banner-advert-show' ] }>
            <img src={ effTxtPNG } />
            <img src={ makeTxtPNG } />
          </div>
          <div className={ bannerStyle[ 'product-entrance' ] }>
            <Link to="/roto">智能抠像</Link>
            <Link to="/special-effec">特效制作</Link>
          </div>
        </div>
      </div>
    );
  }
}
