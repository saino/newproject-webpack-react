import React, { Component } from "react";
import { Button, Progress } from "antd";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { post } from "../../fetch/fetch";
import { getAuth } from "../../utils/auth";
import { updateBuildVideo } from '../../reducers/material'

class ReleaseVideo extends Component{
    constructor() {
        super();
        this.state = {
            videoUrl: "",
            buildProgress: 0,
            jobId: ''
        }
    }
    componentWillMount() {
        const { material } = this.props;
        console.log(material);
        const { buildVideo } = material;
        if(!buildVideo) { return; }
        const { jobId, progress, videoUrl } = buildVideo;
        if(!jobId){ return; };
        this.buildVideoing0 = setInterval(()=>{
            post("/user/getProgress", { job_id: jobId, token: getAuth().token }, resp => {
                if (!resp.progress) {
                    resp.progress = 0;
                }
                if(resp.progress == "100"){
                    clearInterval(this.buildVideoing0);
                    this.setState({
                        buildProgress: 100,
                        videoUrl: resp.result,
                    });
                    return;
                }
                this.setState({
                    buildProgress: parseFloat(resp.progress),
                    jobId,
                    videoUrl
                });
            });
        }, 1000);

    }
    componentWillUnmount() {
        const { material, workId, workName } = this.props;
        // const { materials, scenes, layers } = material;
        const buildVideo = {
            jobId: this.state.jobId,
            progress: this.state.buildProgress,
            videoUrl: this.state.videoUrl
        }
        const options = {
            token: getAuth().token,
            work_id: workId,
            status: 1,
            name: workName,
            config: {...material, buildVideo}
        }
        clearInterval(this.buildVideoing);
        clearInterval(this.buildVideoing0);
        this.props.updateBuildVideo(buildVideo);
        post('/user/saveWork', options, resp => {});
    }
    render() {
        return (<div className="release-video">
            <Button className='release-video-button' type="primary" onClick={this.onReleaseVideoClick}>视频发布</Button>
            <div className="video-url">视频地址：{window.api + this.state.videoUrl}</div>
            <Progress percent={this.state.buildProgress} />
            <style>{`
                .release-video{
                    height: 120px;
                    width: 460px;
                    margin: 100px auto;
                }
                .release-video-button{
                    height: 50px;
                    width: 460px;
                }
                .video-url{
                    border: solid 1px #2d8bbd;
                    height: 80px;
                    line-height: 80px;
                }
            `}</style>
        </div>);
    }
    onReleaseVideoClick = () => {
        const options = {
            work_id: this.props.workId,
            token: getAuth().token
        }
        post('/user/buildVideo', options, jobId => {
            this.setState({
                jobId
            });
            this.buildVideoing = setInterval(()=>{
                post("/user/getProgress", { job_id: jobId, token: getAuth().token}, resp => {
                    if(!resp.progress){
                        resp.progress = 0;
                    }
                    if (resp.progress == "100" ){
                        clearInterval(this.buildVideoing);
                        this.setState({
                            buildProgress: 100,
                            videoUrl: resp.result
                        });
                        return;
                    }
                    this.setState({
                        buildProgress: parseFloat(resp.progress),
                    });
                });

            }, 1000);
        }, error=>{
            // console.log(error);
        });
    }
} 

const mapStateToProps = ({ material }) =>{
    return {
        material
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        updateBuildVideo: bindActionCreators(updateBuildVideo, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(ReleaseVideo);