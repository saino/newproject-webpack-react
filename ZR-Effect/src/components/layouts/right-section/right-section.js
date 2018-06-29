import React, { Component } from 'react';

class RightSection extends Component {
    render() {
        return <div className='right-section'>
            {this.props.children}
            <style>{`
                .right-section{
                    background: #031016;
                    flex: 1;
                }
            `}</style>
        </div>
    };
}

export default RightSection;