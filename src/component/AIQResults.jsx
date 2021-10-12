import React, { Component } from 'react';
import AIQChart from './AIQChart'

class AIQResults extends Component {

    constructor(props){
        super(props)

        this.state = {
           chartData : [],
           chartDataTemp : []
        }
    }

    render() {
        return (
            <div>
                <div>
                    AIQ BAR CHART
                </div>
                <div>
                    <AIQChart />
                </div>
            </div>
        );
    }
}

export default AIQResults;