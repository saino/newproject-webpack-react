import React, { Component } from 'react';
// import styles from './style.css'
export default class ComposeControl extends Component{
    render(){
        return (<div className="compose-control">
            <div className="header"> 第四步 ：素材植入</div>
            <style>{`
          .pick {
            font-size: 14px;
            font-family: 'microsoft yahei';
            display: flex;
            flex-flow: column nowrap;
            align-items: stretch;
          }

          .compose-control> .header {
            text-align: center;
            line-height: 40px;
            color: #fff;
            background: #2d8bbd;
          }

          .pick > .main {
            flex: 1;
          }
        `}</style>
        </div>)
    }
}