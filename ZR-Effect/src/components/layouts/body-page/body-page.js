import React, { Component } from 'react';
// import 'body-page.css';
class Body extends Component {
    render(){
        return <div className='body'>
            {this.props.children}
            <style>{`
                .body{
                    height: calc(100% - 50px);
                    width: 100%;
                    position: absolute;
                    display: flex;
                }
            `}</style>
        </div>
    };
}

export default Body;