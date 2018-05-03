import React, { Component } from "react";
import { findDOMNode } from 'react-dom'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeWork, changeWorkMaterial, changWorkVideo } from "../../../stores/reducers/work";

import config from "../../../config"
import 'yuki-createjs'

class StageContainer extends Component {

    constructor(){
        super();
        this.state = {
            work: {},
            currentVideoId: "",
            currentVideoDOMIndex: 0,
            // currentVideoDOMTime: 0,
            allVideoTime: 0,
            allVideoCurentTime: 0,
            loadedVideoNum: 0,
            allVideoDate: [],
            allVideoDOM: [],
        };
        this.stage = null;
        this.videoContainer = null;
        this.materialsContainer = [];
        this.disX = 0;
        this.disY = 0;
    }

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
        
        // if (typeof controlNum === "number") {
        //     dots[controlNum].x = evt[target].x + dotscopy[controlNum].x;
        //     dots[controlNum].y = evt[target].y + dotscopy[controlNum].y;
        //     render(transformContainer);
        // }
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
            model.positionX = evt[target].x;
            model.positionY = evt[target].y;
            this.props.changeWorkMaterial(model);
        }
        // const { work } = this.props;
        // const { properties } = work.config;
        // work.config.properties.positionX = evt[target].x;
        // work.config.properties.positionY = evt[target].y;
        // console.log(work, "gfgfgfgfgfgfgfgfgfgfgfgfgf");
    }

    getAllVideo = () => {
        const { work } = this.props;
        const { videos } = work.config;
        // console.log(videos, "kkkkkkkkkkkkkkkkkgggggggggggggggggggggggg");
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
            videoItemDOM.src = `${config.proxyTarget.host}:${config.proxyTarget.port}${videoItem.path}`;
            return videoItemDOM;
        });
    }
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
     * 获取作品的视频素材和音频素材
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
     * 创建音频和视频素材的Container
     */
    createMaterialsContainer = () => {
        const materials = this.getWorkMaterials();
        this.materialsContainer = materials.map((materialItem, index)=>{
            const materialContainer = new createjs.Container();
            materialContainer.x = materialItem.positionX;
            materialContainer.y = materialItem.positionY;

            if(materialItem.type === "image"){
                let imgDOM = document.createElement("IMG");
                imgDOM.setAttribute("crossOrigin", "use-credentials");
                imgDOM.src = `${config.proxyTarget.host}:${config.proxyTarget.port}${materialItem.path}`;
                const materialImg = new createjs.Bitmap(imgDOM);
                materialContainer.addChild(materialImg);
            }else{
                let videoDOM = document.createElement("VIDEO");
                videoDOM.setAttribute("crossOrigin", "use-credentials");
                videoDOM.src = `${config.proxyTarget.host}:${config.proxyTarget.port}${materialItem.path}`;
                const materialImg = new createjs.Bitmap(videoDOM);
                materialContainer.addChild(materialImg);
            }
            materialContainer.addEventListener("mousedown", this.dragMouseDown.bind(null, "currentTarget", materialItem));
            materialContainer.addEventListener("pressmove", this.dragMouseMove.bind(null, "currentTarget", materialItem));
            materialContainer.addEventListener("pressup", this.dragMouseUp.bind(null, "currentTarget", materialItem));
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
        this.videoContainer.addEventListener("mousedown", this.dragMouseDown.bind(null, "currentTarget", "video"));
        this.videoContainer.addEventListener("pressmove", this.dragMouseMove.bind(null, "currentTarget", "video"));
        this.videoContainer.addEventListener("pressup", this.dragMouseUp.bind(null, "currentTarget", "video"));

        createjs.Ticker.setFPS(10);
        createjs.Ticker.addEventListener("tick", ()=>{
            this.videoPlaying();
            this.stage.update();
        });
        this.stage.update();

        // setTimeout(() => {
        //     this.setAllVideoCurrentTime(5);
        // }, 13000);
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
                    // currentVideoDOMTime: 0
                });
            }

            this.state.allVideoCurentTime = this.getAllVideoCurrentTime();
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
        changeWorkMaterial: bindActionCreators(changeWorkMaterial, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StageContainer);