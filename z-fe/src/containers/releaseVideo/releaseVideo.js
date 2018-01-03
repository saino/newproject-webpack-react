import React, { Component } from "react";
import { Button } from "antd";
import { post } from "../../fetch/fetch";
import { getAuth } from "../../utils/auth";

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
            <Button className='release-video-button' type="primary" onClick={this.onReleaseVideoClick}>视频发布</Button>
            <div className="video-url">视频地址：</div>
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
        // console.log(options);
        post('/user/buildVideo', options, jobId => {
            this.setState({
                buildVideoing: true,
                jobId: jobId
            })
            // this.buildVideoing = setInterval(()=>{
                // const options = {
                //     job_id: jobId,
                //     token: getAuth().token
                // }
                post("/user/getProgress", { job_id: jobId, token: getAuth.token}, resp => {
                    if (resp.progress === "100" ){
                        // clearInterval(this.buildVideoing);
                        this.setState({
                            buildVideoing: true,
                            
                        })
                    }
                });

            // }, 500);
        }, error=>{
            // console.log(error);
        });
    }
} 

export default ReleaseVideo;