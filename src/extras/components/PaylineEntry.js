import React, { Component } from 'react';

export default class PaylineEntry extends Component {
    render(){
        return(
            <div>
                <iframe title="Payline" className="iframe" src={ this.props.redirectURL }></iframe>
            </div>
        )
    }
}