import React, { Component } from "react";
import { findDOMNode } from 'react-dom'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeWork, changeWorkMaterial, changWorkVideo, changeWorkProperties } from "../../../stores/reducers/work";
import { changeFrameNum } from "../../../stores/reducers/frame-num";
import matrix from "../../../utils/matrix"
import config from "../../../config";
import 'yuki-createjs'

class StageContainer extends Component {

    constructor(){
        super();
        this.state = {
            work: {},
            currentVideoId: "",
            currentVideoDOMIndex: 0,
            allVideoTime: 0,
            allVideoCurentTime: 0,
            loadedVideoNum: 0,
            allVideoDate: [],
            allVideoDOM: [],
        };
        this.stage = null;
        this.videoContainer = null;
        this.materialsContainer = [];
        this.transformMaterialsContainer = [];
        this.materialImg = [];
        this.materialsContainerDOT = [];
        this.disX = 0;
        this.disY = 0;
        this.colNum = 1;
    }

    // shouldComponentUpdate(nextProp, nextState){
    //     return true;
    //     // return !(this.props.work.config.properties.videoPlay && nextProp.work.config.properties.videoPlay);
    // }
    /**
     * 
     * @param {*控制点} controlNum 
     * @param {*目标} target 
     * @param {*事件} evt 
     */
    dragMouseDown = (target, model, evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        this.disX = evt.stageX - evt[target].x;
        this.disY = evt.stageY - evt[target].y;
    }
    dragMouseMove = (target, model, evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        evt[target].x = evt.stageX - this.disX;
        evt[target].y = evt.stageY - this.disY;
    }
    dragMouseUp = (target, model, evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        if(model === "video"){
            model = this.getCurrentVideoDate();
            model.positionY = evt[target].y;
            model.positionX = evt[target].x;
            this.props.changWorkVideo(model);
        }else{
            model.positionX += evt[target].x;
            model.positionY += evt[target].y;
            for(let i=0; i<4; i++){
                model.control[i].x += evt[target].x;
                model.control[i].y += evt[target].y;
            }
            evt[target].x = 0;
            evt[target].y = 0;
            model.height = 100;
            model.width = 100;
            const {control} = model;
            model.scaleReferenceControl = JSON.parse(JSON.stringify(control));
            this.props.changeWorkMaterial(model);
        }
    }

    dragMouseControlMove = (controlNum, materialContainerIndex, evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        evt.target.x = evt.stageX - this.disX;
        evt.target.y = evt.stageY - this.disY;
        this.materialsContainerDOT[materialContainerIndex].dots[controlNum].x = evt.target.x + this.materialsContainerDOT[materialContainerIndex].dotscopy[controlNum].x;
        this.materialsContainerDOT[materialContainerIndex].dots[controlNum].y = evt.target.y + this.materialsContainerDOT[materialContainerIndex].dotscopy[controlNum].y;
        this.renderTransformContainer(materialContainerIndex);
    }

    dragMouseControlUp = (materialmodel, materialContainerIndex, evt) => {
        evt.stopPropagation();
        evt.preventDefault();

        materialmodel.control = this.materialsContainerDOT[materialContainerIndex].dots;
        materialmodel.height = 100;
        materialmodel.width = 100;
        const { control } = materialmodel;
        materialmodel.scaleReferenceControl = JSON.parse(JSON.stringify(control));
        this.props.changeWorkMaterial(materialmodel);

    }
    renderTransformContainer = (materialContainerIndex) => {
        let materialContainerDOT = this.materialsContainerDOT[materialContainerIndex];
        let transformMaterialsContainer = this.transformMaterialsContainer[materialContainerIndex];
        let ndots = this.rectsplit(this.colNum, materialContainerDOT.dots[0], materialContainerDOT.dots[1], materialContainerDOT.dots[2], materialContainerDOT.dots[3]);
        transformMaterialsContainer.removeAllChildren();
        ndots.forEach((dot, i) => {
            //获取平行四边形的四个点
            let dot1 = ndots[i];
            let dot2 = ndots[i + 1];
            let dot3 = ndots[i + this.colNum + 2];
            let dot4 = ndots[i + this.colNum + 1];

            //获取初始平行四边形的四个点
            let idot1 = materialContainerDOT.idots[i];
            let idot2 = materialContainerDOT.idots[i + 1];
            let idot3 = materialContainerDOT.idots[i + this.colNum + 2];
            let idot4 = materialContainerDOT.idots[i + this.colNum + 1];

            if (dot2 && dot3 && i % (this.colNum + 1) < this.colNum) {
                //绘制三角形的下半部分
                this.renderMaterialImage(idot3, dot3, idot2, dot2, idot4, dot4, materialContainerIndex);

                //绘制三角形的上半部分
                this.renderMaterialImage(idot1, dot1, idot2, dot2, idot4, dot4, materialContainerIndex);
            }
            //绘制点阵
            // let shapeCircle = new createjs.Shape();
            // shapeCircle.graphics.beginFill("#ff0000").drawCircle(dot.x, dot.y, 5);
            // transformMaterialsContainer.addChild(shapeCircle);
        });
    }

