import React, { Component } from 'react';

class LeftSidebar extends Component {
    render() {
        return <div className='left-sidebar'>
            {this.props.children}
            <style>{`
                .left-sidebar{
                    width: 160px;
                    background: #264246;
                }
            `}</style>
        </div>
    };
}

export default LeftSidebar;