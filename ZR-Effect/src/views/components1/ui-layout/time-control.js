import React, {Component} from "react";
import { InputNumber } from "antd";
import moment from "moment";
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import { changeMaterial } from '../../../stores/reducers/work'

class TimeControl extends Component{
    constructor() {
        super();
        this.state = {
            startHour: "",
            startMinute: "",
            startSecond: "",
            startMillisecond: "",
            endHour: "",
            endMinute: "",
            endSecond: "",
            endMillisecond: "",
            maxStartHour: "",
            maxStartMinute: "",
            maxStartSecond: "",
            maxStartMillisecond: "",
            minEndHour: "",
            minEndMinute: "",
            minEndSecond: "",
            minEndMillisecond: "",
            maxEndHour: "",
            maxEndMinute: "",
            maxEndSecond: "",
            maxEndMillisecond: "",
        }
    }
    componentWillMount() {
        let { duration, timeStart, timeEnd } = this.props;
        const maxDurationEndHour = moment.duration(duration * 1000).hours();
        const maxDurationEndMinute = moment.duration(duration * 1000).minutes();
        const maxDurationEndSecond = moment.duration(duration * 1000).seconds();
        const maxDurationEndMillisecond = moment.duration(duration * 1000).milliseconds();
        // console.log(this, timeStart, timeEnd);
        timeStart.hour = timeStart.hour || 0;
        timeStart.minute = timeStart.minute || 0;
        timeStart.second = timeStart.second || 0;
        timeStart.millisecond = timeStart.millisecond || 0;
        timeEnd.hour = timeEnd.hour || maxDurationEndHour;
        timeEnd.minute = timeEnd.minute || maxDurationEndMinute;
        timeEnd.second = timeEnd.second || maxDurationEndSecond;
        timeEnd.millisecond = timeEnd.millisecond || maxDurationEndMillisecond;
        this.setState({
            startHour: timeStart.hour || 0,
            startMinute: timeStart.minute || 0,
            startSecond: timeStart.second || 0,
            startMillisecond: timeStart.millisecond || 0,
            endHour: timeEnd.hour || maxDurationEndHour,
            endMinute: timeEnd.minute || maxDurationEndMinute,
            endSecond: timeEnd.second || maxDurationEndSecond,
            endMillisecond: timeEnd.millisecond || maxDurationEndMillisecond,
        });
        this.setState({
            maxStartHour: (timeStart.minute*6000+timeStart.second*100+timeStart.millisecond > timeEnd.minute*6000+timeEnd.second*100+timeEnd.millisecond) ? timeEnd.hour-1 : timeEnd.hour,
            maxStartMinute: (timeStart.hour<timeEnd.hour) ? 59 : ((timeStart.second*100+timeStart.millisecond > timeEnd.second*100+timeEnd.millisecond) ? timeEnd.minute-1 : timeEnd.minute),
            maxStartSecond: (timeStart.hour<timeEnd.hour)||(timeStart.minute<timeEnd.minute) ? 59 : (timeStart.millisecond>timeEnd.millisecond ? timeEnd.second-1 : timeEnd),
            maxStartMillisecond: (timeStart.hour < timeEnd.hour)||(timeStart.minute < timeEnd.minute)||(timeStart.second < timeEnd.second) ? 99 : timeEnd.millisecond,
            
            minEndHour: (timeStart.minute*6000+timeStart.second*100+timeStart.millisecond > timeEnd.minute*6000+timeEnd.second*100+timeEnd.millisecond) ? timeStart.hour+1 : timeStart.hour,
            minEndMinute: (timeEnd.hour>timeStart.hour) ? 0 : (timeStart.second*100+timeStart.millisecond>timeEnd.second*100+timeEnd.millisecond ? timeStart.minute+1 : timeStart.minute),
            minEndSecond: (timeEnd.hour>timeStart.hour)||(timeEnd.minute>timeStart.minute) ? 0 : (timeStart.millisecond>timeEnd.millisecond ? timeStart.second+1 : timeStart.second),
            minEndMillisecond: (timeEnd.hour>timeStart.hour)||(timeEnd.minute>timeStart.minute)||(timeEnd.second>timeStart.second) ? 0 : timeStart.millisecond,

            maxEndHour: (timeEnd.minute*6000+timeEnd.second*100+timeEnd.millisecond > maxDurationEndMinute*6000+maxDurationEndSecond*100+maxDurationEndMillisecond) ? maxDurationEndHour-1: maxDurationEndHour,
            maxEndMinute: (timeEnd.hour<maxDurationEndHour) ? 59 : (timeEnd.second*100+timeEnd.millisecond>maxDurationEndSecond*100+maxDurationEndMillisecond ? maxDurationEndMinute-1 : maxDurationEndMinute),
            maxEndSecond: (timeEnd.hour<maxDurationEndHour)||(timeEnd.minute<maxDurationEndMinute) ? 59 : (timeEnd.millisecond>maxDurationEndMillisecond ? maxDurationEndSecond-1 : maxDurationEndSecond),
            maxEndMillisecond: (timeEnd.hour<maxDurationEndHour)||(timeEnd.minute<maxDurationEndMinute)||(timeEnd.second<maxDurationEndSecond) ? 99 : maxDurationEndMillisecond,
        });

    }
    changeTime(){
        const timeStart = {
            hour: this.state.startHour,
            minute: this.state.startMinute,
            second: this.state.startSecond,
            millisecond: this.state.startMillisecond
        };
        const timeEnd = {
            hour: this.state.endHour,
            minute: this.state.endMinute,
            second: this.state.endSecond,
            millisecond: this.state.endMillisecond
        };
        const maxDurationEndHour = moment.duration(this.props.duration * 1000).hours();
        const maxDurationEndMinute = moment.duration(this.props.duration * 1000).minutes();
        const maxDurationEndSecond = moment.duration(this.props.duration * 1000).seconds();
        const maxDurationEndMillisecond = moment.duration(this.props.duration * 1000).milliseconds();
        this.setState({
            maxStartHour: (timeStart.minute * 6000 + timeStart.second * 100 + timeStart.millisecond > timeEnd.minute * 6000 + timeEnd.second * 100 + timeEnd.millisecond) ? timeEnd.hour - 1 : timeEnd.hour,
            maxStartMinute: (timeStart.hour < timeEnd.hour) ? 59 : ((timeStart.second * 100 + timeStart.millisecond > timeEnd.second * 100 + timeEnd.millisecond) ? timeEnd.minute - 1 : timeEnd.minute),
            maxStartSecond: (timeStart.hour < timeEnd.hour) || (timeStart.minute < timeEnd.minute) ? 59 : (timeStart.millisecond > timeEnd.millisecond ? timeEnd.second - 1 : timeEnd),
            maxStartMillisecond: (timeStart.hour < timeEnd.hour) || (timeStart.minute < timeEnd.minute) || (timeStart.second < timeEnd.second) ? 99 : timeEnd.millisecond,

            minEndHour: (timeStart.minute * 6000 + timeStart.second * 100 + timeStart.millisecond > timeEnd.minute * 6000 + timeEnd.second * 100 + timeEnd.millisecond) ? timeStart.hour + 1 : timeStart.hour,
            minEndMinute: (timeEnd.hour > timeStart.hour) ? 0 : (timeStart.second * 100 + timeStart.millisecond > timeEnd.second * 100 + timeEnd.millisecond ? timeStart.minute + 1 : timeStart.minute),
            minEndSecond: (timeEnd.hour > timeStart.hour) || (timeEnd.minute > timeStart.minute) ? 0 : (timeStart.millisecond > timeEnd.millisecond ? timeStart.second + 1 : timeStart.second),
            minEndMillisecond: (timeEnd.hour > timeStart.hour) || (timeEnd.minute > timeStart.minute) || (timeEnd.second > timeStart.second) ? 0 : timeStart.millisecond,

            maxEndHour: (timeEnd.minute * 6000 + timeEnd.second * 100 + timeEnd.millisecond > maxDurationEndMinute * 6000 + maxDurationEndSecond * 100 + maxDurationEndMillisecond) ? maxDurationEndHour - 1 : maxDurationEndHour,
            maxEndMinute: (timeEnd.hour < maxDurationEndHour) ? 59 : (timeEnd.second * 100 + timeEnd.millisecond > maxDurationEndSecond * 100 + maxDurationEndMillisecond ? maxDurationEndMinute - 1 : maxDurationEndMinute),
            maxEndSecond: (timeEnd.hour < maxDurationEndHour) || (timeEnd.minute < maxDurationEndMinute) ? 59 : (timeEnd.millisecond > maxDurationEndMillisecond ? maxDurationEndSecond - 1 : maxDurationEndSecond),
            maxEndMillisecond: (timeEnd.hour < maxDurationEndHour) || (timeEnd.minute < maxDurationEndMinute) || (timeEnd.second < maxDurationEndSecond) ? 99 : maxDurationEndMillisecond,
        });
    }
    render() {
        return (<div>
            <div className="time">开始时间 
                <div className="time-input">
                    <InputNumber className="time1" min={0} max={this.state.maxStartHour} defaultValue={this.state.startHour} value={this.state.startHour}
                        onChange={this.onTimeChange("startHour", 0, this.state.maxStartHour)}/>:
                    <InputNumber className="time1" min={0} max={this.state.maxStartMinute} defaultValue={this.state.startMinute} value={this.state.startMinute}
                        onChange={this.onTimeChange("startMinute", 0, this.state.maxStartMinute)}/>:
                    <InputNumber className="time1" min={0} max={this.state.maxStartSecond} defaultValue={this.state.startSecond} value={this.state.startSecond}
                        onChange={this.onTimeChange("startSecond", 0, this.state.maxStartSecond)}/>.
                    <InputNumber className="time1" min={0} max={this.state.maxStartMillisecond} defaultValue={this.state.startMillisecond} value={this.state.startMillisecond}
                        onChange={this.onTimeChange("startMillisecond", 0, this.state.maxStartMillisecond)}/>
                </div>
            </div>
            <div className="time">结束时间 
                <div className="time-input">
                    <InputNumber className="time1" min={this.state.minEndHour} max={this.state.maxEndHour} defaultValue={this.state.endHour} value={this.state.endHour}
                        onChange={this.onTimeChange("endHour", this.state.minEndHour, this.state.maxEndHour)}/>:
                    <InputNumber className="time1" min={this.state.minEndMinute} max={this.state.maxEndMinute} defaultValue={this.state.endMinute} value={this.state.endMinute} 
                        onChange={this.onTimeChange("endMinute", this.state.minEndMinute, this.state.maxEndMinute)}/>:
                    <InputNumber className="time1" min={this.state.minEndSecond} max={this.state.maxEndSecond} defaultValue={this.state.endSecond} value={this.state.endSecond}
                        onChange={this.onTimeChange("endSecond", this.state.minEndSecond, this.state.maxEndSecond)}/>.
                    <InputNumber className="time1" min={this.state.minEndMillisecond} max={this.state.maxEndMillisecond} defaultValue={this.state.endMillisecond} value={this.state.endMillisecond} 
                        onChange={this.onTimeChange("endMillisecond", this.state.minEndMillisecond, this.state.maxEndMillisecond)}/>
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
                    width: 100%;
                    border: none;
                    line-height: 26px;
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
    onTimeChange = (time, min, max) => {
        return (value) => {
            
            if(value==undefined || isNaN(value)){ return; }
            if(value>max){
                value = max;
            }
            if(value<min){
                value = min;
            }
            this.state[time] = value;
            this.changeTime();
            const {currentMaterial} = this.props;
            currentMaterial.timeStart = this.getStartTime();
            currentMaterial.timeEnd = this.getEndTime();
            this.props.changeMaterial(currentMaterial);
            // console.log(this.props);
        }
    }
    getStartTime(){
        return {
            hour: this.state.startHour,
            minute: this.state.startMinute,
            second: this.state.startSecond,
            millisecond: this.state.startMillisecond,
        };
    }
    getEndTime() {
        return {
            hour: this.state.endHour,
            minute: this.state.endMinute,
            second: this.state.endSecond,
            millisecond: this.state.endMillisecond
        };
    }
}

const mapStateToProps = ({work1}) => {
    return {
        work1
    };
}

const mapDispatchToProps = (dispatch) => {
    return {
        changeMaterial: bindActionCreators(changeMaterial, dispatch)
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(TimeControl);