    renderMaterialImage = (idot1, dot1, idot2, dot2, idot3, dot3, materialContainerIndex) => {
        let line = new createjs.Shape();
        line.graphics.beginStroke("#000000").moveTo(dot1.x, dot1.y).lineTo(dot2.x, dot2.y).lineTo(dot3.x, dot3.y).closePath().endStroke();
        let img = this.materialImg[materialContainerIndex].clone();
        let result = matrix.getMatrix.call(this, idot1, dot1, idot2, dot2, idot3, dot3);
        let matrix2d1 = new createjs.Matrix2D(result.a, result.b, result.c, result.d, result.e, result.f);
        img.transformMatrix = matrix2d1;
        img.mask = line;
        this.transformMaterialsContainer[materialContainerIndex].addChild(img);
    }

    getAllVideo = () => {
        const { work } = this.props;
        const { videos } = work.config;
        return videos.sort((video1,video2)=>{
            return video1.order - video2.order
        });
    }

    /** 
     * 判断所有的视频是否全部加载完毕
     */
    allVideoLoaded = () => {
        return this.state.loadedVideoNum === this.state.allVideoDOM.length;
    }
    createAllVideoDOM = () => {
        const videos = this.getAllVideo();
        return videos.map((videoItem, index)=>{
            //创建 video DOM节点 并 加载video资源
            let videoItemDOM = document.createElement("VIDEO");
            videoItemDOM.onloadedmetadata = () => {
                this.state.loadedVideoNum++;
                this.state.allVideoTime = this.state.allVideoTime + videoItemDOM.duration*1000;
                if(this.allVideoLoaded()){
                    // this.playVideo();
                }
            }
            videoItemDOM.setAttribute("crossOrigin", "use-credentials");
            videoItemDOM.src = `${config.fileUpload.host}:${config.fileUpload.port}${videoItem.path}`;
            return videoItemDOM;
        });
    }
    //获取作品总时长 单位秒
    getAllVideoTime = () => {
        const videos = this.getAllVideo();
        let timeNum = 0;

        for(let i=0; i<videos.length; i++){
            timeNum += videos[i].duration;
        }
        return timeNum;
    }
    getCurrentVideo = () => {
        return this.state.allVideoDOM[this.state.currentVideoDOMIndex];
    }
    getCurrentVideoDate = () => {
        return this.state.allVideoDate[this.state.currentVideoDOMIndex];
    }
    componentDidUpdate() {
        if(this.state.allVideoDate.length === 0){
            this.state.allVideoDate = this.getAllVideo();
            this.state.allVideoDOM = this.createAllVideoDOM();
        }
        this.createMaterialsContainer();
        this.playVideo();
    }
    //单位秒
    getTimeDuration = (time) => {
        return time.hour * 60 * 60 + time.minute * 60 + time.second + time.millisecond / 1000;
    }
    /**
     * 获取作品的视频素材和图片素材
     */
    getWorkMaterials = () => {
        const { work } = this.props;
        const { materials } = work.config;
        const videoAndImagMaterial = materials.filter((materialItem, index) => {
            materialItem.durationStart = this.getTimeDuration(materialItem.timeStart);
            materialItem.durationEnd = this.getTimeDuration(materialItem.timeEnd);

            return materialItem.type === "image" ||materialItem.type==="video"
        }).sort((material1, material2) => {
            return material1.order - material2.order
        });
        return videoAndImagMaterial;
    }
    /**
     * 创建图片和视频素材的Container
     */
    createMaterialsContainer = () => {
        const materials = this.getWorkMaterials();
        this.materialsContainer = materials.map((materialItem, index)=>{
            const materialContainer = new createjs.Container();
            const transformMaterialsContainer = new createjs.Container();
            this.transformMaterialsContainer[index] = transformMaterialsContainer;
            materialContainer.addChild(this.transformMaterialsContainer[index]);

            // materialContainer.x = materialItem.positionX;
            // materialContainer.y = materialItem.positionY;
            materialContainer.x = 0;
            materialContainer.y = 0;
            let materialContainerDOT = {
                dotsFirst: [{
                    x: 0,
                    y: 0,
                }, {
                    x: materialItem.properties.width,
                    y: 0,
                }, {
                    x: materialItem.properties.width,
                    y: materialItem.properties.height,
                }, {
                    x: 0,
                    y: materialItem.properties.height,
                }],
                dots: [{
                    x: materialItem.control[0].x || 0, 
                    y: materialItem.control[0].y || 0,
                },{
                    x: materialItem.control[1].x || materialItem.properties.width,
                    y: materialItem.control[1].y || 0,
                },{
                    x: materialItem.control[2].x || materialItem.properties.width,
                    y: materialItem.control[2].y || materialItem.properties.height,
                },{
                    x: materialItem.control[3].x || 0,
                    y: materialItem.control[3].y || materialItem.properties.height,
                }],
                dotscopy: [{
                    x: materialItem.control[0].x || 0,
                    y: materialItem.control[0].y || 0,
                }, {
                    x: materialItem.control[1].x || materialItem.properties.width,
                    y: materialItem.control[1].y || 0,
                }, {
                    x: materialItem.control[2].x || materialItem.properties.width,
                    y: materialItem.control[2].y || materialItem.properties.height,
                }, {
                    x: materialItem.control[3].x || 0,
                    y: materialItem.control[3].y || materialItem.properties.height,
                }],
            };
            materialContainerDOT.idots = this.rectsplit(this.colNum, materialContainerDOT.dotsFirst[0], materialContainerDOT.dotsFirst[1], materialContainerDOT.dotsFirst[2], materialContainerDOT.dotsFirst[3]);
            this.materialsContainerDOT[index] = materialContainerDOT;

            if(materialItem.type === "image"){
                let imgDOM = document.createElement("IMG");
                imgDOM.setAttribute("crossOrigin", "use-credentials");
                imgDOM.src = `${config.fileUpload.host}:${config.fileUpload.port}${materialItem.path}`;
                const materialImg = new createjs.Bitmap(imgDOM);
                this.materialImg[index] = materialImg;
            }else{
                let videoDOM = document.createElement("VIDEO");
                videoDOM.setAttribute("crossOrigin", "use-credentials");
                videoDOM.src = `${config.fileUpload.host}:${config.fileUpload.port}${materialItem.path}`;
                const materialImg = new createjs.Bitmap(videoDOM);
                this.materialImg[index] = materialImg;
                // materialContainer.addChild(materialImg);
            }
            this.renderTransformContainer(index);
            materialContainer.addEventListener("mousedown", this.dragMouseDown.bind(null, "currentTarget", materialItem));
            materialContainer.addEventListener("pressmove", this.dragMouseMove.bind(null, "currentTarget", materialItem));
            materialContainer.addEventListener("pressup", this.dragMouseUp.bind(null, "currentTarget", materialItem));
            for(let i=0; i<4; i++){
                var controlPoint = new createjs.Shape();
                controlPoint.addEventListener("mousedown", this.dragMouseDown.bind(null, "target", this.materialsContainerDOT[index]));//.bind(null, "target", ));
                controlPoint.addEventListener("pressmove", this.dragMouseControlMove.bind(null, i, index));//.bind(null, "target"));
                controlPoint.addEventListener("pressup", this.dragMouseControlUp.bind(null, materialItem, index));
                controlPoint.graphics.beginFill("#000000").drawCircle(this.materialsContainerDOT[index].dots[i].x, this.materialsContainerDOT[index].dots[i].y, 6);
                materialContainer.addChild(controlPoint);
            }
            return materialContainer;
        });
    }
    playVideo = () => {
        let currentVideo = this.getCurrentVideo();
        let currentVideoDate = this.getCurrentVideoDate();
        if (!currentVideo) {
            return;
        }

        this.videoImg = new createjs.Bitmap(currentVideo);
        this.videoContainer.removeAllChildren();
        this.videoContainer.addChild(this.videoImg);
        this.videoContainer.x = currentVideoDate.positionX;
        this.videoContainer.y = currentVideoDate.positionY;

        this.stage.removeAllChildren();
        this.stage.addChild(this.videoContainer);
        
        // console.log(this.videoImg, this.videoContainer, "kkkkkkkkkkkkkkkkkkkgggggggggggggggggg");
        console.log(currentVideoDate,this.props.work);
        let scaleX = this.props.work.config.properties.width / currentVideoDate.properties.width;
        let scaleY = this.props.work.config.properties.height / currentVideoDate.properties.height;
        let scaleValue = scaleX > scaleY ? scaleX : scaleY;
        this.videoContainer.scaleX = scaleValue;
        this.videoContainer.scaleY = scaleValue;

        if (this.props.work.config.properties.videoPlay) {
            // currentVideo.currentTime = this.state.currentVideoDOMTime;
            currentVideo.play();
        } else {
            currentVideo.pause();
            // this.state.currentVideoDOMTime = this.getCurrentVideo().currentTime;
        }
    }

