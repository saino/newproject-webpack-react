import React, { Component } from "react";
import { Button, Progress } from "antd";
import { post } from "../../fetch/fetch";
import { getAuth } from "../../utils/auth";

class ReleaseVideo extends Component{
    constructor() {
        super();
        this.state = {
            videoUrl: "",
            buildVideoing: false,
            building: false,
            buildProgress: 0,
            jobId: ''
        }
    }
    render() {
        return (<div className="release-video">
            <Button className='release-video-button' type="primary" onClick={this.onReleaseVideoClick}>视频发布</Button>
            <div className="video-url">视频地址：{this.state.videoUrl}</div>
            <Progress percent={this.state.buildProgress} />
            <style>{`
                .release-video{
                    height: 120px;
                    width: 360px;
                    margin: 100px auto;
                }
                .release-video-button{
                    height: 50px;
                    width: 360px;
                }
                .video-url{
                    border: solid 1px #2d8bbd;
                    height: 80px;
                    line-height: 80px;
                    text-indent: 50px;
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
                building: true,
                jobId: jobId
            })
            this.buildVideoing = setInterval(()=>{
                post("/user/getProgress", { job_id: jobId, token: getAuth().token}, resp => {
                    if (resp.progress == "100" ){
                        clearInterval(this.buildVideoing);
                        this.setState({
                            building: false,
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

export default ReleaseVideo;