import React, { Component } from 'react';
import ComposeRenderP from '../../components/compose/ComposeRender'
import {connect} from 'react-redux'
import {changePosision,changeContralPosision} from '../../reducers/compose'

function mapStatToProps({compose}) {
    return {compose}
}
export default connect(mapStatToProps,{changePosision,changeContralPosision})(ComposeRenderP)