    componentDidMount() {
        this.setState({
            allVideoDate: this.getAllVideo(),
            allVideoDOM: this.createAllVideoDOM(),
        });
        this.stage = new createjs.Stage("mycanvas");
        this.videoContainer = new createjs.Container();
        // this.videoContainer.addEventListener("mousedown", this.dragMouseDown.bind(null, "currentTarget", "video"));
        // this.videoContainer.addEventListener("pressmove", this.dragMouseMove.bind(null, "currentTarget", "video"));
        // this.videoContainer.addEventListener("pressup", this.dragMouseUp.bind(null, "currentTarget", "video"));

        createjs.Ticker.setFPS(10);
        createjs.Ticker.addEventListener("tick", ()=>{
            this.videoPlaying();
            this.stage.update();
        });
        this.stage.update();

    }
    /**
     * 视频播放控制 播放时间控制
     */
    videoPlaying = () => {
        //如果 视频已经全部加载完 并且 作品处于播放状态
        if ((this.allVideoLoaded()) && (this.props.work.config.properties.videoPlay)){
            const currentVideo = this.getCurrentVideo();
            //若 当前视频播放完毕则设置当前视频播放索引为一个视频的索引 循环播放
            if (currentVideo.currentTime === currentVideo.duration){
                this.setState({
                    currentVideoDOMIndex: (this.state.currentVideoDOMIndex+1)%(this.state.allVideoDOM.length),
                });
            }
            this.state.allVideoCurentTime = this.getAllVideoCurrentTime();
            this.props.changeFrameNum(this.getCurrentFrameNum());
        }
        this.renderMaterial();
    }

