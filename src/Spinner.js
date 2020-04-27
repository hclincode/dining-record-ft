import React from 'react';

function Spinner(props) {
    return (
        
        <div className="ui active dimmer">
            <a href=".">
                <div className="ui text loader">{props.text}</div>
            </a>
        </div>
        
    );
}

Spinner.defaultProps = {
    text: 'Loading'
};

export default Spinner;