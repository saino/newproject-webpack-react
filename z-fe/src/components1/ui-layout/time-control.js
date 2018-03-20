import React, {Component} from "react";
import { InputNumber } from "antd";
import moment from "moment";
class TimeControl extends Component{
    constructor() {
        super();
        this.state = {
            maxStartHour: "",
            maxStartMinute: "",
            maxStartSecond: "",
            maxStartMillisecond: "",
            minEndHour: "",
            minEndMinute: "",
            minEndSecond: "",
            maxEndMillisecond: ""
        }
    }

    render() {
        const {duration, timeStart, timeEnd} = this.props;
        let maxEndHour = moment.duration(this.props.duration * 1000).hours();
        let maxEndMinute = moment.duration(this.props.duration * 1000).minutes();
        let maxEndSecond = moment.duration(this.props.duration * 1000).seconds();
        let maxEndMillisecond = moment.duration(this.props.duration * 1000).milliseconds();
        return (<div>
            <div className="time">开始时间 
                <div className="time-input">
                    <InputNumber className="time1 startHour" min="0" max={23} defaultValue="0" />:
                    <InputNumber className="time1 startMinute" min="0" max="59" defaultValue="0" />:
                    <InputNumber className="time1 startSecond" min="0" max="59" defaultValue="0" />.
                    <InputNumber className="time1 startMillisecond" min="0" max="99" defaultValue="0" />
                </div>
            </div>
            <div className="time">结束时间 
                <div className="time-input">
                    <InputNumber className="time1 endHour" min="0" max={maxEndHour} defaultValue={maxEndHour} />:
                    <InputNumber className="time1 endMinute" min="0" max={maxEndMinute} defaultValue={maxEndMinute} />:
                    <InputNumber className="time1 endSecond" min="0" max={maxEndSecond} defaultValue={maxEndSecond} />.
                    <InputNumber className="time1 endMillisecond" min="0" max={maxEndMillisecond} defaultValue={maxEndMillisecond} />
                </div>
            </div>
            <style>{`
                .time{
                    display: flex;
                    height: 26px;
                    margin-top: 16px;
                    color: #C4BF97;
                    padding-left: 16px;
                    font-size: 14px;
                    line-height: 26px;
                }
                .time-input{
                    height: 26px;
                    width: 136px;
                    background: #3A686C;
                    color: #fff;
                    margin-left: 16px;
                    padding: 6px 8px;
                    display: flex;
                    line-height: 10px;
                }
                .time1{
                    background: #3A686C;
                    color: #fff;
                    border: none;
                    margin-top: -6px;
                    height: 26px;
                    width: 16px;
                    margin-left: 8px;
                }
                .ant-input-number-handler-wrap{
                    display: none;
                }
                .ant-input-number-input-wrap{
                    background: #3A686C;
                }
                .ant-input-number-input{
                    background: #3A686C;
                    color: #fff;
                    padding: 0;
                }
                .ant-input-number:hover{
                    border: none;
                }
                .ant-input-number-focused{
                    -webkit-box-shadow: none;
                    box-shadow: none;
                    outline: none;
                    border:none;
                }
            `}</style>
        </div>);
    }
}

export default TimeControl;