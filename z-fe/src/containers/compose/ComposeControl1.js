import React, { Component } from 'react';
import { Button } from 'antd'
import DragList from 'react-draggable-list'
import classNames from 'classnames'
import { connect } from 'react-redux'
import { addMaterial, changeLayer, select, removeMaterial, toggleMaterial } from '../../reducers/compose'
import ToggleViewImg from '../../statics/toggle_view.png'

class ComposeControl extends Component {
    render() {
        console.log(this);
        return (
            <div className="compose-control">
                <div className="header">第四步： 素材植入</div>
                <div className="addMaterial" onClick={this.onAddMaterialClick}>
                    <Button icon="plus" type="primary">添加素材</Button>
                </div>
                <ul className="material-list">
                    {/* <DragList> */}
                </ul>
                <div className="material-complete">完成植入</div>

                <style>{`
                    .compose-control{
                        height: 100%;
                        width: 200px;
                    }
                    .compose-control> .header {
                        text-align: center;
                        line-height: 40px;
                        color: #fff;
                        background: #2d8bbd;
                    }
                    .compose-control> .addMaterial {
                        width:90%;
                        margin:0 auto;
                        margin-top:16px;
                        margin-bottom:16px;
                    }
                    .compose-control> .addMaterial button {
                        width:100%;
                    }
                    .material-complete {
                        
                    }
                `}</style>
            </div>
        );
    }
    onAddMaterialClick = () => {
    }
}
const mapStatToProps = ({ material }) => {
    return {
        material
    }
}
export default connect(mapStatToProps)(ComposeControl);