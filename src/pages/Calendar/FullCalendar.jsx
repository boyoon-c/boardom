import React, { Component } from 'react';

class FullCalendar extends Component {
    render() {
        return (
            <>
            <div>
                {this.props.events}
            </div>
        );
        </>
    }
}

export default FullCalendar;