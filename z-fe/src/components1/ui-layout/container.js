import React, {Component} from "react"

class Container extends Component {
    render() {
        return <div className="container">
            {this.props.children}
            <style>{`
                .container{
                    position: absolute;
                    background: #000;
                    height: 100%;
                    width: 100%;
                }
            `}</style>
        </div>;
    }
}

export default Container;