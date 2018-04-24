import React, { Component } from "react";
import { findDOMNode } from 'react-dom'

import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import { changeWork } from "../../../stores/reducers/work";

import aaaVideo from "../../statics/aaa.mp4";
import bbbVideo from "../../statics/bbb.mp4";
import cccImg from "../../statics/def-work.jpg";
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
    // componentWillMount() {
    //     this.setState({
    //         work: {...this.props.work1}
    //     });
    // }

    /**
     * 
     * @param {*控制点} controlNum 
     * @param {*目标} target 
     * @param {*事件} evt 
     */
    dragMouseDown = (controlNum, target, evt) => {
        evt.stopPropagation();
        evt.preventDefault();
        this.disX = evt.stageX - evt[target].x;
        this.disY = evt.stageY - evt[target].y;
    }
    dragMouseMove = (controlNum, target, evt) => {
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

    getAllVideo = () => {
        const { work1 } = this.props;
        const { video } = work1;
        return video.sort((video1,video2)=>{
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

                }
            }

            if(index%2){
                videoItemDOM.src = bbbVideo;
            }else{
                videoItemDOM.src = aaaVideo;
            }
            return videoItemDOM
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
    componentDidUpdate() {
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
        const { work1 } = this.props;
        const { material } = work1;
        const videoAndImagMaterial = material.filter((materialItem, index) => {
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
            const materialImg = new createjs.Bitmap(cccImg);
            // const materialImg = new createjs.Bitmap(materialItem.path);
            materialContainer.addChild(materialImg);
            materialContainer.addEventListener("mousedown", this.dragMouseDown.bind(null, null, "currentTarget"));
            materialContainer.addEventListener("pressmove", this.dragMouseMove.bind(null, null, "currentTarget"));
            return materialContainer;
        });
    }
    playVideo = () => {
        let currentVideo = this.getCurrentVideo();
        if (!currentVideo) {
            return;
        }
        this.videoImg = new createjs.Bitmap(currentVideo);
        this.videoContainer.removeAllChildren();
        this.videoContainer.addChild(this.videoImg);

        this.stage.removeAllChildren();
        this.stage.addChild(this.videoContainer);
        

        if (this.props.work1.videoPlay) {
            // currentVideo.currentTime = this.state.currentVideoDOMTime;
            currentVideo.play();
        } else {
            currentVideo.pause();
            // this.state.currentVideoDOMTime = this.getCurrentVideo().currentTime;
        }
    }

    componentDidMount() {
        // console.log("ffffffjjjjjj");
        this.setState({
            allVideoDate: this.getAllVideo(),
            allVideoDOM: this.createAllVideoDOM(),
        });
        this.stage = new createjs.Stage("mycanvas");
        this.videoContainer = new createjs.Container();
        this.videoContainer.addEventListener("mousedown", this.dragMouseDown.bind(null, null, "currentTarget"));
        this.videoContainer.addEventListener("pressmove", this.dragMouseMove.bind(null, null, "currentTarget"));

        createjs.Ticker.setFPS(10);
        createjs.Ticker.addEventListener("tick", ()=>{
            this.videoPlaying();
            this.stage.update();
        });
        this.stage.update();

        setTimeout(() => {
            this.setAllVideoCurrentTime(5);
        }, 13000);
    }
    /**
     * 视频播放控制 播放时间控制
     */
    videoPlaying = () => {
        //如果 视频已经全部加载完 并且 作品处于播放状态
        if ((this.allVideoLoaded()) && (this.props.work1.videoPlay)){
            const currentVideo = this.getCurrentVideo();
            //若 当前视频播放完毕则设置当前视频播放索引为一个视频的索引 循环播放
            if (currentVideo.currentTime === currentVideo.duration){
                this.setState({
                    currentVideoDOMIndex: (this.state.currentVideoDOMIndex+1)%(this.state.allVideoDOM.length),
                    // currentVideoDOMTime: 0
                });
            }

            this.state.allVideoCurentTime = this.getAllVideoCurrentTime();
            console.log(currentVideo.currentTime, this.state.allVideoCurentTime);
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
        const { work1 } = this.props;
        return <canvas style={{transform: `scale(${work1.scaleX},${work1.scaleY})`}} ref="stageCanvas" id="mycanvas" className="background-stage" width="800" height="400">
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

const mapStateToProps = ({ work1 }) => {
    return {
        work1
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        changeWork: bindActionCreators(changeWork, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(StageContainer);