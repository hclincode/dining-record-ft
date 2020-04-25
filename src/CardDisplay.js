import React from 'react';
import './CardDisplay.css';

const baseApi = '';
const getLastTimeApi = baseApi + '/api/lastEatTime';
const updateEatTimeApi = baseApi + '/api/eat';

function nowUnixTimestamp(){
    return parseInt(Date.now()/1000);
}

function durationToString(sec_num) {
    let days = Math.floor(sec_num / 86400);
    let hours   = Math.floor(sec_num / 3600);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);
    return days + ' day ' + hours + ' hour ' + minutes + ' minute ' + parseInt(seconds) + ' second';
}

class CardDisplay extends React.Component {
    state = {timeDiffString: durationToString(0), lastEatTimestamp: null};

    componentDidMount(){
        this.updateLastEatTimeDiffSeconds();
    }

    componentDidUpdate(){
        // scheduling update time clock
        setTimeout(() => {
            this.updateTimeDiffString();
        }, 100);
    }

    render() {
        return (
            <div className="card">
                <h3 className="time-string">{this.state.timeDiffString}</h3>
                <button className="eat-button" onClick={this.submitEat}>Eat</button>
            </div>
        );
    }

    updateTimeDiffString() {
        const durationSecond = nowUnixTimestamp() - this.state.lastEatTimestamp;
        this.setState({timeDiffString: durationToString(durationSecond)})
    }

    updateLastEatTimeDiffSeconds() {
        fetch(getLastTimeApi).then((res) => {
            return res.json();
        }).then((data) => {
            this.setState({lastEatTimestamp: parseInt(data['timeStamp'])});
        }).catch((err)=>{
            console.log(err);
        });
    }

    // "this" binding issue. ref: https://zh-hant.reactjs.org/docs/handling-events.html
    submitEat = () => {
        fetch(updateEatTimeApi).then((res)=>{
            setTimeout(() => {
                this.updateLastEatTimeDiffSeconds();
            }, 100);
        }).catch((err) => {
            alert(err);
        });
    }

}

export default CardDisplay;