import React, { Component } from 'react';
import ComposeControlP from '../../components/controls/ComposeControl'
import {connect} from 'react-redux'
import {addMaterial,changeLayer,select} from '../../reducers/compose'

function mapStateToProps({compose}) {
    return {compose}
}
export default connect(mapStateToProps,{addMaterial,changeLayer,select})(ComposeControlP)