import React, {Component} from "react"

class Container extends Component {
    render() {
        return <div className="container">
            <div className="container-inner">
                {this.props.children}
            </div>
            <style>{`
                .container{
                    position: absolute;
                    background: #000;
                    height: calc(100% - 50px);
                    width: 100%;
                }
                .container-inner{
                    display: flex;
                    flex-flow: column nowrap;
                    height: 100%;
                }
            `}</style>
        </div>;
    }
}

export default Container;