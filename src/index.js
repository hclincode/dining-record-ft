import React from 'react'
import ReactDOM from 'react-dom'
import CardDisplay from './CardDisplay'

class App extends React.Component {
    render() {
        return (
            <div className="app-container">
                <CardDisplay />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector("#root"));