import React from 'react';
import './CardDisplay.css';
import Spinner from './Spinner';

const baseApi = '';
const getLastTimeApi = baseApi + '/api/lastEatTime';
const updateEatTimeApi = baseApi + '/api/eat';

function nowUnixTimestamp() {
    return parseInt(Date.now() / 1000);
}

function durationToString(sec_num) {
    let days = Math.floor(sec_num / 86400);
    let hours = Math.floor(sec_num / 3600 - days * 24);
    let minutes = Math.floor((sec_num - (hours * 3600)) / 60);
    let seconds = sec_num - (hours * 3600) - (minutes * 60);
    return days + ' day ' + hours + ' hour ' + minutes + ' minute ' + parseInt(seconds) + ' second';
}

class CardDisplay extends React.Component {
    state = { timeDiffString: null, lastEatTimestamp: null, errorMsg: null };

    componentDidMount() {
        this.updateLastEatTimeDiffSeconds();
    }

    componentDidUpdate() {
        // scheduling update time clock
        setTimeout(() => {
            this.updateTimeDiffString();
        }, 100);
    }

    renderBody() {
        if (this.state.errorMsg) {
            return <Spinner text={this.state.errorMsg} />
        }

        if (this.state.timeDiffString) {
            return (
                <div className="card">
                    <h3 className="time-string">{this.state.timeDiffString}</h3>
                    <button className="eat-button" onClick={this.submitEat}>Eat</button>
                </div>
            );
        }

        return <Spinner />
    }

    render() {
        return this.renderBody();
    }

    updateTimeDiffString() {
        if (!this.state.lastEatTimestamp) return;
        const durationSecond = nowUnixTimestamp() - this.state.lastEatTimestamp;
        this.setState({ timeDiffString: durationToString(durationSecond) })
    }

    updateLastEatTimeDiffSeconds() {
        fetch(getLastTimeApi).then((res) => {
            return res.json();
        }).then((data) => {
            this.setState({ lastEatTimestamp: parseInt(data['timeStamp']) });
        }).catch((err) => {
            console.log(err);
        });
    }

    // "this" binding issue. ref: https://zh-hant.reactjs.org/docs/handling-events.html
    submitEat = () => {
        this.setState({ timeDiffString: null, lastEatTimestamp: null });
        fetch(updateEatTimeApi).then((res) => {
            if (res.ok) {
                this.updateLastEatTimeDiffSeconds();
            } else {
                this.setState({ errorMsg: 'Fail to upate eat time: (' + res.status + ') ' + res.statusText });
            }
        }).catch((err) => {
            this.setState({ errorMsg: err });
        });
    }

}

export default CardDisplay;