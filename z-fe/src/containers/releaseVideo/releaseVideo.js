import React, { Component } from "react";
import { Button } from "antd";
import { post } from "../../fetch/fetch";

class ReleaseVideo extends Component{
    constructor() {
        super();
        this.state = {
            videoUrl: "",
            buildVideoing: false,
            jobId: ''
        }
    }
    render() {
        return (<div className="release-video">
            <Button type="primary" onClick={this.onReleaseVideoClick}>视频发布</Button>
            <div className="video-url">视频地址：</div>
        </div>);
    }
    onReleaseVideoClick = () => {
        post('/user/buildVideo', { work_id: this.props.workId }, jobId => {
            this.setState({
                buildVideoing: true,
                jobId: jobId
            })
            this.buildVideoing = setInterval(()=>{
                post("/user/getProgress", { job_id: jobId}, resp => {
                    if (resp.progress === "100" ){
                        clearInterval(this.buildVideoing);
                        this.setState({
                            buildVideoing: true,
                            
                        })
                    }
                });
            }, 500);
            // console.log(resp);
            // this.props.handleChangeStep(3, this.state.currentSceneId)
        });
    }
} 

export default ReleaseVideo;