    /**
     * 根据播放时间控制素材是否出现
     */
    renderMaterial = () => {
        const materials = this.getWorkMaterials();
        for(let i=0; i<materials.length; i++){
            if(materials[i].durationStart<=this.state.allVideoCurentTime && materials[i].durationEnd >= this.state.allVideoCurentTime){
                if(this.stage.getChildIndex(this.materialsContainer[i]) === -1){
                    this.stage.addChild(this.materialsContainer[i]);
                    // for (let controlNum = 0; controlNum < 4; controlNum++) {
                    //     var controlPoint = new createjs.Shape();
                    //     controlPoint.addEventListener("mousedown", this.dragMouseDown.bind(null, "target", materialItem));//.bind(null, "target", ));
                    //     controlPoint.addEventListener("pressmove", this.dragMouseMove.bind(null, "target", materialItem));//.bind(null, "target"));
                    //     // controlPoint
                    //     controlPoint.graphics.beginFill("#000000").drawCircle(materialContainerDOT.dots[i].x, materialContainerDOT.dots[i].y, 6);
                    //     this.materialContainer[i].addChild(controlPoint);
                    // }
                }
            }else{
                if(this.stage.getChildIndex(this.materialsContainer[i]) >= 0){
                    this.stage.removeChild(this.materialsContainer[i]);
                }
            }
        }
    }

    /**
     * 获取相对于所有总视频时长的当前播放时间 单位秒
     */
    getAllVideoCurrentTime = () => {
        let currentTime = 0;
        for(let i=0; i<this.state.currentVideoDOMIndex; i++){
            currentTime += this.state.allVideoDOM[i].duration;
        }
        currentTime += this.state.allVideoDOM[this.state.currentVideoDOMIndex].currentTime;
        return currentTime;
    }


