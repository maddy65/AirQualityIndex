import React, { Component } from 'react';

class AQIDisplay extends Component {

    constructor(props){
        super(props)

        this.state = {
           data : []
        }
    }

    ws = new WebSocket("wss://city-ws.herokuapp.com")

    componentDidMount(){
        this.ws.onopen = () => {
            console.log('connected')
        }
    
        this.ws.onmessage = evt => {
            var res = JSON.parse(evt.data);
            this.insertAndUpdate(res);
        }
    
        this.ws.onclose = () => {
            console.log('disconnected')
        }
    }
    
    insertAndUpdate(res) { // (1)
        var today = new Date();
        var  time = today.getHours() + ":" + today.getMinutes();
        res = res.map(obj=> ({ ...obj, time: time }));
        for(var i=0; i<res.length;i++){
            if(res[i].aqi >= 0 && res[i].aqi<=50.00){
                res[i].className = "good";
            }else if(res[i].aqi >= 50.01 && res[i].aqi <= 100.00){
                res[i].className = "satisafctory";
            }else if(res[i].aqi >= 100.01 && res[i].aqi <= 200){
                res[i].className = "moderate";
            }else if(res[i].aqi >= 200.01 && res[i].aqi <= 300){
                res[i].className = "poor";
            }else if(res[i].aqi >= 300.01 && res[i].aqi <= 400){
                res[i].className = "verypoor";
            }else if(res[i].aqi >= 400.01 && res[i].aqi <= 500){
                res[i].className = "worst";
            }
        }
        if(this.state.data.length == 0){
            res.sort((a,b) => (a.aqi > b.aqi) ? 1 : ((b.aqi > a.aqi) ? -1 : 0))
            this.setState({data:res})
        }else{
            var stateArray = this.state.data;
            for(var j=0; j<res.length; j++){
                const i = stateArray.findIndex(_item => _item.city === res[j].city);
                if (i > -1) stateArray[i] = res[j]; 
                else stateArray.push(res[j]);
            }
            stateArray.sort((a,b) => (a.aqi > b.aqi) ? 1 : ((b.aqi > a.aqi) ? -1 : 0))
            this.setState({data:stateArray})
        }
     }

    render() {
        return (


            <div>
               {this.state.data.map(aiqdata => (
                                <div className = {aiqdata.className}>
                                <div class="container">
                                    <div class="row">
                                       
                                        <div class="col-6 col-sm-3">
                                            <div> {aiqdata.city}</div>
                                        </div>
                                        <div class="col-6 col-sm-3">
                                            <div>{aiqdata.aqi}</div>
                                        </div>
                                        <div class="col-6 col-sm-3">
                                            <div>{aiqdata.time}</div>
                                        </div>
                                </div>        
                                </div>
                            </div>


                            ))}
            </div>
        );
    }
}

export default AQIDisplay;