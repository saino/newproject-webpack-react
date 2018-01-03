import React, { Component } from 'react'
import { findDOMNode } from 'react-dom'
import classNames from 'classnames'

function clearPreDev(event) {
    event.stopPropagation();
    event.preventDefault();
}

function getTransformString(matrix) {
    var k, results;
    results = [];
    for (var i = k = 0; k < 4; i = ++k) {
        results.push((function () {
            var l, results1;
            results1 = [];
            for (var j = l = 0; l < 4; j = ++l) {
                results1.push(matrix[j][i].toFixed(5));
            }


            return results1;
        })());
    }
    return results.join(',');
}
function getTransform(from, to) {
    var A, H, b, h, i, k, l;
    A = [];
    for (i = k = 0; k < 4; i = ++k) {
        A.push([from[i].x, from[i].y, 1, 0, 0, 0, -from[i].x * to[i].x, -from[i].y * to[i].x]);
        A.push([0, 0, 0, from[i].x, from[i].y, 1, -from[i].x * to[i].y, -from[i].y * to[i].y]);
    }


    b = [];
    for (i = l = 0; l < 4; i = ++l) {
        b.push(to[i].x);
        b.push(to[i].y);
    }
    h = LUsolve(LU(A), b)
    H = [[h[0], h[1], 0, h[2]], [h[3], h[4], 0, h[5]], [0, 0, 1, 0], [h[6], h[7], 0, 1]];

    return H;
};

function LU(A) {
    var abs = Math.abs;
    var i, j, k, absAjk, Akk, Ak, Pk, Ai;
    var max;
    var n = A.length, n1 = n - 1;
    var P = new Array(n);


    for (k = 0; k < n; ++k) {
        Pk = k;
        Ak = A[k];
        max = abs(Ak[k]);
        for (j = k + 1; j < n; ++j) {
            absAjk = abs(A[j][k]);
            if (max < absAjk) {
                max = absAjk;
                Pk = j;
            }
        }
        P[k] = Pk;

        if (Pk != k) {
            A[k] = A[Pk];
            A[Pk] = Ak;
            Ak = A[k];
        }

        Akk = Ak[k];

        for (i = k + 1; i < n; ++i) {
            A[i][k] /= Akk;
        }

        for (i = k + 1; i < n; ++i) {
            Ai = A[i];
            for (j = k + 1; j < n1; ++j) {
                Ai[j] -= Ai[k] * Ak[j];
                ++j;
                Ai[j] -= Ai[k] * Ak[j];
            }
            if (j === n1) Ai[j] -= Ai[k] * Ak[j];
        }
    }

    return {
        LU: A,
        P: P
    };
}

function LUsolve(LUP, b) {
    var i, j;
    var LU = LUP.LU;
    var n = LU.length;
    var x = b;
    var P = LUP.P;
    var Pi, LUi, LUii, tmp;

    for (i = n - 1; i !== -1; --i) x[i] = b[i];
    for (i = 0; i < n; ++i) {
        Pi = P[i];
        if (P[i] !== i) {
            tmp = x[i];
            x[i] = x[Pi];
            x[Pi] = tmp;
        }

        LUi = LU[i];
        for (j = 0; j < i; ++j) {
            x[i] -= x[j] * LUi[j];
        }
    }

    for (i = n - 1; i >= 0; --i) {
        LUi = LU[i];
        for (j = i + 1; j < n; ++j) {
            x[i] -= x[j] * LUi[j];
        }

        x[i] /= LUi[i];
    }

    return x;
}

class TransControl extends Component {
    getTransform() {

    }
    constructor(props) {
        super(props);
        const { layer } = this.props;
        var originalPos = [[0, 0], [0, layer.config.height], [layer.config.width, 0], [layer.config.width, layer.config.height]];
        this.originalPos = originalPos;
        this.from = (function () {
            var k, len, results;
            results = [];
            for (k = 0, len = originalPos.length; k < len; k++) {
                let p = originalPos[k];
                results.push({
                    x: p[0] - originalPos[0][0],
                    y: p[1] - originalPos[0][1]
                });
            }


            return results;
        })();
    }

    render() {
        const {control, currentLayer, layer} = this.props;
        const controlClass = classNames({
            "trans-control": true,
            "select": currentLayer.id===layer.id
        });
        return (<div className={controlClass} style={{ left: control.left, top: control.top }}
            onMouseDown={this.handleDragStart}>
            <style>{`
                .trans-control{
                    z-index:999;
                    font-size:0;
                    display:none;
                    position: absolute;
                    width:10px;
                    height:10px;
                    border:2px solid #1EBC9C;
                    cursor: move;
                    background: #fff;
                }
                .trans-control.select{
                    display: block;
                }
            `}</style>
        </div>);
    }
    handleDragStart = (event) => {
        const el = findDOMNode(this);
        const { layer, controlPoint, onDragStart } = this.props;
        this.startX = event.clientX;
        this.startY = event.clientY;
        onDragStart(layer, controlPoint);
        document.addEventListener('selectstart', clearPreDev);
        document.addEventListener('dragstart', clearPreDev);
        document.addEventListener('mousemove', this.handleDrag);
        document.addEventListener('mouseup', this.handleDragEnd);
    }
    handleDrag = (event) => {
        let offsetX = event.clientX - this.startX;
        let offsetY = event.clientY - this.startY;
        const { layer, controlPoint, onDrag } = this.props;

        const originalPos = this.originalPos;
        var controls = layer.config.controls;
        const targetPos = [[controls[0].left, controls[0].top], [controls[3].left, controls[3].top], [controls[1].left, controls[1].top], [controls[2].left, controls[2].top]];
        var to = (function () {
            var k, len, results;
            results = [];
            for (k = 0, len = targetPos.length; k < len; k++) {
                let p = targetPos[k];
                results.push({
                    x: p[0] - originalPos[0][0],
                    y: p[1] - originalPos[0][1]
                });
            }


            return results;
        })();

        const H = getTransform(this.from, to);
        const transform = `matrix3d(${getTransformString(H)})`;
        onDrag(layer, controlPoint, offsetX, offsetY, transform);
    }
    handleDragEnd = (event) => {
        const { onDragEnd } = this.props;
        // onDragEnd(this.dragIndex)
        document.removeEventListener('selectstart', clearPreDev)
        document.removeEventListener('dragstart', clearPreDev)
        document.removeEventListener('mousemove', this.handleDrag)
        document.removeEventListener('mouseup', this.handleDragEnd)
    }
}

export default TransControl;