    /**
     * 设置相对于所有总视频时长的当前播放时间 单位秒
     */
    setAllVideoCurrentTime = (currentTime) => {

        let preVideoPlayTime = 0;
        
        let videoPlayTime = 0;

        for(let i=0; i<this.state.allVideoDOM.length; i++){
            preVideoPlayTime = videoPlayTime;
            videoPlayTime += this.state.allVideoDOM[i].duration;
            if(currentTime < videoPlayTime ){
                //设置 当前要播放视频的索引 当前播放视频的时间 相对于总视频的播放时间
                this.getCurrentVideo().pause();
                this.getCurrentVideo().currentTime = 0;
                this.state.allVideoDOM[i].currentTime = currentTime - preVideoPlayTime;
                this.setState({
                    currentVideoDOMIndex: i,
                    // currentVideoDOMTime: currentTime - preVideoPlayTime,
                    allVideoCurentTime: currentTime
                });
                return;
            }
        }
    }
    //获取总帧数
    getFrameCount = () => {
        const { work } = this.props;
        const { videos } = work.config;
        let frameNum = 0;
        for (let i = 0; i < videos.length; i++) {
            frameNum += videos[i].properties.length;
        };
        return frameNum;
    }
    //获取当前帧数
    getCurrentFrameNum = () => {
        const allVideoCurentTime = this.getAllVideoCurrentTime();
        let videoTime = 0;
        let currentFrameNum = 0;
        let videoDuration = 0;
        for(let i=0; i<this.state.allVideoDate.length; i++){
            let videoProperties = this.state.allVideoDate[i].properties;
            videoTime += (videoProperties.duration - 0);
            if(allVideoCurentTime >= videoTime){
                currentFrameNum += videoProperties.length;
            }else{
                videoDuration = allVideoCurentTime + (videoProperties.duration - 0) - videoTime;
                currentFrameNum = currentFrameNum + Math.round((videoDuration / (videoProperties.duration - 0))*videoProperties.length);
                return currentFrameNum;
            }
        }
        return currentFrameNum;

    }
    render() {
        const { work } = this.props;
        const { properties  } = work.config;
        return <canvas style={{ transform: `scale(${properties.scale},${properties.scale})` }} ref="stageCanvas" id="mycanvas" className="background-stage" width={`${properties.width}`} height={`${properties.height}`}>
            <style>{`
                .background-stage{
                    // height: 100%;
                    // width: 100%;
                    background: #fff;
                }
                // .canvas-stage{
                //     background: grey;
                // }
            `}</style>
        </canvas>
    }

    rectsplit(n, a, b, c, d) {
        var ndots = [];
        //ad方向的向量n等分
        var ad_x = (d.x - a.x) / n,
            ad_y = (d.y - a.y) / n;
        //bc方向的向量n等分
        var bc_x = (c.x - b.x) / n,
            bc_y = (c.y - b.y) / n;
        for (var i = 0; i <= n; i++) {
            //ad方向的n等分坐标
            var ad_dot_x = a.x + i * ad_x;
            var ad_dot_y = a.y + i * ad_y;
            //bc方向的n等分坐标
            var bc_dot_x = b.x + i * bc_x;
            var bc_dot_y = b.y + i * bc_y;

            //ac方向的向量n等分
            var ac_x = (bc_dot_x - ad_dot_x) / n;
            var ac_y = (bc_dot_y - ad_dot_y) / n;

            for (var j = 0; j <= n; j++) {
                //ac方向的n等分坐标
                var ac_dot_x = ad_dot_x + j * ac_x;
                var ac_dot_y = ad_dot_y + j * ac_y;
                ndots.push({
                    x: ac_dot_x,
                    y: ac_dot_y
                });
            }


        }
        return ndots;
    }

}

const mapStateToProps = ({ work }) => {
    return {
        work
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeWork: bindActionCreators(changeWork, dispatch),
        changWorkVideo: bindActionCreators(changWorkVideo, dispatch),
        changeWorkMaterial: bindActionCreators(changeWorkMaterial, dispatch),
        changeFrameNum: bindActionCreators(changeFrameNum, dispatch),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StageContainer);